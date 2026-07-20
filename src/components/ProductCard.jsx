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

function TagBadges({ tags }) {
  if (!tags?.length) return null
  return (
    <div className="flex flex-wrap gap-1">
      {tags.includes('certified') && (
        <span className="flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
          style={{ background: "rgba(115,65,41,0.08)", color: "#734129", border: "1px solid #D4C4B4" }}>
          <CheckCircle size={9} /> Certified
        </span>
      )}
      {tags.includes('nepal') && (
        <span className="flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
          style={{ background: "rgba(250,190,26,0.12)", color: "#734129", border: "1px solid #D4C4B4" }}>
          <MapPin size={9} /> Nepal
        </span>
      )}
      {tags.includes('rare') && (
        <span className="flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
          style={{ background: "rgba(115,65,41,0.1)", color: "#734129", border: "1px solid #D4C4B4" }}>
          <Sparkles size={9} /> Rare
        </span>
      )}
    </div>
  )
}

/* --- GRID CARD --- */
function GridCard({ product, inCart, wishlisted, onAddToCart, onWishlist }) {
  const media = product.images?.[0] || FALLBACK_IMG
  const mediaIsVideo = isVideo(media)
  const comparePrice = product.original_price || product.compare_price

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.22 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col stone-panel"
      style={{ transition: "box-shadow 0.3s" }}
    >
      <Link to={`/products/${product.id}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative overflow-hidden aspect-square flex-shrink-0"
          style={{ background: "#EAE0D3" }}>
          {mediaIsVideo ? (
            <video src={media} muted loop playsInline autoPlay
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <img src={media} alt={product.name} loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={e => { e.target.src = FALLBACK_IMG }} />
          )}

          {/* Warm overlay on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(to top, rgba(115,65,41,0.25), transparent)" }} />

          {product.stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center"
              style={{ background: "rgba(234,224,211,0.7)" }}>
              <span className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: "#F2EAE0", color: "#734129", border: "1px solid #D4C4B4" }}>
                Out of Stock
              </span>
            </div>
          )}

          {product.tags?.includes('certified') && (
            <span className="absolute top-2 left-2 flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background: "#FABE1A", color: "#734129" }}>
              <CheckCircle size={9} /> Certified
            </span>
          )}
          {!product.tags?.includes('certified') && product.tags?.includes('new') && (
            <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full font-bold"
              style={{ background: "#FABE1A", color: "#734129" }}>New</span>
          )}

          {comparePrice && comparePrice > product.price && (
            <span className="absolute top-2 right-8 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: "#734129", color: "#FABE1A" }}>
              -{Math.round(((comparePrice - product.price) / comparePrice) * 100)}%
            </span>
          )}

          <button onClick={onWishlist}
            className={`absolute top-2 right-2 p-1.5 rounded-full transition-all shadow-md`}
            style={wishlisted
              ? { background: "#734129", color: "#FABE1A" }
              : { background: "rgba(242,234,224,0.85)", color: "#A67560" }}>
            <Heart size={13} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col flex-1">
          <p className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: "#A67560" }}>
            {product.category}
          </p>
          <h3 className="text-sm font-semibold line-clamp-2 mb-2 leading-snug flex-1 transition-colors heading-temple"
            style={{ fontFamily: "Cinzel, serif" }}>
            {product.name}
          </h3>
          <div className="mb-2">
            <TagBadges tags={product.tags?.filter(t => t !== 'certified')} />
          </div>
          <div className="flex items-center gap-2 mt-auto">
            <span className="font-bold text-base" style={{ color: "#734129" }}>{formatINR(product.price)}</span>
            {comparePrice && comparePrice > product.price && (
              <span className="text-xs line-through" style={{ color: "#A67560" }}>{formatINR(comparePrice)}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to cart */}
      <div className="px-3 pb-3">
        <button onClick={onAddToCart} disabled={product.stock === 0}
          className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${inCart ? '' : 'btn-saffron'}`}
          style={inCart ? { background: "#734129", color: "#F2EAE0" } : {}}>
          {inCart ? <><ArrowRight size={13} /> Go to Cart</> : <><ShoppingCart size={13} /> Add to Cart</>}
        </button>
      </div>
    </motion.div>
  )
}

/* --- LIST CARD --- */
function ListCard({ product, inCart, wishlisted, onAddToCart, onWishlist }) {
  const media = product.images?.[0] || FALLBACK_IMG
  const mediaIsVideo = isVideo(media)
  const comparePrice = product.original_price || product.compare_price
  const inStock = product.stock > 0

  return (
    <motion.div
      whileHover={{ x: 2 }}
      transition={{ duration: 0.18 }}
      className="group relative rounded-xl overflow-hidden stone-panel transition-all duration-200"
    >
      <Link to={`/products/${product.id}`}>
        <div className="flex items-stretch gap-3 p-3">
          <div className="relative flex-shrink-0 w-[110px] h-[110px] rounded-xl overflow-hidden"
            style={{ background: "#EAE0D3", border: "1px solid #D4C4B4" }}>
            {mediaIsVideo ? (
              <video src={media} muted loop playsInline autoPlay className="w-full h-full object-cover" />
            ) : (
              <img src={media} alt={product.name} loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={e => { e.target.src = FALLBACK_IMG }} />
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background: "rgba(234,224,211,0.7)" }}>
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: "#F2EAE0", color: "#734129", border: "1px solid #D4C4B4" }}>OOS</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            <div className="flex items-center gap-2 mb-0.5">
              {product.custom_id && (
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                  style={{ background: "#EAE0D3", color: "#A67560", border: "1px solid #D4C4B4" }}>
                  {product.custom_id}
                </span>
              )}
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ background: "rgba(115,65,41,0.08)", color: "#734129", border: "1px solid #D4C4B4" }}>
                {product.category}
              </span>
            </div>
            <h3 className="text-sm font-bold line-clamp-2 leading-tight mb-1 heading-temple"
              style={{ fontFamily: "Cinzel, serif" }}>{product.name}</h3>
            {product.size && (
              <p className="text-[11px] mb-1" style={{ color: "#A67560" }}>
                Size: <span className="font-medium" style={{ color: "#734129" }}>{product.size} mm</span>
              </p>
            )}
            <TagBadges tags={product.tags} />
            <div className="flex items-center gap-3 mt-1.5">
              <span className="font-bold text-base leading-none" style={{ color: "#734129" }}>{formatINR(product.price)}</span>
              {comparePrice && comparePrice > product.price && (
                <span className="text-xs line-through" style={{ color: "#A67560" }}>{formatINR(comparePrice)}</span>
              )}
              <span className={`flex items-center gap-1 text-[10px] font-semibold ml-auto`}
                style={{ color: inStock ? "#5c7a3e" : "#b54040" }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ background: inStock ? "#5c7a3e" : "#b54040" }} />
                {inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col items-center justify-between py-0.5 gap-2 pl-1">
            <button onClick={onWishlist}
              className="p-1.5 rounded-full transition-all"
              style={wishlisted ? { background: "#734129", color: "#FABE1A" } : { color: "#A67560" }}>
              <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
            <button onClick={onAddToCart} disabled={product.stock === 0}
              className={`flex items-center gap-1 px-3 py-2 rounded-full text-[11px] font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap ${inCart ? '' : 'btn-saffron'}`}
              style={inCart ? { background: "#734129", color: "#F2EAE0" } : {}}>
              {inCart ? <><ArrowRight size={11} /> Cart</> : <><ShoppingCart size={11} /> Add</>}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

/* --- MAIN EXPORT --- */
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
  return layout === 'list' ? <ListCard {...shared} /> : <GridCard {...shared} />
}
