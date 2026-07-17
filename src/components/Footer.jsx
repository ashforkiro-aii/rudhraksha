import { Link } from 'react-router-dom'
import { CATEGORIES } from '../data/products'
import { Mail, Phone, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0F0501] border-t border-[#5C3015] text-white mt-16">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-[#C8860A] text-xl font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>?? Rudhraksha Divine</h3>
            <p className="text-white/50 text-sm leading-relaxed mb-4">Authentic certified Rudraksha beads sourced directly from Nepal & Java. Divine energy, genuine quality.</p>
            <div className="space-y-2 text-sm text-white/50">
              <div className="flex items-center gap-2"><Mail size={13} className="text-[#C8860A]" /> rudhraksha@gmail.com</div>
              <div className="flex items-center gap-2"><Phone size={13} className="text-[#C8860A]" /> +91 863 900 6849</div>
              <div className="flex items-center gap-2"><Clock size={13} className="text-[#C8860A]" /> Mon–Sat, 10am–7pm</div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[#E5A020] text-sm font-semibold mb-3 uppercase tracking-wider">Collections</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map(cat => (
                <li key={cat}>
                  <Link to={`/products?category=${encodeURIComponent(cat)}`} className="text-white/50 hover:text-[#C8860A] text-sm transition-colors">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#E5A020] text-sm font-semibold mb-3 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-white/50 hover:text-[#C8860A] text-sm transition-colors">Shop</Link></li>
              <li><Link to="/orders" className="text-white/50 hover:text-[#C8860A] text-sm transition-colors">My Orders</Link></li>
              <li><Link to="/profile" className="text-white/50 hover:text-[#C8860A] text-sm transition-colors">My Account</Link></li>
              <li><Link to="/wishlist" className="text-white/50 hover:text-[#C8860A] text-sm transition-colors">Wishlist</Link></li>
              <li><Link to="/cart" className="text-white/50 hover:text-[#C8860A] text-sm transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[#E5A020] text-sm font-semibold mb-3 uppercase tracking-wider">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-white/50 hover:text-[#C8860A] text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/shipping-policy" className="text-white/50 hover:text-[#C8860A] text-sm transition-colors">Shipping Policy</Link></li>
              <li><Link to="/refund-policy" className="text-white/50 hover:text-[#C8860A] text-sm transition-colors">Refund Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-white/50 hover:text-[#C8860A] text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#5C3015] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/60 text-xs">
          <span>© 2026 Rudhraksha Divine. All rights reserved. | Crafted with ?? in India</span>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-[#C8860A] transition-colors">Privacy</Link>
            <Link to="/shipping-policy" className="hover:text-[#C8860A] transition-colors">Shipping</Link>
            <Link to="/refund-policy" className="hover:text-[#C8860A] transition-colors">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
