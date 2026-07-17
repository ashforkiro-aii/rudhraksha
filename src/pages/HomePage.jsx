import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { ArrowRight, Shield, Truck, Headphones, CheckCircle } from "lucide-react"
import { CATEGORIES } from "../data/products"
import { fetchProducts } from "../services/productService"
import { getSetting } from "../services/settingsService"
import ProductCard from "../components/ProductCard"
import SkeletonCard from "../components/SkeletonCard"
import ScrollReveal from "../components/ScrollReveal"
import ReviewsSection from "../components/ReviewsSection"
import hero1Img from "../assets/hero1.png"

// local fallback image used only when no hero media is set in DB
const LOCAL_HERO_FALLBACK = hero1Img

const FALLBACK_CAT_IMG = "https://images.unsplash.com/photo-1614703012479-0fe5f6a89be0?w=600&q=80"

const CAT_DESC = {
  "1-14 Mukhi": "Single beads, specific benefits",
  "Rudraksha Mala": "For chanting & wearing",
  "Bracelets": "Stylish, dynamic designs",
  "Rare Collectibles": "Gauri Shankar, Ganesh",
}

const FEATURES = [
  { icon: <CheckCircle size={26} strokeWidth={1.5} />, title: "100% AUTHENTIC", sub: "(Certified Lab)" },
  { icon: <Shield size={26} strokeWidth={1.5} />, title: "GENUINE SOURCING", sub: "" },
  { icon: <Headphones size={26} strokeWidth={1.5} />, title: "EXPERT COUNSELING", sub: "" },
  { icon: <Truck size={26} strokeWidth={1.5} />, title: "FREE SHIPPING", sub: "" },
]

/* ─── full-width section padding ─── */
const PX = "px-4 sm:px-6 lg:px-10 xl:px-16"

/* ─── Hero ─── */
function HeroSlider({ heroVideoUrl, heroBgImageUrl }) {
  const [slide, setSlide] = useState(0)
  const timerRef = useRef(null)
  const TOTAL = 3

  useEffect(() => {
    timerRef.current = setInterval(() => setSlide(s => (s + 1) % TOTAL), 5000)
    return () => clearInterval(timerRef.current)
  }, [])

  // loading state — both values are null until fetched
  const stillLoading = heroVideoUrl === null || heroBgImageUrl === null

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "clamp(360px, 52vw, 600px)" }}>
      {stillLoading ? (
        /* dark placeholder while DB values load */
        <div className="absolute inset-0 bg-[#1A0A02]" />
      ) : heroVideoUrl ? (
        /* video takes priority when set */
        <video src={heroVideoUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
      ) : heroBgImageUrl ? (
        /* DB-sourced background image */
        <img src={heroBgImageUrl} alt="Authentic Rudraksha - Divine Beads" className="absolute inset-0 w-full h-full object-cover object-center" />
      ) : (
        /* local asset fallback when neither is set */
        <img src={LOCAL_HERO_FALLBACK} alt="Authentic Rudraksha - Divine Beads" className="absolute inset-0 w-full h-full object-cover object-center" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/25" />

      <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-4 sm:px-8">
        <motion.h1
          key={slide}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="font-bold text-[#E5A020] mb-3 leading-tight uppercase"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.4rem, 3.8vw, 3rem)",
            letterSpacing: "0.05em",
            textShadow: "0 2px 20px rgba(0,0,0,0.9)",
          }}>
          Authentic Rudraksha<br />For Spiritual Awakening
        </motion.h1>

        <motion.p
          key={`p-${slide}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.45 }}
          className="text-[#F0DDB8] max-w-lg mb-7 leading-relaxed"
          style={{ fontSize: "clamp(0.78rem, 1.4vw, 0.95rem)", textShadow: "0 1px 10px rgba(0,0,0,0.95)" }}>
          Embrace the divine power, energy, and protection with Genuinely Sourced Rudraksha Beads from Nepal &amp; India.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.4 }}>
          <Link
            to="/#categories"
            onClick={e => { e.preventDefault(); document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" }) }}
            className="inline-flex items-center justify-center px-8 py-2.5 font-bold rounded border-2 border-[#C8860A] text-[#E5A020] hover:bg-[#C8860A] hover:text-[#1A0A02] transition-all duration-300 text-[11px] tracking-[0.2em] uppercase">
            SHOP COLLECTION
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {Array(TOTAL).fill(0).map((_, i) => (
          <button key={i} onClick={() => { setSlide(i); clearInterval(timerRef.current) }}
            className={`rounded-full transition-all duration-300 ${i === slide ? "w-5 h-1.5 bg-[#C8860A]" : "w-1.5 h-1.5 bg-white/30"}`} />
        ))}
      </div>
    </section>
  )
}

/* ─── Section heading ─── */
function SectionTitle({ text }) {
  return (
    <div className="text-center mb-8">
      <h2 className="font-bold text-[#F5E6C8] uppercase tracking-[0.07em]"
        style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1rem, 2vw, 1.4rem)" }}>
        {text}
      </h2>
      <div className="w-12 h-0.5 bg-[#C8860A] mx-auto mt-2.5" />
    </div>
  )
}

/* ─── Inline section header with View All ─── */
function SectionHeader({ label, title, link }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-[#C8860A] text-[10px] uppercase tracking-[0.2em] mb-1 font-bold">{label}</p>
        <h2 className="text-xl sm:text-2xl font-bold text-[#F5E6C8]" style={{ fontFamily: "Georgia, serif" }}>{title}</h2>
      </div>
      {link && (
        <Link to={link} className="flex items-center gap-1 text-[12px] text-[#C8860A] hover:text-[#E5A020] font-semibold transition-colors shrink-0">
          View All <ArrowRight size={13} />
        </Link>
      )}
    </div>
  )
}

/* ─── Main page ─── */
export default function HomePage() {
  const [newArrivals, setNewArrivals] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [loading, setLoading] = useState(true)
  const [dynamicCategories, setDynamicCategories] = useState(CATEGORIES)
  const [categoryImageMap, setCategoryImageMap] = useState({})
  const [heroVideoUrl, setHeroVideoUrl] = useState(null)
  const [heroBgImageUrl, setHeroBgImageUrl] = useState(null)
  const [features, setFeatures] = useState(FEATURES)

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
      if (val) {
        try {
          const p = JSON.parse(val)
          if (Array.isArray(p) && p.length)
            setFeatures(p.map((f, i) => ({ ...FEATURES[i % FEATURES.length], title: f.title?.toUpperCase() || FEATURES[i % FEATURES.length].title, sub: f.desc || "" })))
        } catch {}
      }
    }).catch(() => {})
  }, [])

  return (
    <>
      <Helmet>
        <title>Rudhraksha Divine - Authentic Sacred Beads</title>
        <meta name="description" content="Authentic certified Rudraksha beads from Nepal & Java." />
      </Helmet>

      {/* HERO — full viewport width */}
      <HeroSlider heroVideoUrl={heroVideoUrl} heroBgImageUrl={heroBgImageUrl} />

      {/* COLLECTIONS */}
      <section id="categories" className={`w-full py-10 bg-[#1C0D05] ${PX}`}>
        <ScrollReveal>
          <SectionTitle text="Our Divine Collections" />
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 lg:gap-5">
          {dynamicCategories.slice(0, 8).map((cat, i) => {
            const media = categoryImageMap[cat] || FALLBACK_CAT_IMG
            const isVid = /\.(mp4|mov|webm|ogg)(\?|$)/i.test(media)
            return (
              <ScrollReveal key={cat} delay={i * 0.05}>
                <Link to={`/products?category=${encodeURIComponent(cat)}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[#4A2810] hover:border-[#C8860A]/70 bg-[#230E05] hover:shadow-[0_6px_28px_rgba(200,134,10,0.2)] transition-all duration-300 h-full">
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1" }}>
                    {isVid
                      ? <video src={media} muted loop playsInline autoPlay className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      : <img src={media} alt={cat} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={e => { e.target.src = FALLBACK_CAT_IMG }} />
                    }
                  </div>
                  <div className="px-3 py-3 flex flex-col flex-1">
                    <h3 className="text-[#F5E6C8] font-bold text-[12px] sm:text-[13px] mb-1 uppercase tracking-wide leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                      {cat}
                    </h3>
                    <p className="text-[#8B6040] text-[11px] leading-relaxed flex-1 mb-3">
                      {CAT_DESC[cat] || "Authentic sacred beads"}
                    </p>
                    <span className="inline-flex items-center text-[10px] font-bold text-[#C8860A] border border-[#C8860A]/50 px-3 py-1 rounded self-start uppercase tracking-[0.1em] group-hover:bg-[#C8860A] group-hover:text-[#1A0A02] transition-all duration-300">
                      EXPLORE
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
        <section className={`w-full py-10 bg-[#150801] border-y border-[#3D1F0A] ${PX}`}>
          <SectionTitle text="Why Choose Rudraksha Divine?" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-10">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full border border-[#C8860A]/50 flex items-center justify-center text-[#C8860A]" style={{ background: "rgba(200,134,10,0.07)" }}>
                  {f.icon || FEATURES[i % FEATURES.length].icon}
                </div>
                <div>
                  <p className="text-[#F5E6C8] text-[11px] font-bold tracking-wide uppercase leading-tight">{f.title}</p>
                  {(f.sub || f.desc) && <p className="text-[#8B6040] text-[10px] mt-0.5">{f.sub || f.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* BESTSELLERS */}
      <section className={`w-full py-10 bg-[#1C0D05] ${PX}`}>
        <ScrollReveal>
          <SectionHeader label="Devotee Favourites" title="Bestsellers" link="/products?tags=premium" />
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {loading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : bestSellers.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.04}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className={`w-full py-10 bg-[#150801] ${PX}`}>
        <ScrollReveal>
          <SectionHeader label="Just In" title="New Arrivals" link="/products?sort=newest" />
        </ScrollReveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {loading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : newArrivals.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.04}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="w-full bg-[#1C0D05]">
        <ScrollReveal>
          <ReviewsSection />
        </ScrollReveal>
      </section>
    </>
  )
}
