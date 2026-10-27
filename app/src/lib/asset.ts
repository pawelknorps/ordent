// Vite rewrites absolute /… URLs in index.html and CSS, but not path strings built in TS.
// BASE_URL always ends with '/', so join it with a leading-slash path.
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '')
