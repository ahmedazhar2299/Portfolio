import { Link } from "react-router-dom"
import { Seo } from "../components/Seo"

export function NotFoundPage() {
  return (
    <div className="page not-found-page">
      <Seo
        title="Not Found"
        description="The page you are looking for was not found."
        pathname="/404"
      />
      <span className="eyebrow">404</span>
      <h1>This path does not exist.</h1>
      <p>The page may have moved during the portfolio redesign.</p>
      <Link to="/">Return to Home</Link>
    </div>
  )
}
