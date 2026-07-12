import logo1 from '../assets/figma/logo-1.svg'
import logo2 from '../assets/figma/logo-2.svg'
import logo3 from '../assets/figma/logo-3.svg'
import logo4 from '../assets/figma/logo-4.svg'
import logo5 from '../assets/figma/logo-5.svg'
import logo6 from '../assets/figma/logo-6.svg'
import logo7 from '../assets/figma/logo-7.svg'

// EXTIND wordmark — letter placement mirrors the Figma vector geometry
const parts = [
  { src: logo3, left: '0%', right: '86.75%' },
  { src: logo1, left: '15.89%', right: '75.98%', flip: true },
  { src: logo2, left: '25.73%', right: '66.14%' },
  { src: logo4, left: '35.34%', right: '50.17%' },
  { src: logo5, left: '53.08%', right: '44.04%' },
  { src: logo7, left: '61.42%', right: '22.37%' },
  { src: logo6, left: '83.11%', right: '0.19%' },
]

export default function Logo() {
  return (
    <span className="logo" aria-label="Extind">
      {parts.map(({ src, left, right, flip }, i) => (
        <span
          key={i}
          className="logo__part"
          style={{ left, right, transform: flip ? 'scaleX(-1)' : undefined }}
        >
          <img src={src} alt="" />
        </span>
      ))}
    </span>
  )
}
