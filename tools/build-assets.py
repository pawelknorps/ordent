#!/usr/bin/env python3
"""Generate the site's web assets into app/public/ from the original source media.

Re-run after swapping any source image/video. Requires: Pillow, ffmpeg.
Assets are deliberately NOT generated at build time (no vite-imagetools dependency).
"""
import os
import re
import shutil
import subprocess
import sys
import urllib.request
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "app" / "public"
IMG = PUB / "img"
FFMPEG = shutil.which("ffmpeg") or "/opt/homebrew/bin/ffmpeg"

GALLERY = [
    "IMG_7005", "IMG_7006", "IMG_7008", "IMG_7009", "IMG_7012", "IMG_7141",
    "IMG_7142", "IMG_7148", "IMG_7766", "IMG_7768", "IMG_8211", "IMG_8212",
]
GALLERY_WIDTHS = (480, 960, 1440)
# The About photo renders at most ~650 CSS px (2-col grid at >=900px), so 1200 covers 2x.
ABOUT_WIDTHS = (480, 960, 1200)

ICONS_USED = [
    "003-tooth-13.svg", "004-tooth-12.svg", "010-protection.svg", "008-tooth-11.svg",
    "017-tooth-9.svg", "016-tooth-10.svg", "006-tooth-pliers.svg", "009-braces-1.svg",
    "007-appointment.svg", "001-dentist.svg", "011-dental-care.svg",
]

FAVICON = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="#0B4F4A"/>
<path d="M20 17h24v8H28v14h16v8H20z" fill="#FBFAF7"/>
</svg>
"""


def log(*a):
    print(*a, flush=True)


def cover(im, w, h):
    """Center-crop to the target aspect ratio, then resize."""
    target = w / h
    cur = im.width / im.height
    if cur > target:
        nw = int(im.height * target)
        im = im.crop(((im.width - nw) // 2, 0, (im.width + nw) // 2, im.height))
    else:
        nh = int(im.width / target)
        top = int((im.height - nh) * 0.4)  # bias upward: subjects sit high in these shots
        im = im.crop((0, top, im.width, top + nh))
    return im.resize((w, h), Image.LANCZOS)


def save_variants(im, base, widths, jpg_quality=80, webp_quality=78):
    for w in widths:
        h = round(im.height * w / im.width)
        r = im.resize((w, h), Image.LANCZOS)
        r.save(f"{base}-{w}.jpg", "JPEG", quality=jpg_quality, optimize=True, progressive=True)
        r.save(f"{base}-{w}.webp", "WEBP", quality=webp_quality, method=5)


def build_gallery():
    out = IMG / "gallery"
    out.mkdir(parents=True, exist_ok=True)
    for i, name in enumerate(GALLERY, 1):
        src = ROOT / "images" / "gallery" / f"{name}-min.jpg"
        im = Image.open(src).convert("RGB")
        save_variants(im, str(out / f"g{i:02d}"), GALLERY_WIDTHS)
        log("gallery", f"g{i:02d}", name, im.size)


def build_stills():
    IMG.mkdir(parents=True, exist_ok=True)
    hero = Image.open(ROOT / "images" / "slides" / "1.jpg").convert("RGB")
    hero.save(IMG / "hero.jpg", "JPEG", quality=80, optimize=True, progressive=True)
    about = cover(Image.open(ROOT / "images" / "slides" / "3.jpg").convert("RGB"), 1200, 900)
    save_variants(about, str(IMG / "about"), ABOUT_WIDTHS)
    og = cover(Image.open(ROOT / "images" / "slides" / "1.jpg").convert("RGB"), 1200, 630)
    og.save(PUB / "og.jpg", "JPEG", quality=84, optimize=True, progressive=True)
    log("stills", hero.size, about.size, og.size)


def build_icons():
    out = IMG / "icons"
    out.mkdir(parents=True, exist_ok=True)
    src = ROOT / "images" / "svg"
    for f in sorted(src.glob("*.svg")):
        shutil.copy2(f, out / f.name)
    missing = [n for n in ICONS_USED if not (out / n).exists()]
    if missing:
        sys.exit(f"missing icons: {missing}")
    log("icons", len(list(out.glob('*.svg'))), "copied")


def build_video():
    out = PUB / "video"
    out.mkdir(parents=True, exist_ok=True)
    src = ROOT / "images" / "elastyczna2.mp4"
    # -an: the source track is decorative and the original played muted; dropping it
    # also removes any WCAG 1.2.2 caption obligation.
    subprocess.run([
        FFMPEG, "-y", "-loglevel", "error", "-i", str(src),
        "-vf", "scale=-2:720", "-c:v", "libx264", "-crf", "28", "-preset", "slow",
        "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart",
        str(out / "elastyczna-720.mp4"),
    ], check=True)
    subprocess.run([
        FFMPEG, "-y", "-loglevel", "error", "-i", str(src),
        "-vf", "scale=-2:720", "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-row-mt", "1", "-an", str(out / "elastyczna-720.webm"),
    ], check=True)
    poster = Path("/tmp/ordent-poster.png")
    subprocess.run([
        FFMPEG, "-y", "-loglevel", "error", "-ss", "2.5", "-i", str(src),
        "-frames:v", "1", str(poster),
    ], check=True)
    im = cover(Image.open(poster).convert("RGB"), 1280, 720)
    im.save(out / "elastyczna-poster.jpg", "JPEG", quality=80, optimize=True, progressive=True)
    im.save(out / "elastyczna-poster.webp", "WEBP", quality=78, method=5)
    for f in sorted(out.iterdir()):
        log("video", f.name, f"{f.stat().st_size // 1024} KB")


def build_app_icons():
    """Home-screen and PWA icons: the favicon's mark on a full-bleed teal square.

    Full bleed (no rounded corners, no alpha) is what iOS and Android's maskable icons
    expect — the platform applies its own mask, so the corners must not be transparent.
    Drawn at 4x and downscaled to keep the edges clean.
    """
    # Mirrors FAVICON's path above (viewBox 0 0 64 64).
    mark = [(20, 17), (44, 17), (44, 25), (28, 25), (28, 39), (44, 39), (44, 47), (20, 47)]
    for size, name in ((180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")):
        ss = size * 4
        im = Image.new("RGB", (ss, ss), "#0B4F4A")
        ImageDraw.Draw(im).polygon([(x * ss / 64, y * ss / 64) for x, y in mark], fill="#FBFAF7")
        im.resize((size, size), Image.LANCZOS).save(PUB / name, "PNG", optimize=True)
        log("icon", name, f"{size}x{size}")


def build_fonts():
    out = PUB / "fonts"
    out.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / "fonts" / "BebasNeue-webfont.woff", out / "BebasNeue.woff")
    css_url = "https://fonts.googleapis.com/css2?family=Inter:wght@400..600&display=swap"
    # Google only serves woff2 to UAs it recognises as modern Chrome; anything else = .ttf.
    ua = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
          "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    css = urllib.request.urlopen(urllib.request.Request(css_url, headers={"User-Agent": ua}), timeout=30).read().decode()
    for subset in ("latin", "latin-ext"):
        m = re.search(r"/\* " + subset + r" \*/\s*@font-face\s*{[^}]*?url\((https://[^)]+\.woff2)\)", css, re.S)
        if not m:
            sys.exit(f"no {subset} woff2 in Google Fonts response: {css[:200]}")
        dest = out / f"inter-{subset}.woff2"
        urllib.request.urlretrieve(m.group(1), dest)
        log("font", dest.name, f"{dest.stat().st_size // 1024} KB")


def main():
    (PUB / "favicon.svg").write_text(FAVICON)
    build_stills()
    build_gallery()
    build_icons()
    build_app_icons()
    build_video()
    build_fonts()
    if (PUB / "icons.svg").exists():
        (PUB / "icons.svg").unlink()  # vite template leftover
    log("total public/:", sum(f.stat().st_size for f in PUB.rglob("*") if f.is_file()) // 1024, "KB")


if __name__ == "__main__":
    main()
