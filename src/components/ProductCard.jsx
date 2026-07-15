import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, ArrowRight, CheckCircle, MapPin, Sparkles } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { formatINR } from '../utils/format'
import toast from 'react-hot-toast'

const isVideo = (url) => url && /\.(mp4|mov|webm|ogg)(\?|$)/i.test(url)

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1614703012479-0fe5f6a89be0?w=400&q=80'

function DiscountBadge({ original, current }) {
  if (!original || original <= current) return null
  const pct = Math.round(((original - current) / original) * 100)
  if (pct <= 0) return null
  return (
    <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
      -{pct}%
    </span>
  )
}

function TagBadges({ tags }) {
  if (!tags?.length) return null
  return (
    <div className="flex flex-wrap gap-1">
      {tags.includes('certified') && (
        <span className="flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-green-900/40 text-green-400 border border-green-700/50">
          <CheckCircle size={9} /> Certified
        </span>
      )}
      {tags.includes('nepal') && (
        <span className="flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#C8860A]/15 text-[#C8860A] border border-[#C8860A]/30">
          <MapPin size={9} /> Nepal
        </span>
      )}
      {tags.includes('rare') && (
        <span className="flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-purple-900/40 text-purple-400 border border-purple-700/50">
          <Sparkles size={9} /> Rare
        </span>
      )}
    </div>
  )
}

/* ─── GRID CARD ─────────────────────────────────────────── */
function GridCard({ product, inCart, wishlisted, onAddToCart, onWishlist }) {
  const media = product.images?.[0] || FALLBACK_IMG
  const mediaIsVideo = isVideo(media)
  const comparePrice = product.original_price || product.compare_price

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22 }}
      className="group relative bg-[#2A1408] rounded-2xl overflow-hidden border border-[#5C3015] hover:border-[#C8860A]/60 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(200,134,10,0.2)] flex flex-col"
    >
      <Link to={`/products/${product.id}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative overflow-hidden aspect-square bg-[#1A0A02] flex-shrink-0">
          {mediaIsVideo ? (
            <video src={media} muted loop playsInline autoPlay
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108" />
          ) : (
            <img src={media} alt={product.name} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={e => { e.target.src = FALLBACK_IMG }} />
          )}

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0501]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Out of stock overlay */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-[#F5E6C8] text-xs font-semibold bg-[#2A1408] px-3 py-1 rounded-full border border-[#5C3015] shadow-sm">Out of Stock</span>
            </div>
          )}

          {/* Top-left: certified badge */}
          {product.tags?.includes('certified') && (
            <span className="absolute top-2 left-2 flex items-center gap-1 bg-green-700 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold shadow-sm">
              <CheckCircle size={9} /> Certified
            </span>
          )}
          {!product.tags?.includes('certified') && product.tags?.includes('new') && (
            <span className="absolute top-2 left-2 bg-[#C8860A] text-[#1A0A02] text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">New</span>
          )}

          {/* Discount badge */}
          {comparePrice && comparePrice > product.price && (
            <span className="absolute top-2 right-8 bg-green-700 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
              -{Math.round(((comparePrice - product.price) / comparePrice) * 100)}%
            </span>
          )}

          {/* Wishlist button */}
          <button onClick={onWishlist}
            className={`absolute top-2 right-2 p-1.5 rounded-full transition-all shadow-md backdrop-blur-sm ${wishlisted ? 'bg-red-500 text-white scale-110' : 'bg-[#1A0A02]/80 text-[#DDB87A] hover:text-red-400 hover:bg-[#2A1408]'}`}>
            <Heart size={13} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col flex-1">
          <p className="text-[10px] text-[#C8860A] mb-1 uppercase tracking-widest font-semibold">{product.category}</p>
          <h3 className="text-[#F5E6C8] text-sm font-semibold line-clamp-2 mb-2 group-hover:text-[#C8860A] transition-colors leading-snug flex-1">
            {product.name}
          </h3>

          {/* Tag badges */}
          <div className="mb-2">
            <TagBadges tags={product.tags?.filter(t => t !== 'certified')} />
          </div>

          {/* Price row */}
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-[#E5A020] font-bold text-base">{formatINR(product.price)}</span>
            {comparePrice && comparePrice > product.price && (
              <span className="text-[#8B6040] text-xs line-through">{formatINR(comparePrice)}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart */}
      <div className="px-3 pb-3">
        <button onClick={onAddToCart} disabled={product.stock === 0}
          className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
            inCart
              ? 'bg-green-700 hover:bg-green-600 text-white shadow-md'
              : 'bg-[#C8860A] hover:bg-[#E5A020] text-[#1A0A02] shadow-md hover:shadow-[0_4px_16px_rgba(200,134,10,0.4)]'
          }`}>
          {inCart ? <><ArrowRight size={13} /> Go to Cart</> : <><ShoppingCart size={13} /> Add to Cart</>}
        </button>
      </div>
    </motion.div>
  )
}

/* ─── LIST CARD ─────────────────────────────────────────── */
function ListCard({ product, inCart, wishlisted, onAddToCart, onWishlist }) {
  const media = product.images?.[0] || FALLBACK_IMG
  const mediaIsVideo = isVideo(media)
  const comparePrice = product.original_price || product.compare_price
  const inStock = product.stock > 0

  return (
    <motion.div
      whileHover={{ x: 2 }}
      transition={{ duration: 0.18 }}
      className="group relative bg-[#2A1408] rounded-xl border border-[#5C3015] hover:border-[#C8860A]/40 transition-all duration-200 hover:shadow-[0_4px_20px_rgba(200,134,10,0.15)] overflow-hidden"
      style={{ borderLeft: '3px solid transparent' }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C8860A] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-l-xl" />

      <Link to={`/products/${product.id}`}>
        <div className="flex items-stretch gap-3 p-3">
          {/* Image */}
          <div className="relative flex-shrink-0 w-[110px] h-[110px] rounded-xl overflow-hidden bg-[#1A0A02]">
            {mediaIsVideo ? (
              <video src={media} muted loop playsInline autoPlay className="w-full h-full object-cover" />
            ) : (
              <img src={media} alt={product.name} loading="lazy"
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                onError={e => { e.target.src = FALLBACK_IMG }} />
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-[8px] font-bold text-[#F5E6C8] bg-[#2A1408] px-1.5 py-0.5 rounded-full border border-[#5C3015]">OOS</span>
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            <div className="flex items-center gap-2 mb-0.5">
              {product.custom_id && (
                <span className="font-mono text-[10px] text-[#B8895A] bg-[#1A0A02] px-1.5 py-0.5 rounded border border-[#5C3015]">
                  {product.custom_id}
                </span>
              )}
              <span className="text-[10px] text-[#C8860A] font-semibold uppercase tracking-wider px-2 py-0.5 bg-[#C8860A]/10 rounded-full border border-[#C8860A]/20">
                {product.category}
              </span>
            </div>

            <h3 className="text-[#F5E6C8] text-sm font-bold line-clamp-2 group-hover:text-[#C8860A] transition-colors leading-tight mb-1">
              {product.name}
            </h3>

            {product.size && (
              <p className="text-[#B8895A] text-[11px] mb-1">Size: <span className="font-medium text-[#DDB87A]">{product.size} mm</span></p>
            )}

            <TagBadges tags={product.tags} />

            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-[#E5A020] font-bold text-base leading-none">{formatINR(product.price)}</span>
              {comparePrice && comparePrice > product.price && (
                <span className="text-[#8B6040] text-xs line-through">{formatINR(comparePrice)}</span>
              )}
              <DiscountBadge original={comparePrice} current={product.price} />
              <span className={`flex items-center gap-1 text-[10px] font-semibold ml-auto ${inStock ? 'text-green-400' : 'text-red-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-green-400' : 'bg-red-400'}`} />
                {inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          {/* Right side: wishlist + cart */}
          <div className="flex-shrink-0 flex flex-col items-center justify-between py-0.5 gap-2 pl-1">
            <button onClick={onWishlist}
              className={`p-1.5 rounded-full transition-all ${wishlisted ? 'bg-red-900/40 text-red-400' : 'text-[#B8895A] hover:text-red-400 hover:bg-red-900/20'}`}>
              <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
            <button onClick={onAddToCart} disabled={product.stock === 0}
              className={`flex items-center gap-1 px-3 py-2 rounded-full text-[11px] font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap ${
                inCart
                  ? 'bg-green-700 hover:bg-green-600 text-white shadow-sm'
                  : 'bg-[#C8860A] hover:bg-[#E5A020] text-[#1A0A02] shadow-sm hover:shadow-[0_2px_12px_rgba(200,134,10,0.4)]'
              }`}>
              {inCart ? <><ArrowRight size={11} /> Cart</> : <><ShoppingCart size={11} /> Add</>}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* ─── MAIN EXPORT ───────────────────────────────────────── */
export default function ProductCard({ product, layout = 'grid' }) {
  const { user } = useAuthStore()
  const { addToCart, items } = useCartStore()
  const { toggleWishlist, isWishlisted } = useWishlistStore()
  const navigate = useNavigate()

  const wishlisted = isWishlisted(product.id)
  const inCart = items.some(i => i.product_id === product.id)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    if (inCart) { navigate('/cart'); return }
    if (!user) { toast.error('Please login to add to cart'); return }
    try { await addToCart(product, user?.id); toast.success('Added to cart!') }
    catch (err) { toast.error(err.message || 'Failed to add to cart') }
  }

  const handleWishlist = async (e) => {
    e.preventDefault()
    if (!user) { toast.error('Please login to save to wishlist'); return }
    try {
      const added = await toggleWishlist(product, user?.id)
      toast.success(added ? 'Added to wishlist!' : 'Removed from wishlist')
    } catch (err) { toast.error(err.message || 'Failed to update wishlist') }
  }

  const shared = { product, inCart, wishlisted, onAddToCart: handleAddToCart, onWishlist: handleWishlist }

  return layout === 'list'
    ? <ListCard {...shared} />
    : <GridCard {...shared} />
}
