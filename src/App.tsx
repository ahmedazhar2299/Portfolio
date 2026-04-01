import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion"
import { type ReactNode } from "react"
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from "react-router-dom"
import { ContactPage } from "./pages/ContactPage"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { PlaygroundPage } from "./pages/PlaygroundPage"
import { ProjectPage } from "./pages/ProjectPage"
import { StoryPage } from "./pages/StoryPage"
import { WorkPage } from "./pages/WorkPage"

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/story", label: "Story" },
  { to: "/work", label: "Work" },
  { to: "/playground", label: "Playground" },
  { to: "/contact", label: "Contact" },
]

function RouteScene() {
  const location = useLocation()
  const reducedMotion = useReducedMotion()

  return (
    <main id="main-content" className="route-root">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className="route-layer"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -14, filter: "blur(8px)" }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<ProjectPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

function SiteChrome({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion()

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="site-bg" aria-hidden="true">
        <div className="site-grid" />
        {!reducedMotion && (
          <>
            <motion.div
              className="site-glow glow-a"
              animate={{ x: [0, 32, -18, 0], y: [0, -18, 22, 0] }}
              transition={{ duration: 21, ease: "easeInOut", repeat: Infinity }}
            />
            <motion.div
              className="site-glow glow-b"
              animate={{ x: [0, -24, 30, 0], y: [0, 18, -24, 0] }}
              transition={{ duration: 19, ease: "easeInOut", repeat: Infinity }}
            />
          </>
        )}
      </div>

      <div className="site-wordmark" aria-hidden="true">
        AHMED
      </div>

      <header className="site-header shell glass-panel">
        <Link to="/" className="brand">
          <span>MA</span>
          <small>Muhammad Ahmed</small>
        </Link>

        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "nav-link is-active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a href="/resume/resume.pdf" target="_blank" rel="noreferrer" className="header-resume-link">
          Resume
        </a>
      </header>

      {children}

      <footer className="shell site-footer">
        <p>© {new Date().getFullYear()} Muhammad Ahmed. Built with React and Framer Motion.</p>
      </footer>
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <SiteChrome>
          <RouteScene />
        </SiteChrome>
      </BrowserRouter>
    </MotionConfig>
  )
}
