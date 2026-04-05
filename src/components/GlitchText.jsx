import { motion } from 'framer-motion'

export default function GlitchText({ text, className = '', as: Tag = 'span' }) {
  return (
    <Tag
      className={`glitch relative inline-block ${className}`}
      data-text={text}
    >
      {text}
    </Tag>
  )
}
