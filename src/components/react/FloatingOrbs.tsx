import { motion, useReducedMotion } from "framer-motion"

export default function FloatingOrbs() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null

  return (
    <div aria-hidden="true" className="floating-orbs">
      <motion.div
        className="orb orb-one"
        animate={{ x: [0, 16, -10, 0], y: [0, -18, 10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-two"
        animate={{ x: [0, -12, 18, 0], y: [0, 10, -14, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-three"
        animate={{ x: [0, 14, -8, 0], y: [0, -12, 14, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
