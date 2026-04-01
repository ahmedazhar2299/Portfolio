import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

type MotionSectionProps = {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
}

export default function MotionSection({
  children,
  className,
  delay = 0,
  distance = 28,
}: MotionSectionProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -10% 0px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
