import type { ReactNode } from 'react'
import { StrictMode } from 'react'
import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import { services } from './data/services'
import Cennik from './pages/Cennik'
import Poradnik from './pages/Poradnik'
import ServicePage from './pages/ServicePage'
import { CENNIK_PATH, PORADNIK_PATH, servicePath } from './pages/meta'

// vite-react-ssg builds its own client tree, so the StrictMode the old main.tsx rendered is
// re-applied per route (it renders no DOM, so the prerendered markup is unchanged).
const strict = (element: ReactNode) => <StrictMode>{element}</StrictMode>

// One real URL per rendered page. vite-react-ssg prerenders every one of these to its own
// dist/<route>/index.html; paths are base-less because the router is given `basename` from
// `import.meta.env.BASE_URL` in main.tsx (vite-react-ssg does not add it by itself).
export const routes: RouteRecord[] = [
  { path: '/', element: strict(<App />) },
  { path: CENNIK_PATH, element: strict(<Cennik />) },
  { path: PORADNIK_PATH, element: strict(<Poradnik />) },
  ...services.map((s) => ({ path: servicePath(s), element: strict(<ServicePage service={s} />) })),
]
