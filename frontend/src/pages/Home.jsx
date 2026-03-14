import { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../components/ProductCard'

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
    <div style={styles.container}>

      {/* Hero Banner */}
      <div style={{ ...styles.hero, backgroundColor: banner.bg }}>
        <div style={styles.heroContent}>
          <span style={styles.heroEmoji}>{banner.emoji}</span>
          <div>
            <h1 style={{ ...styles.heroTitle, color: banner.accent }}>
              {banner.title}
            </h1>
            <p style={styles.heroSubtitle}>{banner.subtitle}</p>
            <button style={{ ...styles.heroBtn, backgroundColor: banner.accent }}>
              Shop Now
            </button>
          </div>
        </div>
        <div style={styles.bannerDots}>
          {banners.map((_, i) => (
            <span
              key={i}
              onClick={() => setCurrentBanner(i)}
              style={{
                ...styles.dot,
                backgroundColor: i === currentBanner ? banner.accent : '#555'
              }}
            />
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div style={styles.categorySection}>
        <h2 style={styles.sectionTitle}>Shop by Category</h2>
        <div style={styles.categoryButtons}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.catBtn,
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
      <div style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>
          {activeCategory === 'All' ? 'All Products' : activeCategory}
          <span style={styles.productCount}> ({filtered.length} items)</span>
        </h2>

        {loading ? (
          <p style={styles.message}>Loading products...</p>
        ) : filtered.length === 0 ? (
          <p style={styles.message}>No products in this category yet.</p>
        ) : (
          <div style={styles.grid}>
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

const styles = {
  container: {
    backgroundColor: '#0a0a0f',
    minHeight: '100vh',
  },
  hero: {
    padding: '3rem 2rem',
    position: 'relative',
    transition: 'background-color 0.5s',
    minHeight: '250px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heroContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  heroEmoji: {
    fontSize: '8rem',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '0',
  },
  heroSubtitle: {
    color: '#ccc',
    fontSize: '1.2rem',
    margin: '0.5rem 0 1.5rem 0',
  },
  heroBtn: {
    padding: '0.8rem 2rem',
    border: 'none',
    borderRadius: '8px',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  bannerDots: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1.5rem',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  categorySection: {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: '1.5rem',
    marginBottom: '1rem',
    borderLeft: '4px solid #e94560',
    paddingLeft: '1rem',
  },
  categoryButtons: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  catBtn: {
    padding: '0.8rem 1.5rem',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    transition: 'all 0.2s',
  },
  productsSection: {
    padding: '1rem 2rem 3rem 2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  productCount: {
    color: '#aaa',
    fontSize: '1rem',
    fontWeight: 'normal',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem',
  },
  message: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: '1.2rem',
    marginTop: '3rem',
  }
}

export default Home