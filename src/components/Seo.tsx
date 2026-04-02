import { useEffect } from "react"

type SeoProps = {
  title: string
  description: string
  pathname: string
}

const SITE_URL = "https://muhammad-ahmed-dev.vercel.app"
const DEFAULT_IMAGE = `${SITE_URL}/portfolio-social.png`

function upsertMetaByName(name: string, content: string) {
  let element = document.querySelector(`meta[name=\"${name}\"]`) as HTMLMetaElement | null
  if (!element) {
    element = document.createElement("meta")
    element.setAttribute("name", name)
    document.head.appendChild(element)
  }
  element.content = content
}

function upsertMetaByProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property=\"${property}\"]`) as HTMLMetaElement | null
  if (!element) {
    element = document.createElement("meta")
    element.setAttribute("property", property)
    document.head.appendChild(element)
  }
  element.content = content
}

export function Seo({ title, description, pathname }: SeoProps) {
  useEffect(() => {
    const cleanPath = pathname.startsWith("/") ? pathname : `/${pathname}`
    const canonicalUrl = new URL(cleanPath, SITE_URL).toString()

    document.title = `${title} | Muhammad Ahmed`

    upsertMetaByName("description", description)
    upsertMetaByName("twitter:title", `${title} | Muhammad Ahmed`)
    upsertMetaByName("twitter:description", description)
    upsertMetaByName("twitter:image", DEFAULT_IMAGE)
    upsertMetaByName("twitter:image:alt", "Muhammad Ahmed portfolio preview")

    upsertMetaByProperty("og:title", `${title} | Muhammad Ahmed`)
    upsertMetaByProperty("og:description", description)
    upsertMetaByProperty("og:url", canonicalUrl)
    upsertMetaByProperty("og:image", DEFAULT_IMAGE)
    upsertMetaByProperty("og:image:secure_url", DEFAULT_IMAGE)
    upsertMetaByProperty("og:image:type", "image/png")
    upsertMetaByProperty("og:image:width", "1280")
    upsertMetaByProperty("og:image:height", "1200")
    upsertMetaByProperty("og:image:alt", "Muhammad Ahmed portfolio preview")

    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl
  }, [title, description, pathname])

  return null
}
