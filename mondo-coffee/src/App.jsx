import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import './index.css'

/* ─── colour tokens ──────────────────────────────── */
const C = {
  cream: '#F5EFE4', beige: '#EDE4D3', brown: '#5C3D2E',
  brownL: '#8B6345', gold: '#C9A96E', goldL: '#E2C99A',
  dark: '#1A1410', dark2: '#2C1F14',
}

/* ─── shared fade-up variant ─────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 38 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16,1,0.3,1], delay } },
})

/* ─── section reveal wrapper ─────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp(delay)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── CAN SVG ────────────────────────────────────── */
function CanSVG() {
  return (
    <svg viewBox="0 0 140 360" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
      <defs>
        <linearGradient id="hcan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3A2515" />
          <stop offset="35%" stopColor="#8B6345" />
          <stop offset="65%" stopColor="#C9A96E" />
          <stop offset="100%" stopColor="#3A2515" />
        </linearGradient>
        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="30%" stopColor="white" stopOpacity="0.18" />
          <stop offset="60%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <ellipse cx="70" cy="22" rx="55" ry="10" fill="#5a4030" />
      <rect x="15" y="22" width="110" height="318" rx="12" fill="url(#hcan)" />
      <rect x="15" y="22" width="110" height="318" rx="12" fill="url(#shine)" />
      <ellipse cx="70" cy="340" rx="55" ry="10" fill="#3a2515" />
      <rect x="25" y="100" width="90" height="160" rx="4" fill="rgba(0,0,0,0.12)" />
      <text x="70" y="170" textAnchor="middle" fontFamily="Cormorant Garamond, serif"
        fontSize="38" fontWeight="300" fill="rgba(245,239,228,0.92)" letterSpacing="2">M</text>
      <text x="70" y="195" textAnchor="middle" fontFamily="Jost, sans-serif"
        fontSize="9" fontWeight="300" fill="rgba(245,239,228,0.6)" letterSpacing="5">MONDO</text>
      <text x="70" y="215" textAnchor="middle" fontFamily="Jost, sans-serif"
        fontSize="6" fontWeight="200" fill="rgba(201,169,110,0.6)" letterSpacing="3">COFFEE BAR</text>
      <line x1="45" y1="240" x2="95" y2="240" stroke="rgba(201,169,110,0.3)" strokeWidth="0.5" />
    </svg>
  )
}

/* ─── Drink can SVG (product cards) ─────────────── */
function DrinkCan({ gradientId, stops, width = 110 }) {
  return (
    <svg viewBox="0 0 120 300" width={width} style={{ filter: 'drop-shadow(0 16px 32px rgba(0,0,0,.25))' }}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          {stops.map((s, i) => <stop key={i} offset={s.offset} stopColor={s.color} />)}
        </linearGradient>
      </defs>
      <rect x="10" y="20" width="100" height="260" rx="10" fill={`url(#${gradientId})`} />
      <rect x="10" y="20" width="100" height="260" rx="10" fill="rgba(255,255,255,0.08)" />
      <ellipse cx="60" cy="20" rx="50" ry="9" fill="rgba(255,255,255,0.12)" />
      <ellipse cx="60" cy="280" rx="50" ry="9" fill="rgba(0,0,0,0.15)" />
      <text x="60" y="148" textAnchor="middle" fontFamily="Cormorant Garamond,serif"
        fontSize="12" fill="rgba(255,255,255,.85)" letterSpacing="3">MONDO</text>
      <text x="60" y="165" textAnchor="middle" fontFamily="Jost,sans-serif"
        fontSize="6" fill="rgba(255,255,255,.5)" letterSpacing="2">COFFEE BAR</text>
    </svg>
  )
}

/* ─── LOADER ─────────────────────────────────────── */
function Loader({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, visibility: 'hidden' }}
          transition={{ duration: 0.9 }}
          style={{ position: 'fixed', inset: 0, background: C.dark, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '0.5rem' }}
        >
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3rem,9vw,6rem)', fontWeight: 300,
            color: C.cream, letterSpacing: '0.35em',
            animation: 'lp 1.6s ease-in-out infinite',
          }}>MONDO</div>
          <div style={{
            width: 0, height: 1, background: C.gold,
            animation: 'll 1.8s 0.2s ease-out forwards',
          }} />
          <div style={{
            fontSize: '0.55rem', letterSpacing: '0.6em', textTransform: 'uppercase',
            color: 'rgba(245,239,228,0.3)', marginTop: '0.3rem',
            opacity: 0, animation: 'lf 1s 1s ease forwards',
          }}>Coffee Bar</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── NAV ────────────────────────────────────────── */
function Nav({ scrolled }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: scrolled ? '1rem 4rem' : '1.6rem 4rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(245,239,228,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,169,110,0.25)' : 'none',
      transition: 'all 0.5s ease',
    }}>
      <a href="#" style={{
        fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 400,
        letterSpacing: '0.35em', color: scrolled ? C.brown : C.cream,
        textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.4s',
      }}>Mondo</a>

      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
        {[['#menu', 'Menu'], ['#story', 'Story'], ['#experience', 'Experience'], ['#delivery', 'Delivery']].map(([href, label]) => (
          <li key={href}>
            <a href={href} style={{
              fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.25em',
              textTransform: 'uppercase', color: scrolled ? C.brownL : 'rgba(245,239,228,0.75)',
              textDecoration: 'none', transition: 'color 0.3s',
            }}>{label}</a>
          </li>
        ))}
      </ul>

      <a href="#delivery" style={{
        fontSize: '0.6rem', fontWeight: 400, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: C.dark,
        background: C.gold, padding: '0.65rem 1.6rem',
        textDecoration: 'none', transition: 'all 0.3s',
      }}>Order Now</a>
    </nav>
  )
}

/* ─── HERO ───────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      minHeight: '100vh', background: C.dark,
      display: 'flex', alignItems: 'flex-end',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* bg layers */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 60% 60% at 75% 25%, rgba(201,169,110,.12) 0%,transparent 70%),
          radial-gradient(ellipse 50% 50% at 20% 80%, rgba(92,61,46,.45) 0%,transparent 60%),
          linear-gradient(140deg,#1A1410 0%,#2C1F14 55%,#1A1410 100%)`,
      }} />
      {/* grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '250px',
      }} />

      {/* content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '9rem 5rem 6rem', maxWidth: 860 }}>
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          style={{ fontSize: '0.6rem', fontWeight: 300, letterSpacing: '0.45em',
            textTransform: 'uppercase', color: C.gold, marginBottom: '1.5rem' }}
        >
          Mondo Coffee Bar &nbsp;·&nbsp; Est. 2023 &nbsp;·&nbsp; Karachi
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1 }}
          style={{ fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3.5rem,9vw,8rem)', fontWeight: 300,
            lineHeight: 0.93, color: C.cream, marginBottom: '2rem' }}
        >
          Crafted for<br />
          <em style={{ fontStyle: 'italic', color: C.gold }}>Those Who</em><br />
          Taste Life
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          style={{ fontSize: '0.8rem', fontWeight: 200, letterSpacing: '0.12em',
            lineHeight: 2.1, color: 'rgba(245,239,228,0.5)',
            maxWidth: 400, marginBottom: '3rem' }}
        >
          Premium espresso, hand-crafted drinks &amp; artisan bites — now delivered fresh to your door across Karachi.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap' }}
        >
          <a href="#menu" className="btn-shimmer" style={{
            fontSize: '0.62rem', fontWeight: 400, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: C.dark,
            background: C.gold, padding: '1rem 2.6rem',
            textDecoration: 'none', border: 'none',
          }}>
            <span>Explore Menu</span>
          </a>
          <a href="#story" style={{
            fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'rgba(245,239,228,0.6)',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem',
            transition: 'color 0.3s',
          }}>Our Story →</a>
        </motion.div>
      </div>

      {/* floating can */}
      <motion.div
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1.2 }}
        style={{
          position: 'absolute', right: '7%', bottom: 0,
          width: 'min(35%,420px)',
          filter: 'drop-shadow(0 30px 60px rgba(0,0,0,.5))',
        }}
      >
        <CanSVG />
      </motion.div>

      {/* scroll hint */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        color: 'rgba(245,239,228,0.25)',
        fontSize: '0.5rem', letterSpacing: '0.4em', textTransform: 'uppercase',
        animation: 'sh 2.5s ease-in-out infinite',
      }}>
        Scroll
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom,rgba(201,169,110,.5),transparent)' }} />
      </div>
    </section>
  )
}

/* ─── STORY ──────────────────────────────────────── */
function Story() {
  const stats = [
    { n: '12+', l: 'Signature Drinks' },
    { n: '3', l: 'City Locations' },
    { n: '50k+', l: 'Cups Served' },
  ]

  return (
    <section id="story" style={{ padding: '7rem 5rem', background: C.beige, position: 'relative', overflow: 'hidden' }}>
      {/* watermark */}
      <div style={{
        position: 'absolute', right: '-3%', top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(7rem,17vw,16rem)', fontWeight: 300,
        color: 'rgba(92,61,46,.05)', whiteSpace: 'nowrap',
        pointerEvents: 'none', letterSpacing: '0.1em',
      }}>MONDO</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
        <div>
          <Reveal>
            <p style={{ fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.55em',
              textTransform: 'uppercase', color: C.gold, marginBottom: '1.4rem' }}>Our Philosophy</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.4rem,5vw,4.5rem)', fontWeight: 300, lineHeight: 1.08, color: C.brown }}>
              Where <em style={{ fontStyle: 'italic' }}>Coffee</em><br />Becomes Art
            </h2>
            <p style={{ fontSize: '0.82rem', fontWeight: 200, lineHeight: 2.3,
              color: C.brownL, marginTop: '1.8rem' }}>
              Mondo Coffee Bar was born from a singular obsession: to create moments worth slowing down for.
              Every bean is sourced with intention. Every cup is crafted with precision.
              Every sip is designed to transport you.
              <br /><br />
              We believe coffee is more than a drink — it's a conversation between farmer, barista, and guest.
              From the highlands where our beans are grown to the cup in your hands, we honour every step of that journey.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem', flexWrap: 'wrap' }}>
              {stats.map(s => (
                <div key={s.l} style={{ padding: '1.5rem 2rem', borderLeft: `1px solid ${C.gold}`,
                  display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '3rem',
                    fontWeight: 300, color: C.brown, lineHeight: 1 }}>{s.n}</span>
                  <span style={{ fontSize: '0.55rem', letterSpacing: '0.3em',
                    textTransform: 'uppercase', color: C.gold }}>{s.l}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div style={{
            aspectRatio: '3/4',
            background: 'linear-gradient(135deg,#2C1F14 0%,#5C3D2E 40%,#8B6345 75%,#C9A96E 100%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '1.5rem', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '7rem',
              fontWeight: 300, color: 'rgba(245,239,228,0.85)', letterSpacing: '0.1em', lineHeight: 1 }}>M</div>
            <div style={{ fontSize: '0.5rem', letterSpacing: '0.7em', textTransform: 'uppercase',
              color: 'rgba(201,169,110,0.8)' }}>Mondo Coffee Bar</div>
            <div style={{ width: '55%', height: 1, background: 'rgba(201,169,110,0.25)' }} />
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic',
              fontSize: '1rem', color: 'rgba(245,239,228,0.45)',
              textAlign: 'center', padding: '0 2.5rem', lineHeight: 1.9 }}>
              "A sip that settles you"
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── PRODUCTS ───────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'matcha-blue',
    gradientId: 'c1',
    stops: [{ offset: '0%', color: '#7A9B6C' }, { offset: '60%', color: '#8B6CB0' }],
    bg: 'linear-gradient(160deg,#7A9B6C30,#8B6CB050)',
    name: 'Matcha Blueberry Dream',
    price: 'Rs. 690',
    tall: true,
    width: 140,
  },
  {
    id: 'spanish',
    gradientId: 'c2',
    stops: [{ offset: '0%', color: '#C4956A' }, { offset: '100%', color: '#E8C89A' }],
    bg: 'linear-gradient(160deg,#C4956A30,#E8C89A40)',
    name: 'Iced Spanish Latte',
    price: 'Rs. 590',
  },
  {
    id: 'strawberry',
    gradientId: 'c3',
    stops: [{ offset: '0%', color: '#6CAE76' }, { offset: '50%', color: '#D4607A' }, { offset: '100%', color: '#F5A0AA' }],
    bg: 'linear-gradient(160deg,#D4607A30,#F5A0AA40)',
    name: 'Strawberry Mojito',
    price: 'Rs. 620',
  },
  {
    id: 'salted',
    gradientId: 'c4',
    stops: [{ offset: '0%', color: '#C8A060' }, { offset: '100%', color: '#8B5E3C' }],
    bg: 'linear-gradient(160deg,#C8A06030,#8B5E3C40)',
    name: 'Salted Caramel Latte',
    price: 'Rs. 530',
  },
  {
    id: 'choc',
    gradientId: 'c5',
    stops: [{ offset: '0%', color: '#A0735A' }, { offset: '100%', color: '#6B4226' }],
    bg: 'linear-gradient(160deg,#6B422630,#A0735A40)',
    name: 'Hot Chocolate',
    price: 'Rs. 630',
  },
]

function ProductCard({ product, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="prod-card" style={{ background: C.beige }}>
        <div className="prod-img-wrap" style={{ background: product.bg, aspectRatio: product.tall ? '2/3' : '3/4' }}>
          <DrinkCan gradientId={product.gradientId} stops={product.stops} width={product.tall ? 140 : 110} />
        </div>
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem',
          background: 'linear-gradient(to top,rgba(26,20,16,.85) 0%,transparent 100%)',
        }}>
          <div style={{ fontSize: '0.48rem', letterSpacing: '0.4em',
            textTransform: 'uppercase', color: C.gold, marginBottom: '0.25rem' }}>Pantone</div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.35rem',
            fontWeight: 300, color: C.cream }}>{product.name}</div>
        </div>
        <div className="prod-overlay">
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.9rem',
            fontWeight: 300, color: C.cream, lineHeight: 1.1 }}>{product.name}</div>
          <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: C.gold }}>{product.price}</div>
          <button style={{
            fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase',
            color: C.dark, background: C.gold, padding: '0.8rem 2rem',
            border: 'none', cursor: 'pointer', marginTop: '0.6rem',
            transition: 'background 0.3s',
          }}>Add to Order</button>
        </div>
      </div>
    </Reveal>
  )
}

function Products() {
  return (
    <section id="menu" style={{ padding: '7rem 5rem', background: C.cream }}>
      <Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <p style={{ fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.55em',
              textTransform: 'uppercase', color: C.gold, marginBottom: '1.4rem' }}>The Collection</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.4rem,5vw,4.5rem)', fontWeight: 300, lineHeight: 1.08, color: C.brown }}>
              Chilled to <em style={{ fontStyle: 'italic' }}>Perfection</em>
            </h2>
          </div>
          <a href="https://www.mondo.pk" target="_blank" rel="noreferrer"
            className="btn-shimmer" style={{
              fontSize: '0.62rem', fontWeight: 400, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: C.dark,
              background: C.gold, padding: '1rem 2.6rem', textDecoration: 'none',
            }}><span>Full Menu</span></a>
        </div>
      </Reveal>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3,1fr)',
        gridTemplateRows: 'auto auto',
        gap: '1.2rem',
      }}>
        <div style={{ gridRow: 'span 2' }}>
          <ProductCard product={PRODUCTS[0]} />
        </div>
        <ProductCard product={PRODUCTS[1]} delay={0.1} />
        <ProductCard product={PRODUCTS[2]} delay={0.2} />
        <ProductCard product={PRODUCTS[3]} delay={0.1} />
        <ProductCard product={PRODUCTS[4]} delay={0.2} />
      </div>
    </section>
  )
}

/* ─── EXPERIENCE ─────────────────────────────────── */
const FEATS = [
  { n: '01', title: 'Artisan Sourcing', body: 'Single-origin beans selected from the world\'s finest growing regions, roasted to exact profiles.' },
  { n: '02', title: 'Precision Brewing', body: 'Every extraction timed, every temperature calibrated. Science meets soul in every cup.' },
  { n: '03', title: 'Express Delivery', body: 'From our bar to your door in under 40 minutes. Fresh, hot, and perfectly packaged.' },
  { n: '04', title: 'Seasonal Menus', body: 'Rotating specials that celebrate the finest flavours each season has to offer.' },
]

function ExpFeat({ feat, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      variants={fadeUp(delay)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      style={{
        padding: '2.5rem', background: C.dark2,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '0.5rem',
        transition: 'background 0.4s',
      }}
      whileHover={{ backgroundColor: 'rgba(92,61,46,0.3)' }}
    >
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.8rem',
        fontWeight: 300, color: 'rgba(201,169,110,0.25)', lineHeight: 1 }}>{feat.n}</div>
      <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem',
        fontWeight: 300, color: C.cream }}>{feat.title}</div>
      <div style={{ fontSize: '0.72rem', fontWeight: 200, lineHeight: 1.9,
        color: 'rgba(245,239,228,0.35)' }}>{feat.body}</div>
    </motion.div>
  )
}

function Experience() {
  return (
    <section id="experience" style={{ background: C.dark2 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '70vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 5rem' }}>
          <Reveal>
            <p style={{ fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.55em',
              textTransform: 'uppercase', color: C.gold, marginBottom: '1.4rem' }}>The Experience</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.4rem,5vw,4.5rem)', fontWeight: 300, lineHeight: 1.08, color: C.cream }}>
              More Than<br /><em style={{ fontStyle: 'italic' }}>A Coffee</em>
            </h2>
            <p style={{ fontSize: '0.78rem', fontWeight: 200, lineHeight: 2.3,
              color: 'rgba(245,239,228,0.45)', margin: '1.5rem 0 2.5rem' }}>
              Every Mondo visit is a curated sensory journey. From the moment you walk in — or we arrive at your door — we obsess over every detail so you don't have to.
            </p>
            <a href="#delivery" className="btn-shimmer" style={{
              fontSize: '0.62rem', fontWeight: 400, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: C.dark,
              background: C.gold, padding: '1rem 2.6rem', textDecoration: 'none',
              display: 'inline-block',
            }}><span>Order Delivery</span></a>
          </Reveal>
        </div>
        <div style={{
          display: 'grid', gridTemplateRows: '1fr 1fr', gridTemplateColumns: '1fr 1fr',
          gap: '1px', background: 'rgba(201,169,110,0.08)',
        }}>
          {FEATS.map((f, i) => <ExpFeat key={f.n} feat={f} delay={i * 0.15} />)}
        </div>
      </div>
    </section>
  )
}

/* ─── TESTIMONIALS ───────────────────────────────── */
const TESTIS = [
  { stars: '★★★★★', text: 'Mondo isn\'t just coffee — it\'s the ritual that makes my mornings worth waking up for.', author: 'Ayesha R. — Karachi' },
  { stars: '★★★★★', text: 'The Matcha Blueberry Dream is extraordinary. Never had anything like it in Pakistan.', author: 'Omar F. — Lahore' },
  { stars: '★★★★★', text: 'Delivery was perfect. Coffee arrived hot and fresh. The packaging alone made it special.', author: 'Sara K. — Islamabad' },
]

function Testimonials() {
  return (
    <section style={{ padding: '7rem 5rem', background: C.beige }}>
      <Reveal>
        <p style={{ fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.55em',
          textTransform: 'uppercase', color: C.gold, marginBottom: '1.4rem' }}>What People Say</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2.4rem,5vw,4.5rem)', fontWeight: 300, lineHeight: 1.08, color: C.brown }}>
          Loved by <em style={{ fontStyle: 'italic' }}>Connoisseurs</em>
        </h2>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', marginTop: '3.5rem' }}>
        {TESTIS.map((t, i) => (
          <Reveal key={i} delay={i * 0.15}>
            <motion.div
              whileHover={{ y: -5 }}
              style={{ padding: '2.5rem', background: C.cream, position: 'relative', transition: 'transform 0.4s' }}
            >
              <div style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '5rem', fontWeight: 300,
                color: C.gold, lineHeight: 1, opacity: 0.3,
                position: 'absolute', top: '0.8rem', left: '1.5rem',
              }}>&ldquo;</div>
              <div style={{ color: C.gold, fontSize: '0.65rem', letterSpacing: '0.2em', marginTop: '1rem' }}>{t.stars}</div>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.05rem',
                fontWeight: 300, fontStyle: 'italic', lineHeight: 1.85, color: C.brown,
                marginTop: '1.5rem', marginBottom: '1.5rem' }}>{t.text}</p>
              <p style={{ fontSize: '0.58rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: C.gold }}>{t.author}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─── GALLERY ────────────────────────────────────── */
const GALLERY_ITEMS = [
  { bg: '#2C1F14', letterColor: '#C9A96E', cap: 'Espresso', capColor: '#C9A96E' },
  { bg: '#6B7056', letterColor: '#EDE4D3', cap: 'Matcha', capColor: '#EDE4D3' },
  { bg: '#D4A5A5', letterColor: '#5C3D2E', cap: 'Blends', capColor: '#5C3D2E' },
  { bg: '#5C3D2E', letterColor: '#F5EFE4', cap: 'Bites', capColor: '#F5EFE4' },
  { bg: '#EDE4D3', letterColor: '#8B6345', cap: 'Iced', capColor: '#8B6345' },
]

function Gallery() {
  return (
    <section style={{ padding: '7rem 5rem 0', background: C.cream }}>
      <Reveal>
        <p style={{ fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.55em',
          textTransform: 'uppercase', color: C.gold, marginBottom: '1.4rem' }}>Gallery</p>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2.4rem,5vw,4.5rem)', fontWeight: 300, lineHeight: 1.08, color: C.brown }}>
          The <em style={{ fontStyle: 'italic' }}>Mondo</em> World
        </h2>
      </Reveal>
      <div className="gallery-strip" style={{ marginTop: '3rem' }}>
        {GALLERY_ITEMS.map((item) => (
          <div key={item.cap} className="gallery-item" style={{ background: item.bg }}>
            <div className="gallery-inner">
              <div className="gallery-letter" style={{ color: item.letterColor }}>M</div>
              <div className="gallery-cap" style={{ color: item.capColor }}>{item.cap}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── CTA ────────────────────────────────────────── */
function CTA() {
  return (
    <section id="delivery" style={{
      background: C.brown, textAlign: 'center',
      padding: '8rem 5rem', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 70% 60% at 50% 0%,rgba(201,169,110,.18) 0%,transparent 70%),
          radial-gradient(ellipse 40% 50% at 0% 100%,rgba(26,20,16,.3) 0%,transparent 60%)`,
      }} />
      <div style={{ position: 'relative' }}>
        <Reveal>
          <p style={{ fontSize: '0.58rem', fontWeight: 300, letterSpacing: '0.55em',
            textTransform: 'uppercase', color: C.goldL, marginBottom: '1.5rem' }}>
            Now Delivering Across Karachi
          </p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3rem,7vw,6rem)', fontWeight: 300,
            color: C.cream, lineHeight: 1.08, margin: '1.5rem 0 3rem' }}>
            Your Favourite<br />
            <em style={{ fontStyle: 'italic', color: C.goldL }}>Cup, Delivered</em>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="https://www.mondo.pk" target="_blank" rel="noreferrer"
              className="btn-shimmer" style={{
                fontSize: '0.62rem', fontWeight: 400, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: C.dark,
                background: C.gold, padding: '1rem 2.6rem', textDecoration: 'none',
              }}><span>Order at mondo.pk</span></a>
            <a href="tel:+920000000" style={{
              fontSize: '0.62rem', fontWeight: 300, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: C.cream,
              border: '1px solid rgba(245,239,228,0.3)',
              padding: '1rem 2.5rem', textDecoration: 'none',
              transition: 'all 0.4s', display: 'inline-block',
            }}>Call to Order</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── FOOTER ─────────────────────────────────────── */
function Footer() {
  const cols = [
    { title: 'Menu', links: ['Hot Drinks', 'Iced Collection', 'Frappe', 'Matcha', 'Bites'] },
    { title: 'Visit', links: ['Locations', 'Hours', 'Private Events', 'Franchise'] },
    { title: 'Connect', links: ['Instagram', 'TikTok', 'WhatsApp', 'mondo.pk'] },
  ]
  return (
    <footer style={{ background: C.dark }}>
      <div style={{
        padding: '5rem', display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem',
      }}>
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.8rem',
            fontWeight: 300, letterSpacing: '0.35em', color: C.cream, marginBottom: '1rem' }}>MONDO</div>
          <p style={{ fontSize: '0.72rem', fontWeight: 200, lineHeight: 2.1,
            color: 'rgba(245,239,228,0.35)', maxWidth: 230 }}>
            A coffee bar for those who believe every sip should mean something.
          </p>
        </div>
        {cols.map(col => (
          <div key={col.title}>
            <p style={{ fontSize: '0.52rem', letterSpacing: '0.45em', textTransform: 'uppercase',
              color: C.gold, marginBottom: '1.4rem' }}>{col.title}</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {col.links.map(l => (
                <li key={l}><a href="#" style={{ fontSize: '0.73rem', fontWeight: 200,
                  color: 'rgba(245,239,228,0.4)', textDecoration: 'none', transition: 'color 0.3s' }}>{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        padding: '1.5rem 5rem',
        borderTop: '1px solid rgba(245,239,228,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: '0.58rem', fontWeight: 200, letterSpacing: '0.15em',
        color: 'rgba(245,239,228,0.22)',
      }}>
        <span>© 2026 Mondo Coffee Bar. All rights reserved.</span>
        <span>www.mondo.pk</span>
      </div>
    </footer>
  )
}

/* ─── APP ────────────────────────────────────────── */
export default function App() {
  const [loaderDone, setLoaderDone] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaderDone(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Loader done={loaderDone} />
      <Nav scrolled={scrolled} />
      <Hero />
      <Story />
      <Products />
      <Experience />
      <Testimonials />
      <Gallery />
      <CTA />
      <Footer />
    </>
  )
}
