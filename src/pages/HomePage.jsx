import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { ArrowRight, Shield, Truck, Headphones, CheckCircle, Star, Award, Users } from "lucide-react"
import { CATEGORIES } from "../data/products"
import { fetchProducts } from "../services/productService"
import { getSetting } from "../services/settingsService"
import { useLanguage } from "../context/LanguageContext"
import ProductCard from "../components/ProductCard"
import SkeletonCard from "../components/SkeletonCard"
import ScrollReveal from "../components/ScrollReveal"
import ReviewsSection from "../components/ReviewsSection"
import hero1Img from "../assets/hero1.png"

const LOCAL_HERO_FALLBACK = hero1Img
const FALLBACK_CAT_IMG = "https://images.unsplash.com/photo-1614703012479-0fe5f6a89be0?w=600&q=80"
const CAT_DESC = {
  "1-14 Mukhi": "Single beads, specific benefits",
  "Rudraksha Mala": "For chanting & wearing",
  "Bracelets": "Stylish, divine designs",
  "Rare Collectibles": "Gauri Shankar, Ganesh",
}
const PX = "px-4 sm:px-6 lg:px-10 xl:px-16"

/* ─── Hero ─── */
function HeroSlider({ heroVideoUrl, heroBgImageUrl }) {
  const { t } = useLanguage()
  const [slide, setSlide] = useState(0)
  const timerRef = useRef(null)
  const TOTAL = 3
  useEffect(() => {
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % TOTAL), 5000)
    return () => clearInterval(timerRef.current)
  }, [])
  const stillLoading = heroVideoUrl === null || heroBgImageUrl === null
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(360px, 52vw, 620px)" }}>
      <div className="absolute inset-0 bas-relief-bg" />
      {stillLoading ? <div className="absolute inset-0 bg-[#EAE0D3]/80" />
        : heroVideoUrl ? <video src={heroVideoUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
        : heroBgImageUrl ? <img src={heroBgImageUrl} alt="Authentic Rudraksha" className="absolute inset-0 w-full h-full object-cover object-center" />
        : <img src={LOCAL_HERO_FALLBACK} alt="Authentic Rudraksha" className="absolute inset-0 w-full h-full object-cover object-center" />
      }
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(115,65,41,0.72) 0%, rgba(115,65,41,0.38) 45%, rgba(234,224,211,0.18) 100%)" }} />
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-4 text-[#FABE1A] text-[11px] tracking-[0.35em] uppercase font-bold"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.6)" }}>
          {t.heroSubtitle}
        </motion.div>
        <motion.h1 key={slide} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="font-bold mb-3 leading-tight uppercase"
          style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.5rem, 4vw, 3.2rem)", letterSpacing: "0.06em", color: "#F2EAE0", textShadow: "0 3px 24px rgba(0,0,0,0.85)" }}>
          {t.heroHeading1}<br /><span style={{ color: "#FABE1A" }}>{t.heroHeading2}</span>
        </motion.h1>
        <motion.p key={`p-${slide}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.45 }}
          className="max-w-lg mb-8 leading-relaxed"
          style={{ fontSize: "clamp(0.8rem, 1.4vw, 1rem)", color: "#F2EAE0", textShadow: "0 1px 10px rgba(0,0,0,0.9)", fontFamily: "Lato, sans-serif" }}>
          {t.heroDesc}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.4 }}
          className="flex gap-3 flex-wrap justify-center">
          <Link to="/#categories" onClick={e => { e.preventDefault(); document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" }) }}
            className="inline-flex items-center justify-center px-8 py-3 font-bold rounded text-[11px] tracking-[0.2em] uppercase btn-saffron"
            style={{ fontFamily: "Cinzel, serif" }}>
            {t.shopCollection}
          </Link>
          <Link to="/products"
            className="inline-flex items-center justify-center px-8 py-3 font-bold rounded text-[11px] tracking-[0.2em] uppercase btn-saffron-outline"
            style={{ color: "#F2EAE0", borderColor: "#F2EAE0", fontFamily: "Cinzel, serif" }}>
            {t.viewAll}
          </Link>
        </motion.div>
      </div>
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {Array(TOTAL).fill(0).map((_, i) => (
          <button key={i} onClick={() => { setSlide(i); clearInterval(timerRef.current) }}
            className={`rounded-full transition-all duration-300 ${i === slide ? "w-5 h-1.5 bg-[#FABE1A]" : "w-1.5 h-1.5 bg-white/40"}`} />
        ))}
      </div>
    </section>
  )
}

/* ─── About Section ─── */
function AboutSection() {
  const { t, lang } = useLanguage()
  const [dbData, setDbData] = useState(null)

  useEffect(() => {
    const key = lang === "te" ? "about_section_te" : "about_section_en"
    getSetting(key).then(val => {
      if (val) { try { setDbData(JSON.parse(val)) } catch {} }
    }).catch(() => {})
  }, [lang])

  // Use DB data if available, fall back to translation strings
  const d = dbData || {
    title: t.aboutTitle, subtitle: t.aboutSubtitle,
    p1: t.aboutP1, p2: t.aboutP2, p3: t.aboutP3,
    p4: t.aboutP4, p5: t.aboutP5, p6: t.aboutP6,
    years: t.aboutYears, yearsLabel: t.aboutYearsLabel,
    authentic: t.aboutAuthentic, authenticLabel: t.aboutAuthenticLabel,
    customers: t.aboutCustomers, customersLabel: t.aboutCustomersLabel,
  }

  const stats = [
    { value: d.years, label: d.yearsLabel, icon: <Award size={22} /> },
    { value: d.authentic, label: d.authenticLabel, icon: <CheckCircle size={22} /> },
    { value: d.customers, label: d.customersLabel, icon: <Users size={22} /> },
  ]
  return (
    <section className={`w-full py-14 ${PX}`} style={{ background: "#F2EAE0" }}>
      <ScrollReveal>
        <div className="max-w-5xl mx-auto">
          {/* Label */}
          <p className="text-center text-[10px] uppercase tracking-[0.3em] mb-2 font-bold" style={{ color: "#A67560", fontFamily: "Lato, sans-serif" }}>
            {t.aboutLabel}
          </p>
          {/* Title */}
          <div className="text-center mb-2">
            <h2 className="font-bold uppercase tracking-[0.06em] inline-block"
              style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)", color: "#734129" }}>
              {d.title}
            </h2>
            <span className="block text-sm mt-1 font-semibold" style={{ color: "#A67560", fontFamily: "Lato, sans-serif" }}>
              {d.subtitle}
            </span>
          </div>
          <div className="divider-carved w-24 mx-auto mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Text content */}
            <div className="space-y-4">
              {[d.p1, d.p2, d.p3, d.p4, d.p5, d.p6].map((para, i) => (
                <p key={i} className="leading-relaxed text-sm sm:text-base"
                  style={{ color: "#A67560", fontFamily: "Lato, sans-serif", lineHeight: "1.8" }}>
                  {i === 0 && <span className="float-left text-5xl font-bold mr-2 mt-1 leading-none" style={{ color: "#FABE1A", fontFamily: "Cinzel, serif" }}>D</span>}
                  {i === 0 ? para.slice(1) : para}
                </p>
              ))}
            </div>

            {/* Stats + decorative panel */}
            <div className="flex flex-col gap-5">
              {/* Decorative carved panel */}
              <div className="stone-panel rounded-2xl p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bas-relief-bg opacity-40" />
                <div className="relative z-10">
                  <div className="text-4xl mb-3">ॐ</div>
                  <p className="font-bold text-lg mb-1" style={{ color: "#734129", fontFamily: "Cinzel, serif" }}>
                    {d.title}
                  </p>
                  <p className="text-xs tracking-widest uppercase" style={{ color: "#A67560", fontFamily: "Lato, sans-serif" }}>
                    {d.subtitle}
                  </p>
                  <div className="divider-carved my-4" />
                  <div className="flex items-center justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#FABE1A" stroke="none" />
                    ))}
                  </div>
                  <p className="text-xs mt-2" style={{ color: "#A67560", fontFamily: "Lato, sans-serif" }}>Trusted by thousands of devotees</p>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-3">
                {stats.map((s, i) => (
                  <div key={i} className="stone-panel rounded-xl p-4 text-center">
                    <div className="icon-brass flex justify-center mb-2">{s.icon}</div>
                    <p className="font-bold text-xl" style={{ color: "#734129", fontFamily: "Cinzel, serif" }}>{s.value}</p>
                    <p className="text-[10px] leading-tight mt-1" style={{ color: "#A67560", fontFamily: "Lato, sans-serif" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}

/* ─── Section title ─── */
function SectionTitle({ text }) {
  return (
    <div className="text-center mb-8">
      <h2 className="font-bold uppercase tracking-[0.08em]"
        style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1rem, 2vw, 1.5rem)", color: "#734129" }}>
        {text}
      </h2>
      <div className="divider-carved w-20 mx-auto mt-3" />
    </div>
  )
}

/* ─── Inline section header with View All ─── */
function SectionHeader({ label, title, link }) {
  const { t } = useLanguage()
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] mb-1 font-bold" style={{ color: "#A67560", fontFamily: "Lato, sans-serif" }}>{label}</p>
        <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "Cinzel, serif", color: "#734129" }}>{title}</h2>
      </div>
      {link && (
        <Link to={link} className="flex items-center gap-1 text-[12px] font-semibold transition-colors shrink-0 hover:opacity-70"
          style={{ color: "#734129", fontFamily: "Lato, sans-serif" }}>
          {t.viewAllLink} <ArrowRight size={13} />
        </Link>
      )}
    </div>
  )
}

/* ─── Main page ─── */
export default function HomePage() {
  const { t } = useLanguage()
  const [newArrivals, setNewArrivals] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [loading, setLoading] = useState(true)
  const [dynamicCategories, setDynamicCategories] = useState(CATEGORIES)
  const [categoryImageMap, setCategoryImageMap] = useState({})
  const [heroVideoUrl, setHeroVideoUrl] = useState(null)
  const [heroBgImageUrl, setHeroBgImageUrl] = useState(null)
  const [features, setFeatures] = useState(null)

  useEffect(() => {
    getSetting("hero_video_url").then(url => setHeroVideoUrl(url || "")).catch(() => setHeroVideoUrl(""))
    getSetting("hero_bg_image_url").then(url => setHeroBgImageUrl(url || "")).catch(() => setHeroBgImageUrl(""))
  }, [])

  useEffect(() => {
    fetchProducts({ sort: "newest" }).then(data => {
      setNewArrivals(data.slice(0, 6))
      setBestSellers(data.filter(p => p.tags?.includes("premium") || p.tags?.includes("certified")).slice(0, 6))
      setLoading(false)
      const cats = [...new Set(data.map(p => p.category).filter(Boolean))]
      if (cats.length > 0) setDynamicCategories(cats.sort())
      const isVid = u => u && /\.(mp4|mov|webm|ogg)(\?|$)/i.test(u)
      const imgMap = {}
      data.forEach(p => {
        if (!p.category || imgMap[p.category]) return
        const list = Array.isArray(p.images) ? p.images : [p.image || p.images].filter(Boolean)
        const thumb = list.find(m => m && !isVid(m))
        if (thumb) imgMap[p.category] = thumb
      })
      data.forEach(p => {
        if (!p.category || imgMap[p.category]) return
        const list = Array.isArray(p.images) ? p.images : [p.image || p.images].filter(Boolean)
        if (list[0]) imgMap[p.category] = list[0]
      })
      setCategoryImageMap(imgMap)
    })
    getSetting("features_bar").then(val => {
      if (val) { try { const p = JSON.parse(val); if (Array.isArray(p) && p.length) setFeatures(p) } catch {} }
    }).catch(() => {})
  }, [])

  const FEATURES = [
    { icon: <CheckCircle size={26} strokeWidth={1.5} />, title: t.feat1Title, sub: t.feat1Sub },
    { icon: <Shield size={26} strokeWidth={1.5} />, title: t.feat2Title, sub: "" },
    { icon: <Headphones size={26} strokeWidth={1.5} />, title: t.feat3Title, sub: "" },
    { icon: <Truck size={26} strokeWidth={1.5} />, title: t.feat4Title, sub: "" },
  ]

  const displayFeatures = features
    ? features.map((f, i) => ({ ...FEATURES[i % FEATURES.length], title: f.title?.toUpperCase() || FEATURES[i % FEATURES.length].title, sub: f.desc || "" }))
    : FEATURES

  return (
    <>
      <Helmet>
        <title>Rudhraksha Divine - Authentic Sacred Beads</title>
        <meta name="description" content="Authentic certified Rudraksha beads from Nepal & India." />
      </Helmet>

      {/* HERO */}
      <HeroSlider heroVideoUrl={heroVideoUrl} heroBgImageUrl={heroBgImageUrl} />

      {/* ABOUT US */}
      <AboutSection />

      {/* COLLECTIONS */}
      <section id="categories" className={`w-full py-12 bas-relief-bg ${PX}`}>
        <ScrollReveal>
          <SectionTitle text={t.ourCollections} />
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {dynamicCategories.slice(0, 8).map((cat, i) => {
            const media = categoryImageMap[cat] || FALLBACK_CAT_IMG
            const isVid = /\.(mp4|mov|webm|ogg)(\?|$)/i.test(media)
            return (
              <ScrollReveal key={cat} delay={i * 0.05}>
                <Link to={`/products?category=${encodeURIComponent(cat)}`}
                  className="group flex flex-col overflow-hidden rounded-xl stone-panel transition-all duration-300 h-full"
                  style={{ cursor: "pointer" }}>
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1" }}>
                    {isVid
                      ? <video src={media} muted loop playsInline autoPlay className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      : <img src={media} alt={cat} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={e => { e.target.src = FALLBACK_CAT_IMG }} />
                    }
                  </div>
                  <div className="px-3 py-3 flex flex-col flex-1">
                    <h3 className="font-bold text-[12px] sm:text-[13px] mb-1 uppercase tracking-wide leading-tight heading-temple"
                      style={{ fontFamily: "Cinzel, serif" }}>{cat}</h3>
                    <p className="text-[11px] leading-relaxed flex-1 mb-3 text-body" style={{ fontFamily: "Lato, sans-serif" }}>
                      {CAT_DESC[cat] || "Authentic sacred beads"}
                    </p>
                    <span className="inline-flex items-center text-[10px] font-bold px-3 py-1 rounded self-start uppercase tracking-[0.1em] transition-all duration-300"
                      style={{ color: "#734129", border: "1px solid #D4C4B4", fontFamily: "Cinzel, serif" }}>
                      {t.explore}
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            )
          })}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <ScrollReveal>
        <section className={`w-full py-12 ${PX}`} style={{ background: "#F2EAE0", borderTop: "1px solid #D4C4B4", borderBottom: "1px solid #D4C4B4" }}>
          <SectionTitle text={t.whyChoose} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-10">
            {displayFeatures.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full flex items-center justify-center icon-brass"
                  style={{ border: "2px solid #D4C4B4", background: "#EAE0D3", boxShadow: "2px 2px 6px #C5B5A5, -1px -1px 3px #F8F3ED" }}>
                  {f.icon}
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-wide uppercase leading-tight heading-temple" style={{ fontFamily: "Cinzel, serif" }}>{f.title}</p>
                  {f.sub && <p className="text-[10px] mt-0.5 text-body" style={{ fontFamily: "Lato, sans-serif" }}>{f.sub}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* BESTSELLERS */}
      <section className={`w-full py-12 bas-relief-bg ${PX}`}>
        <ScrollReveal>
          <SectionHeader label={t.bestsellersSub} title={t.bestsellers} link="/products?tags=premium" />
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {loading ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : bestSellers.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.04}><ProductCard product={p} /></ScrollReveal>
            ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className={`w-full py-12 ${PX}`} style={{ background: "#F2EAE0" }}>
        <ScrollReveal>
          <SectionHeader label={t.newArrivalsSub} title={t.newArrivals} link="/products?sort=newest" />
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {loading ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : newArrivals.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.04}><ProductCard product={p} /></ScrollReveal>
            ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="w-full bas-relief-bg">
        <ScrollReveal><ReviewsSection /></ScrollReveal>
      </section>
    </>
  )
}
