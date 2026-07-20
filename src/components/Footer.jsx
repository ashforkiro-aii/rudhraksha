import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/products'
import { Mail, Phone, Clock } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer style={{ background: "#3D1F0A", borderTop: "2px solid #C5B5A5" }} className="mt-16">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'Cinzel, serif', color: "#FABE1A" }}>
              ॐ Rudhraksha Divine
            </h3>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#D4C4B4" }}>
              {t.footerTagline}
            </p>
            <div className="space-y-2 text-sm" style={{ color: "#D4C4B4" }}>
              <div className="flex items-center gap-2"><Mail size={13} style={{ color: "#FABE1A" }} /> rudhraksha@gmail.com</div>
              <div className="flex items-center gap-2"><Phone size={13} style={{ color: "#FABE1A" }} /> +91 863 900 6849</div>
              <div className="flex items-center gap-2"><Clock size={13} style={{ color: "#FABE1A" }} /> Mon–Sat, 10am–7pm</div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "#FABE1A" }}>{t.footerCollections}</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map(cat => (
                <li key={cat}>
                  <Link to={`/products?category=${encodeURIComponent(cat)}`}
                    className="text-sm transition-colors"
                    style={{ color: "#D4C4B4" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#FABE1A"}
                    onMouseLeave={e => e.currentTarget.style.color = "#D4C4B4"}>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "#FABE1A" }}>{t.footerQuickLinks}</h4>
            <ul className="space-y-2">
              {[
                { to: "/products", label: t.footerShop },
                { to: "/orders", label: t.myOrders },
                { to: "/profile", label: t.footerAccount },
                { to: "/wishlist", label: t.wishlist },
                { to: "/cart", label: t.footerCart },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm transition-colors" style={{ color: "#D4C4B4" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#FABE1A"}
                    onMouseLeave={e => e.currentTarget.style.color = "#D4C4B4"}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: "#FABE1A" }}>{t.footerHelp}</h4>
            <ul className="space-y-2">
              {[
                { to: "/contact", label: t.footerContact },
                { to: "/shipping-policy", label: t.footerShipping },
                { to: "/refund-policy", label: t.footerRefund },
                { to: "/privacy-policy", label: t.footerPrivacy },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm transition-colors" style={{ color: "#D4C4B4" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#FABE1A"}
                    onMouseLeave={e => e.currentTarget.style.color = "#D4C4B4"}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ borderTop: "1px solid #5C3015", color: "#A67560" }}>
          <span>{t.footerCopy}</span>
          <div className="flex gap-4">
            {[
              { to: "/privacy-policy", label: "Privacy" },
              { to: "/shipping-policy", label: "Shipping" },
              { to: "/refund-policy", label: "Refunds" },
            ].map(item => (
              <Link key={item.to} to={item.to} className="transition-colors" style={{ color: "#A67560" }}
                onMouseEnter={e => e.currentTarget.style.color = "#FABE1A"}
                onMouseLeave={e => e.currentTarget.style.color = "#A67560"}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
