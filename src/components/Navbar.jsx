import { useState, useRef, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Heart, Search, Menu, X, User, LogOut, ChevronDown, Package, Settings, Store, Languages, ArrowRight } from "lucide-react"
import { useAuthStore } from "../store/authStore"
import { useCartStore } from "../store/cartStore"
import { useCategoryStore } from "../store/categoryStore"
import { useAdminStore } from "../store/adminStore"
import { useLanguage } from "../context/LanguageContext"
import { getSetting } from "../services/settingsService"
import logoImg from "../assets/logo.jpg"
import toast from "react-hot-toast"
import { isAdmin as checkIsAdmin } from "./AdminRoute"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [catOpen, setCatOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const { user, signOut } = useAuthStore()
  const cartCount = useCartStore(s => s.getCount())
  const { products, loadProducts } = useAdminStore()
  const { categories, loadCategories } = useCategoryStore()
  const { t, toggleLang } = useLanguage()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const userRef = useRef(null)
  const searchRef = useRef(null)
  const isAdmin = checkIsAdmin(user)
  const isOnAdminPanel = pathname.startsWith("/admin")
  const [logoUrl, setLogoUrl] = useState(logoImg)

  useEffect(() => {
    getSetting("site_logo_url").then(url => { if (url) setLogoUrl(url) }).catch(() => {})
  }, [])

  useEffect(() => {
    if (!products.length) loadProducts()
    loadCategories()
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false)
      if (searchRef.current && !searchRef.current.contains(e.target)) setSuggestions([])
    }
    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)
    return () => { document.removeEventListener("mousedown", handler); document.removeEventListener("touchstart", handler) }
  }, [])

  const handleSearchChange = (e) => {
    const q = e.target.value
    setSearchQuery(q)
    if (q.trim().length >= 2 && products.length) {
      const lower = q.toLowerCase()
      const matches = products.filter(p =>
        p.name?.toLowerCase().includes(lower) ||
        p.category?.toLowerCase().includes(lower) ||
        (p.custom_id || "").toLowerCase().includes(lower)
      ).slice(0, 6)
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }

  const handleSearch = (e) => {
    e?.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery(""); setSuggestions([])
      setMenuOpen(false)
    }
  }

  const handleSuggestionClick = (product) => {
    navigate(`/products/${product.id}`)
    setSearchQuery(""); setSuggestions([])
  }

  const handleSignOut = async () => {
    await signOut()
    toast.success("Signed out successfully")
    navigate("/"); setUserOpen(false); setMenuOpen(false)
  }

  const closeAll = () => { setMenuOpen(false); setUserOpen(false) }

  /* ── Dark nav style ── */
  const navStyle = {
    background: "#1A0A02",
    boxShadow: "0 2px 20px rgba(0,0,0,0.7)",
    borderBottom: "2px solid #3D1F0A",
  }

  const iconStyle = "w-9 h-9 flex items-center justify-center text-[#DDB87A] hover:text-[#C8860A] transition-colors"

  return (
    <nav className="sticky top-0 z-50 w-full" style={navStyle}>

      {/* TOP ROW */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 h-[64px] flex items-center gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 flex-shrink-0" onClick={closeAll}>
          <div style={{ boxShadow: "2px 2px 6px #C5B5A5, -1px -1px 3px #F8F3ED", borderRadius: "50%" }}>
          <img src={logoUrl} alt="Rudhraksha Divine" className="h-10 w-10 rounded-full object-cover border-2 border-[#734129] flex-shrink-0" onError={e => { e.target.src = logoImg }} />
          </div>
          <div className="hidden sm:block leading-none">
            <div className="font-bold tracking-wide text-[1rem] text-[#C8860A]" style={{ fontFamily: "Cinzel, serif" }}>RUDRAKSHA</div>
            <div className="text-[9px] tracking-[0.3em] uppercase mt-0.5 text-[#DDB87A]">DIVINE</div>
          </div>
        </Link>

        {/* Desktop Search */}
        <div ref={searchRef} className="hidden lg:block relative flex-1 max-w-xs mx-6">
          <form onSubmit={handleSearch} className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
            <input
              type="text" value={searchQuery} onChange={handleSearchChange}
              placeholder={t.search}
              className="w-full rounded-full pl-9 pr-9 py-2 text-sm text-white placeholder-white/30 focus:outline-none transition-colors"
              style={{
                background: "#2A1408",
                border: "1px solid #5C3015",
              }}
            />
            {searchQuery && (
              <button type="button" onClick={() => { setSearchQuery(""); setSuggestions([]) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
                <X size={12} />
              </button>
            )}
          </form>
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                className="absolute top-full left-0 right-0 mt-2 rounded-xl z-50 overflow-hidden"
                style={{ background: "#2A1408", border: "1px solid #5C3015", boxShadow: "4px 4px 16px rgba(0,0,0,0.5)" }}>
                {suggestions.map(p => (
                  <button key={p.id} onClick={() => handleSuggestionClick(p)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#3D1F0A] transition-colors text-left">
                    {p.images?.[0] && <img src={p.images[0]} alt="" className="w-8 h-8 object-cover rounded-lg flex-shrink-0 border border-[#5C3015]" onError={e => { e.target.style.display = "none" }} />}
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold truncate">{p.name}</p>
                      <p className="text-[#DDB87A] text-xs">{p.category}{p.custom_id ? ` · ${p.custom_id}` : ""}</p>
                    </div>
                    <span className="text-white text-xs font-bold flex-shrink-0">
                      {p.price?.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                    </span>
                  </button>
                ))}
                <button onClick={() => handleSearch()}
                  className="w-full px-3 py-2 text-xs text-[#C8860A] hover:bg-[#3D1F0A] border-t border-[#5C3015] text-center font-semibold">
                  {t.seeAllResults(searchQuery)}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0 ml-auto">
          {isAdmin && (
            <Link to={isOnAdminPanel ? "/" : "/admin"}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-md transition-all mr-1"
              style={{ background: "#C8860A", color: "#1A0A02" }}>
              {isOnAdminPanel ? <><Store size={12} /> User</> : <><Settings size={12} /> Admin</>}
            </Link>
          )}

          <button className={`lg:hidden ${iconStyle}`} onClick={() => setMenuOpen(!menuOpen)}>
            <Search size={19} />
          </button>

          {/* Language Toggle */}
          <button onClick={toggleLang}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all"
            style={{ background: "#FABE1A", color: "#734129", fontFamily: "Cinzel, serif", boxShadow: "1px 1px 4px #C5B5A5" }}
            title="Switch Language">
            <Languages size={13} />
            {t.langToggle}
          </button>

          <Link to={user ? "/wishlist" : "/login"} className={iconStyle}>
            <Heart size={19} />
          </Link>

          <Link to="/cart" className={`${iconStyle} relative`}>
            <ShoppingCart size={19} />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-[#C8860A] text-[#1A0A02] text-[9px] rounded-full min-w-[16px] h-4 flex items-center justify-center font-bold px-0.5 leading-none">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative" ref={userRef}>
              <button onClick={() => setUserOpen(o => !o)} className={iconStyle}>
                {user.user_metadata?.avatar_url
                  ? <img src={user.user_metadata.avatar_url} alt="avatar" className="w-7 h-7 rounded-full object-cover border-2 border-[#C8860A]" />
                  : <div className="w-7 h-7 rounded-full bg-[#C8860A] flex items-center justify-center flex-shrink-0"><User size={13} className="text-[#1A0A02]" /></div>
                }
              </button>
              <AnimatePresence>
                {userOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-52 rounded-xl py-2 z-50"
                    style={{ background: "#2A1408", border: "1px solid #5C3015", boxShadow: "4px 4px 20px rgba(0,0,0,0.6)" }}>
                    <div className="px-4 py-2.5 mb-1" style={{ borderBottom: "1px solid #5C3015" }}>
                      <p className="text-[#C8860A] text-xs font-bold truncate">{user.user_metadata?.full_name || user.user_metadata?.name || "User"}</p>
                      <p className="text-[#DDB87A] text-[11px] truncate mt-0.5">{user.email}</p>
                    </div>
                    {[
                      { to: "/profile", icon: <User size={13} />, label: "Profile" },
                      { to: "/orders", icon: <Package size={13} />, label: "My Orders" },
                      { to: "/wishlist", icon: <Heart size={13} />, label: "Wishlist" },
                    ].map(item => (
                      <Link key={item.to} to={item.to} onClick={() => setUserOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/50 hover:text-[#C8860A] hover:bg-[#3D1F0A] transition-colors">
                        {item.icon} {item.label}
                      </Link>
                    ))}
                    {isAdmin && (
                      <Link to={isOnAdminPanel ? "/" : "/admin"} onClick={() => setUserOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#C8860A] hover:bg-[#3D1F0A] font-semibold transition-colors">
                        {isOnAdminPanel ? <><Store size={13} /> Switch to User</> : <><Settings size={13} /> Switch to Admin</>}
                      </Link>
                    )}
                    <div className="mt-1 pt-1" style={{ borderTop: "1px solid #5C3015" }}>
                      <button onClick={handleSignOut} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/50 hover:text-red-400 hover:bg-red-900/20 w-full transition-colors">
                        <LogOut size={13} /> Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="hidden sm:inline-flex items-center h-8 px-4 rounded-md font-bold text-[12px] ml-1"
              style={{ background: "#C8860A", color: "#1A0A02" }}>
              Login
            </Link>
          )}

          <button className={`lg:hidden ${iconStyle}`} onClick={() => setMenuOpen(m => !m)}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* BOTTOM ROW: Nav links (desktop) */}
      {!isOnAdminPanel && (
        <div className="hidden lg:block w-full" style={{ borderTop: "1px solid #3D1F0A", borderBottom: "1px solid #3D1F0A" }}>
          <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 flex items-center justify-center h-10">
            {[
              { to: "/", label: t.home },
              { to: "/products", label: t.allRudraksha },
            ].map(item => (
              <Link key={item.to} to={item.to} onClick={closeAll}
                className="px-6 h-10 flex items-center text-[11px] font-bold tracking-[0.12em] text-white/50 hover:text-[#C8860A] transition-colors whitespace-nowrap"
                style={{ borderBottom: "2px solid transparent", fontFamily: "Cinzel, serif" }}
                onMouseEnter={e => e.currentTarget.style.borderBottomColor = "#C8860A"}
                onMouseLeave={e => e.currentTarget.style.borderBottomColor = "transparent"}>
                {item.label}
              </Link>
            ))}
            <div className="relative h-10 flex items-center" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className="px-6 h-10 flex items-center gap-1 text-[11px] font-bold tracking-[0.12em] text-white/50 hover:text-[#C8860A] transition-colors whitespace-nowrap"
                style={{ fontFamily: "Cinzel, serif" }}>
                {t.collections} <ChevronDown size={11} />
              </button>
              <AnimatePresence>
                {catOpen && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-52 rounded-b-xl py-1.5 z-50"
                    style={{ background: "#2A1408", border: "1px solid #5C3015", boxShadow: "4px 8px 20px rgba(0,0,0,0.5)" }}>
                    {categories.map(cat => (
                      <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`}
                        className="block px-4 py-2.5 text-[13px] text-white/50 hover:text-[#C8860A] hover:bg-[#3D1F0A] transition-colors"
                        onClick={() => setCatOpen(false)}>{cat}</Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/contact" onClick={closeAll}
              className="px-6 h-10 flex items-center text-[11px] font-bold tracking-[0.12em] text-white/50 hover:text-[#C8860A] transition-colors whitespace-nowrap"
              style={{ fontFamily: "Cinzel, serif" }}>
              {t.contactUs}
            </Link>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden" style={{ borderTop: "1px solid #3D1F0A", background: "#1A0A02" }}>
            <div className="px-4 py-4 flex flex-col gap-1">
              {/* Mobile Search */}
              <div ref={searchRef} className="relative mb-3">
                <form onSubmit={handleSearch} className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
                  <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search rudraksha..." autoFocus
                    className="w-full rounded-full pl-9 pr-9 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none"
                    style={{ background: "#2A1408", border: "1px solid #5C3015" }} />
                  {searchQuery && (
                    <button type="button" onClick={() => { setSearchQuery(""); setSuggestions([]) }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"><X size={12} /></button>
                  )}
                </form>
                <AnimatePresence>
                  {suggestions.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                      className="absolute top-full left-0 right-0 mt-1 rounded-xl z-50 overflow-hidden"
                      style={{ background: "#2A1408", border: "1px solid #5C3015", boxShadow: "4px 4px 16px rgba(0,0,0,0.5)" }}>
                      {suggestions.map(p => (
                        <button key={p.id} onClick={() => { handleSuggestionClick(p); setMenuOpen(false) }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#3D1F0A] text-left">
                          {p.images?.[0] && <img src={p.images[0]} alt="" className="w-8 h-8 object-cover rounded-lg flex-shrink-0" onError={e => { e.target.style.display = "none" }} />}
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-semibold truncate">{p.name}</p>
                            <p className="text-[#DDB87A] text-xs">{p.category}</p>
                          </div>
                          <span className="text-white text-xs font-bold">₹{p.price?.toLocaleString("en-IN")}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {[
                { to: "/", label: t.home },
                { to: "/products", label: t.allRudraksha },
                { to: "/contact", label: t.contactUs },
              ].map(item => (
                <Link key={item.to} to={item.to} onClick={closeAll}
                  className="py-2.5 px-2 text-sm font-semibold text-white/50 hover:text-[#C8860A] transition-colors"
                  style={{ borderBottom: "1px solid #3D1F0A" }}>{item.label}</Link>
              ))}

              <div className="py-2 px-2" style={{ borderBottom: "1px solid #3D1F0A" }}>
                <p className="text-[#DDB87A] text-[10px] uppercase tracking-widest mb-2 font-bold">{t.collections}</p>
                <div className="grid grid-cols-2 gap-1">
                  {categories.map(cat => (
                    <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`}
                      className="text-white/50 hover:text-[#C8860A] text-sm py-1.5 transition-colors" onClick={closeAll}>{cat}</Link>
                  ))}
                </div>
              </div>

              {!user && (
                <div className="pt-3 flex flex-col gap-2">
                  <button onClick={toggleLang}
                    className="w-full flex items-center justify-center gap-2 py-2.5 font-bold rounded-lg text-sm"
                    style={{ background: "#3D1F0A", color: "#FABE1A", border: "1px solid #5C3015" }}>
                    <Languages size={14} /> {t.langToggle}
                  </button>
                  <Link to="/login" className="w-full flex items-center justify-center py-2.5 font-bold rounded-lg text-sm" style={{ background: "#C8860A", color: "#1A0A02" }} onClick={closeAll}>{t.login}</Link>
                </div>
              )}

              {user && (
                <div className="pt-2">
                  <div className="flex items-center justify-between px-2 mb-2">
                    <p className="text-[#DDB87A] text-[10px] uppercase tracking-widest font-bold">My Account</p>
                    <button onClick={toggleLang}
                      className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold"
                      style={{ background: "#FABE1A", color: "#734129" }}>
                      <Languages size={11} /> {t.langToggle}
                    </button>
                  </div>
                  <Link to="/profile" className="flex items-center gap-2 py-2 px-2 text-sm text-white/50 hover:text-[#C8860A]" onClick={closeAll}><User size={14} /> {t.profile}</Link>
                  <Link to="/orders" className="flex items-center gap-2 py-2 px-2 text-sm text-white/50 hover:text-[#C8860A]" onClick={closeAll}><Package size={14} /> {t.myOrders}</Link>
                  <Link to="/wishlist" className="flex items-center gap-2 py-2 px-2 text-sm text-white/50 hover:text-[#C8860A]" onClick={closeAll}><Heart size={14} /> {t.wishlist}</Link>
                  {isAdmin && (
                    <Link to={isOnAdminPanel ? "/" : "/admin"} className="flex items-center gap-2 py-2 px-2 text-sm text-[#C8860A] font-semibold" onClick={closeAll}>
                      {isOnAdminPanel ? <><Store size={14} /> {t.switchToUser}</> : <><Settings size={14} /> {t.switchToAdmin}</>}
                    </Link>
                  )}
                  <button onClick={handleSignOut} className="flex items-center gap-2 py-2 px-2 text-sm text-red-400 w-full"><LogOut size={14} /> {t.logout}</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
