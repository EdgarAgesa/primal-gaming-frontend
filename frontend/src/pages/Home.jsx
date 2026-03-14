import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'
import './Home.css'

const banners = [
  {
    title: 'Latest Consoles',
    subtitle: 'PlayStation 5, Xbox Series X & More',
    bg: '#1a1a2e',
    accent: '#e94560',
    emoji: '🕹️'
  },
  {
    title: 'Top Gaming PCs',
    subtitle: 'Built for Performance & Speed',
    bg: '#0f3460',
    accent: '#ffcc00',
    emoji: '💻'
  },
  {
    title: 'New Games In Stock',
    subtitle: 'Latest Titles Available Now',
    bg: '#16213e',
    accent: '#00d4ff',
    emoji: '🎮'
  }
]

const CATEGORIES = ['All', 'Consoles', 'Games', 'PCs&laptop', 'Controllers']

function Home(props) {
  const { addToCart, selectedCategory, setSelectedCategory } = props
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentBanner, setCurrentBanner] = useState(0)
  const [activeCategory, setActiveCategory] = useState(selectedCategory || 'All')

  useEffect(() => {
    axios.get('https://primal-gaming-backend.onrender.com/api/products')
      .then(res => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

    useEffect(() => {
    setActiveCategory(selectedCategory)
    }, [selectedCategory])

    const filtered = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory)

  const banner = banners[currentBanner]

  return (
    <div className="home-container">

      {/* Hero Banner */}
      <div className="hero" style={{ backgroundColor: banner.bg }}>
        <div className="hero-content">
          <span className="hero-emoji">{banner.emoji}</span>
          <div>
            <h1 className="hero-title" style={{ color: banner.accent }}>
              {banner.title}
            </h1>
            <p className="hero-subtitle">{banner.subtitle}</p>
            <button className="hero-btn" style={{ backgroundColor: banner.accent }}>
              Shop Now
            </button>
          </div>
        </div>
        <div className="banner-dots">
          {banners.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrentBanner(i)}
              className="dot"
              style={{
                backgroundColor: i === currentBanner ? banner.accent : '#555'
              }}
            />
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-buttons">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="cat-btn"
              style={{
                backgroundColor: activeCategory === cat ? '#e94560' : '#16213e',
                border: activeCategory === cat ? '2px solid #e94560' : '2px solid #333',
              }}
            >
              {cat === 'All' && '🏪 '}
              {cat === 'Consoles' && '🕹️ '}
              {cat === 'Games' && '🎮 '}
              {cat === 'PCs&laptop' && '💻 '}
              {cat === 'Controllers' && '🎯 '}
              {cat === 'PCs&laptop' ? 'PCs & Laptops' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-section">
        <h2 className="section-title">
          {activeCategory === 'All' ? 'All Products' : activeCategory}
          <span className="product-count"> ({filtered.length} items)</span>
        </h2>

        {loading ? (
          <p className="message">Loading products...</p>
        ) : filtered.length === 0 ? (
          <p className="message">No products in this category yet.</p>
        ) : (
          <div className="grid">
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Home