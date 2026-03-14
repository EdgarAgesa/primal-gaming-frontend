import { Link, useNavigate } from 'react-router-dom'

function Navbar({ cartCount, onCategorySelect }) {
  const navigate = useNavigate()

  const handleCategory = (cat) => {
    onCategorySelect(cat)
    navigate('/')
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.topBar}>
        <Link to="/" style={styles.brand} onClick={() => onCategorySelect('All')}>
          <span style={styles.logo}>🎮</span>
          <div>
            <span style={styles.brandName}>PRIMAL</span>
            <span style={styles.brandSub}> GAMING HUB</span>
            <div style={styles.brandTagline}>Your Ultimate Gaming Destination</div>
          </div>
        </Link>

        <div style={styles.searchBar}>
          <input
            style={styles.searchInput}
            placeholder="Search for games, consoles, controllers..."
          />
          <button style={styles.searchBtn}>🔍</button>
        </div>

        <div style={styles.cartWrapper}>
          <Link to="/cart" style={styles.cartBtn}>
            🛒
            <div>
              <div style={styles.cartText}>My Cart</div>
              {cartCount > 0 && (
                <div style={styles.cartCount}>{cartCount} item(s)</div>
              )}
            </div>
            {cartCount > 0 && (
              <span style={styles.badge}>{cartCount}</span>
            )}
          </Link>
        </div>
      </div>

      <div style={styles.categoryBar}>
        <span style={styles.categoryLabel}>☰ Categories</span>
        {[
          { label: '🏪 All Products', value: 'All' },
          { label: '🕹️ Consoles', value: 'Consoles' },
          { label: '🎮 Games', value: 'Games' },
          { label: '💻 PCs & Laptops', value: 'PCs&laptop' },
          { label: '🎯 Controllers', value: 'Controllers' },
        ].map(cat => (
          <button
            key={cat.value}
            onClick={() => handleCategory(cat.value)}
            style={styles.categoryLink}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    backgroundColor: '#1a1a2e',
    borderBottom: '3px solid #e94560',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    gap: '1rem',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    textDecoration: 'none',
    minWidth: 'fit-content',
  },
  logo: {
    fontSize: '2.5rem',
  },
  brandName: {
    color: '#e94560',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  brandSub: {
    color: '#fff',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    letterSpacing: '2px',
  },
  brandTagline: {
    color: '#aaa',
    fontSize: '0.7rem',
    letterSpacing: '1px',
  },
  searchBar: {
    display: 'flex',
    flex: 1,
    maxWidth: '500px',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid #e94560',
  },
  searchInput: {
    flex: 1,
    padding: '0.7rem 1rem',
    backgroundColor: '#0a0a0f',
    border: 'none',
    color: '#fff',
    fontSize: '0.9rem',
    outline: 'none',
  },
  searchBtn: {
    padding: '0.7rem 1rem',
    backgroundColor: '#e94560',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  cartWrapper: {
    minWidth: 'fit-content',
  },
  cartBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#e94560',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    fontSize: '1.3rem',
    position: 'relative',
  },
  cartText: {
    fontSize: '0.8rem',
    color: '#fff',
  },
  cartCount: {
    fontSize: '0.7rem',
    color: '#ffcc00',
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#ffcc00',
    color: '#000',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    fontWeight: 'bold',
  },
  categoryBar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: '0 2rem',
    overflowX: 'auto',
  },
  categoryLabel: {
    color: '#fff',
    backgroundColor: '#e94560',
    padding: '0.8rem 1.2rem',
    fontWeight: 'bold',
    marginRight: '1rem',
    whiteSpace: 'nowrap',
  },
  categoryLink: {
    color: '#fff',
    background: 'none',
    border: 'none',
    padding: '0.8rem 1.2rem',
    whiteSpace: 'nowrap',
    fontSize: '0.9rem',
    cursor: 'pointer',
    borderRight: '1px solid #0a0a0f',
  },
}

export default Navbar