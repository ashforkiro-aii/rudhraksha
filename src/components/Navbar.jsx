import { useState, useRef, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Heart, Search, Menu, X, User, LogOut, ChevronDown, Package, Settings, Store } from "lucide-react"
import { useAuthStore } from "../store/authStore"
import { useCartStore } from "../store/cartStore"
import { useCategoryStore } from "../store/categoryStore"
import { useAdminStore } from "../store/adminStore"
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
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const userRef = useRef(null)
  const searchRef = useRef(null)
  const isAdmin = checkIsAdmin(user)
  const isOnAdminPanel = pathname.startsWith("/admin")

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

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1A0A02] shadow-[0_2px_20px_rgba(0,0,0,0.7)]">

      {/* -- TOP ROW -- */}
      <div className="border-b border-[#3D1F0A] w-full">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 h-[60px] flex items-center gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0" onClick={closeAll}>
            <img src={logoImg} alt="Rudhraksha Divine" className="h-9 w-9 rounded-full object-cover border-2 border-[#C8860A] flex-shrink-0" />
            <div className="hidden sm:block leading-none">
              <div className="text-[#C8860A] font-bold tracking-wide text-[1rem]" style={{ fontFamily: "Georgia, serif" }}>RUDRAKSHA</div>
              <div className="text-[#DDB87A] text-[9px] tracking-[0.3em] uppercase mt-0.5">DIVINE</div>
            </div>
          </Link>

          {/* Desktop Search — grows to fill space */}
          <div ref={searchRef} className="hidden lg:block relative flex-1 max-w-xs mx-6">
            <form onSubmit={handleSearch} className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
              <input
                type="text" value={searchQuery} onChange={handleSearchChange}
                placeholder="Search rudraksha..."
                className="w-full bg-[#2A1408] border border-[#5C3015] rounded-full pl-9 pr-9 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C8860A] transition-colors"
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
                  className="absolute top-full left-0 right-0 mt-2 bg-[#2A1408] border border-[#5C3015] rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.7)] z-50 overflow-hidden">
                  {suggestions.map(p => (
                    <button key={p.id} onClick={() => handleSuggestionClick(p)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#3D1F0A] transition-colors text-left">
                      {p.images?.[0] && <img src={p.images[0]} alt="" className="w-8 h-8 object-cover rounded-lg flex-shrink-0" onError={e => { e.target.style.display = "none" }} />}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate">{p.name}</p>
                        <p className="text-white/60 text-xs">{p.category}{p.custom_id ? ` · ${p.custom_id}` : ""}</p>
                      </div>
                      <span className="text-[#C8860A] text-xs font-bold flex-shrink-0">
                        {p.price?.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}
                      </span>
                    </button>
                  ))}
                  <button onClick={() => handleSearch()}
                    className="w-full px-3 py-2 text-xs text-[#C8860A] hover:bg-[#3D1F0A] border-t border-[#5C3015] text-center font-semibold">
                    See all results for "{searchQuery}"
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right icons — all vertically centered via flex items-center on parent */}
          <div className="flex items-center gap-0.5 sm:gap-1 flex-shrink-0 ml-auto">
            {isAdmin && (
              <Link to={isOnAdminPanel ? "/" : "/admin"}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#C8860A] text-[#1A0A02] text-[11px] font-bold rounded-md hover:bg-[#E5A020] transition-all mr-1">
                {isOnAdminPanel ? <><Store size={12} /> User</> : <><Settings size={12} /> Admin</>}
              </Link>
            )}

            {/* Mobile search toggle */}
            <button className="lg:hidden w-9 h-9 flex items-center justify-center text-[#DDB87A] hover:text-[#C8860A] transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
              <Search size={19} />
            </button>

            <Link to={user ? "/wishlist" : "/login"} className="w-9 h-9 flex items-center justify-center text-[#DDB87A] hover:text-[#C8860A] transition-colors">
              <Heart size={19} />
            </Link>

            <Link to="/cart" className="w-9 h-9 flex items-center justify-center text-[#DDB87A] hover:text-[#C8860A] transition-colors relative">
              <ShoppingCart size={19} />
              {cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#C8860A] text-[#1A0A02] text-[9px] rounded-full min-w-[16px] h-4 flex items-center justify-center font-bold px-0.5 leading-none">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={userRef}>
                <button onClick={() => setUserOpen(o => !o)} className="w-9 h-9 flex items-center justify-center text-[#DDB87A] hover:text-[#C8860A] transition-colors">
                  {user.user_metadata?.avatar_url
                    ? <img src={user.user_metadata.avatar_url} alt="avatar" className="w-7 h-7 rounded-full object-cover border-2 border-[#C8860A]" />
                    : <div className="w-7 h-7 rounded-full bg-[#C8860A] flex items-center justify-center flex-shrink-0"><User size={13} className="text-[#1A0A02]" /></div>
                  }
                </button>
                <AnimatePresence>
                  {userOpen && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-[#2A1408] border border-[#5C3015] rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.7)] py-2 z-50">
                      <div className="px-4 py-2.5 border-b border-[#5C3015] mb-1">
                        <p className="text-white text-xs font-bold truncate">{user.user_metadata?.full_name || user.user_metadata?.name || "User"}</p>
                        <p className="text-white/60 text-[11px] truncate mt-0.5">{user.email}</p>
                      </div>
                      {[
                        { to: "/profile", icon: <User size={13} />, label: "Profile" },
                        { to: "/orders", icon: <Package size={13} />, label: "My Orders" },
                        { to: "/wishlist", icon: <Heart size={13} />, label: "Wishlist" },
                      ].map(item => (
                        <Link key={item.to} to={item.to} onClick={() => setUserOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#DDB87A] hover:text-[#C8860A] hover:bg-[#3D1F0A] transition-colors">
                          {item.icon} {item.label}
                        </Link>
                      ))}
                      {isAdmin && (
                        <Link to={isOnAdminPanel ? "/" : "/admin"} onClick={() => setUserOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#C8860A] hover:bg-[#3D1F0A] font-semibold transition-colors">
                          {isOnAdminPanel ? <><Store size={13} /> Switch to User</> : <><Settings size={13} /> Switch to Admin</>}
                        </Link>
                      )}
                      <div className="border-t border-[#5C3015] mt-1 pt-1">
                        <button onClick={handleSignOut} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#DDB87A] hover:text-red-400 hover:bg-red-900/20 w-full transition-colors">
                          <LogOut size={13} /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:inline-flex items-center h-8 px-4 bg-[#C8860A] text-[#1A0A02] rounded-md hover:bg-[#E5A020] transition-all font-bold text-[12px] ml-1">
                Login
              </Link>
            )}

            {/* Hamburger */}
            <button className="lg:hidden w-9 h-9 flex items-center justify-center text-[#DDB87A] hover:text-[#C8860A] transition-colors" onClick={() => setMenuOpen(m => !m)}>
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </div>

      {/* -- BOTTOM ROW: Nav links centered (desktop) -- */}
      {!isOnAdminPanel && (
        <div className="hidden lg:block border-b border-[#3D1F0A] w-full">
          <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 flex items-center justify-center h-10">
            {[
              { to: "/", label: "HOME" },
              { to: "/products", label: "ALL RUDRAKSHA" },
            ].map(item => (
              <Link key={item.to} to={item.to} onClick={closeAll}
                className="px-6 h-10 flex items-center text-[11px] font-bold tracking-[0.12em] text-white/50 hover:text-[#C8860A] transition-colors border-b-2 border-transparent hover:border-[#C8860A] whitespace-nowrap">
                {item.label}
              </Link>
            ))}
            <div className="relative h-10 flex items-center" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className="px-6 h-10 flex items-center gap-1 text-[11px] font-bold tracking-[0.12em] text-white/50 hover:text-[#C8860A] transition-colors border-b-2 border-transparent hover:border-[#C8860A] whitespace-nowrap">
                COLLECTIONS <ChevronDown size={11} />
              </button>
              <AnimatePresence>
                {catOpen && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-52 bg-[#2A1408] border border-[#5C3015] rounded-b-xl shadow-[0_12px_40px_rgba(0,0,0,0.65)] py-1.5 z-50">
                    {categories.map(cat => (
                      <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`}
                        className="block px-4 py-2.5 text-[13px] text-[#DDB87A] hover:text-[#C8860A] hover:bg-[#3D1F0A] transition-colors"
                        onClick={() => setCatOpen(false)}>{cat}</Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/contact" onClick={closeAll}
              className="px-6 h-10 flex items-center text-[11px] font-bold tracking-[0.12em] text-white/50 hover:text-[#C8860A] transition-colors border-b-2 border-transparent hover:border-[#C8860A] whitespace-nowrap">
              CONTACT US
            </Link>
          </div>
        </div>
      )}

      {/* -- MOBILE MENU -- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-[#3D1F0A] bg-[#1A0A02]">
            <div className="px-4 py-4 flex flex-col gap-1">
              {/* Mobile Search */}
              <div ref={searchRef} className="relative mb-3">
                <form onSubmit={handleSearch} className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 pointer-events-none" />
                  <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search rudraksha..." autoFocus
                    className="w-full bg-[#2A1408] border border-[#5C3015] rounded-full pl-9 pr-9 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#C8860A]" />
                  {searchQuery && (
                    <button type="button" onClick={() => { setSearchQuery(""); setSuggestions([]) }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"><X size={12} /></button>
                  )}
                </form>
                <AnimatePresence>
                  {suggestions.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                      className="absolute top-full left-0 right-0 mt-1 bg-[#2A1408] border border-[#5C3015] rounded-xl shadow-xl z-50 overflow-hidden">
                      {suggestions.map(p => (
                        <button key={p.id} onClick={() => { handleSuggestionClick(p); setMenuOpen(false) }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#3D1F0A] text-left">
                          {p.images?.[0] && <img src={p.images[0]} alt="" className="w-8 h-8 object-cover rounded-lg flex-shrink-0" onError={e => { e.target.style.display = "none" }} />}
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm truncate">{p.name}</p>
                            <p className="text-white/60 text-xs">{p.category}</p>
                          </div>
                          <span className="text-[#C8860A] text-xs font-bold">?{p.price?.toLocaleString("en-IN")}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/" className="py-2.5 px-2 text-sm font-semibold text-[#DDB87A] hover:text-[#C8860A] border-b border-[#3D1F0A] transition-colors" onClick={closeAll}>Home</Link>
              <Link to="/products" className="py-2.5 px-2 text-sm font-semibold text-[#DDB87A] hover:text-[#C8860A] border-b border-[#3D1F0A] transition-colors" onClick={closeAll}>All Rudraksha</Link>

              <div className="py-2 px-2 border-b border-[#3D1F0A]">
                <p className="text-white/60 text-[10px] uppercase tracking-widest mb-2 font-bold">Collections</p>
                <div className="grid grid-cols-2 gap-1">
                  {categories.map(cat => (
                    <Link key={cat} to={`/products?category=${encodeURIComponent(cat)}`}
                      className="text-[#DDB87A] hover:text-[#C8860A] text-sm py-1.5 transition-colors" onClick={closeAll}>{cat}</Link>
                  ))}
                </div>
              </div>

              <Link to="/contact" className="py-2.5 px-2 text-sm font-semibold text-[#DDB87A] hover:text-[#C8860A] border-b border-[#3D1F0A] transition-colors" onClick={closeAll}>Contact Us</Link>

              {!user && (
                <div className="pt-3">
                  <Link to="/login" className="w-full flex items-center justify-center py-2.5 bg-[#C8860A] text-[#1A0A02] font-bold rounded-lg text-sm" onClick={closeAll}>Login</Link>
                </div>
              )}

              {user && (
                <div className="pt-2">
                  <p className="text-white/60 text-[10px] uppercase tracking-widest px-2 mb-2 font-bold">My Account</p>
                  <Link to="/profile" className="flex items-center gap-2 py-2 px-2 text-sm text-[#DDB87A] hover:text-[#C8860A]" onClick={closeAll}><User size={14} /> Profile</Link>
                  <Link to="/orders" className="flex items-center gap-2 py-2 px-2 text-sm text-[#DDB87A] hover:text-[#C8860A]" onClick={closeAll}><Package size={14} /> My Orders</Link>
                  <Link to="/wishlist" className="flex items-center gap-2 py-2 px-2 text-sm text-[#DDB87A] hover:text-[#C8860A]" onClick={closeAll}><Heart size={14} /> Wishlist</Link>
                  {isAdmin && (
                    <Link to={isOnAdminPanel ? "/" : "/admin"} className="flex items-center gap-2 py-2 px-2 text-sm text-[#C8860A] font-semibold" onClick={closeAll}>
                      {isOnAdminPanel ? <><Store size={14} /> Switch to User</> : <><Settings size={14} /> Switch to Admin</>}
                    </Link>
                  )}
                  <button onClick={handleSignOut} className="flex items-center gap-2 py-2 px-2 text-sm text-red-400 w-full"><LogOut size={14} /> Logout</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
