# CITATIONS — identical NAP in every directory

Owner-only document. Search engines cross-check your name, address and phone across
directories against the Google Business Profile. Every mismatch weakens the profile; an exact
match reinforces it. **This is the only version anyone may paste.**

---

## 1. Canonical NAP block

Copied verbatim from `app/src/data/site.ts` (`nap`, `phones`, `hours`, plus the public domain).
Copy it as-is. Do not retype it from memory.

```
ORDENT
ul. Karola Szymanowskiego 33
87-300 Brodnica
601 594 229
603 053 437
Pon–pt 10–17
https://ordent.pl/
```

| Field | Value |
|---|---|
| Name | ORDENT |
| Street | ul. Karola Szymanowskiego 33 |
| Postcode + city | 87-300 Brodnica |
| Phone 1 | 601 594 229 |
| Phone 2 | 603 053 437 |
| Hours | Pon–pt 10–17 |
| Website | https://ordent.pl/ |

---

## 2. The rule

Across all five directories, these fields must be **character-identical**:

**name · street · postcode · city · both phones · hours**

- No abbreviations — write the street out, keep `ul.` in place.
- Never drop the second phone number, and never reorder the two.
- Same dash, same spacing in the hours line (`Pon–pt 10–17`).
- If a directory has no second-phone field, leave the extra phone out of that form only — do
  not swap it in and drop the first.

Where a directory needs something the repo does not have (a description length, a category
taxonomy, a verification method, tax/company data), the field is described below and the
**owner decides the value on the form** — nothing is invented here.

---

## 3. Submission order

1. **Google Business Profile** — already verified (`mapsLink` `cid=5880031631405622190` in
   `site.ts`). This is the source of truth all others copy from, and two of the directories
   can import it in one step.
2. **Bing Places** — import from Google, then correct any field the import gets wrong.
3. **Apple Business Connect** — you can request an import from Google here too.
4. **PKT.pl** — manual.
5. **Panorama Firm** — manual.
6. **Aleo** — manual, B2B tone (see §7).

Do the importable ones first so you type the NAP once. Then re-read §2 against every entry.

---

## 4. Panorama Firm

| Field | Value to enter |
|---|---|
| Name | `ORDENT` |
| Category | choose the closest on Panorama Firm's own list to GBP primary **Protezy**; if the list offers a laboratory/prosthetics-dental option, that is also acceptable as secondary. **Owner decides; record what was chosen.** |
| Address | `ul. Karola Szymanowskiego 33`, `87-300`, `Brodnica` |
| Phone | `601 594 229` — and add `603 053 437` in any second-phone field the form offers |
| Hours | enter per-day: Pon–pt **10:00–17:00**, Sob/Nd **zamknięte** (the form is per-day, not one line) |
| Website | `https://ordent.pl/` |
| Description | see §8; the form shows its own character limit next to the box — read it and paste the version that fits |
| Verification | the form offers one of: phone / SMS / postcard / document upload. **Pick the one you can actually complete, and note which you picked.** |

---

## 5. PKT.pl

| Field | Value to enter |
|---|---|
| Name | `ORDENT` |
| Category | closest on PKT.pl's list to **Protezy**; lab/prosthetics-dental option as secondary if offered. **Owner decides.** |
| Address | `ul. Karola Szymanowskiego 33`, `87-300`, `Brodnica` |
| Phone | `601 594 229`, second phone `603 053 437` if a second field exists |
| Hours | per-day Pon–pt **10:00–17:00**, weekend closed |
| Website | `https://ordent.pl/` |
| Description | see §8; check the field's own limit before pasting |
| Verification | form's own options — phone / SMS / document / postcard. **Owner decides and records.** |

---

## 6. Bing Places

| Field | Value to enter |
|---|---|
| Setup | **Import from Google** — earliest option on the sign-up flow. Verify each field against §1 after import; imports drop or alter the second phone.
| Name | `ORDENT` |
| Category | match GBP primary **Protezy** where Bing's list allows |
| Address | `ul. Karola Szymanowskiego 33`, `87-300`, `Brodnica` |
| Phone | `601 594 229` — add `603 053 437` if a second-phone field exists |
| Hours | Pon–pt **10:00–17:00**, weekend closed |
| Website | `https://ordent.pl/` |
| Verification | Bing Places will offer its own method (account / phone / postcard). **Owner decides and records.** |

---

## 7. Apple Business Connect

| Field | Value to enter |
|---|---|
| Setup | requires an **Apple ID**. Request an **import from Google** where offered, otherwise manual. |
| Name | `ORDENT` |
| Category | Apple's own list — closest to **Protezy** / dental laboratory. **Owner decides.** |
| Address | `ul. Karola Szymanowskiego 33`, `87-300`, `Brodnica` |
| Phone | `601 594 229`; add `603 053 437` if a second-phone field exists |
| Hours | Pon–pt **10:00–17:00**, weekend closed |
| Website | `https://ordent.pl/` (must be **https**) |
| Verification | Apple offers its own method (phone / email / document). **Owner decides and records.** |

---

## 8. Category and description values

Categories per directory: pick the closest to GBP primary **Protezy**; use **Laboratorium
protetyczne** as the secondary where the list has it. Where the taxonomy differs, the owner
chooses and records the choice — do not force a label the list does not have.

Descriptions: both drafts below are assembled only from copy that is already in the repo
(`services.ts`, `About.tsx`). Longest per-directory limit is unknown — read the form's own
limit and paste the version that fits.

**Standard (visual/B2C directories):**

> Pracownia protetyczna w Brodnicy. Wykonujemy protezy zębowe, korony i mosty, szyny oraz
> naprawy protez.

**Aleo — leading with laboratory capability (see §9):**

> Laboratorium protetyczne z wieloletnim doświadczeniem. Protezy elastyczne, akrylowe i
> szkieletowe, korony i mosty, szyny, naprawy protez — pracownia protetyczna w Brodnicy.

**Not in the repo — owner must decide if a form asks:** tax/company data (e.g. NIP) and a
longer free-text „about the company” block. `site.ts` holds neither; do not invent them.

---

## 9. Aleo — B2B note

Aleo is weighted toward **B2B** (dental practices referring work in), so:

- The **description leads with laboratory capability** (the Aleo draft in §8), not the retail
  „come to our storefront” tone.
- The **NAP stays identical** (§1) — every field in §2 is unchanged. Only the description tone
  differs.

---

## 10. Final check (run after all five are submitted)

- [ ] Name is `ORDENT` everywhere — no „Ordent”, no „Pracownia ORDENT”.
- [ ] Street is `ul. Karola Szymanowskiego 33` — `ul.` present, spelled out.
- [ ] Postcode is `87-300` and city is `Brodnica` on every entry.
- [ ] **Both** phones present: `601 594 229` and `603 053 437`.
- [ ] Hours read `Pon–pt 10–17` (or per-day 10:00–17:00, weekend closed).
- [ ] Website is `https://ordent.pl/` on every entry that has the field.
- [ ] Every divergent value you had to choose (category, verification method, tax data) is
      written down next to the directory name.
