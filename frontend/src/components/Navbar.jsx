import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar({ cartCount, onCategorySelect }) {
  const navigate = useNavigate()

  const handleCategory = (cat) => {
    onCategorySelect(cat)
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="top-bar">
        <Link to="/" className="brand" onClick={() => onCategorySelect('All')}>
          <span className="logo">🎮</span>
          <div>
            <span className="brand-name">PRIMAL</span>
            <span className="brand-sub"> GAMING HUB</span>
            <div className="brand-tagline">Your Ultimate Gaming Destination</div>
          </div>
        </Link>

        <div className="cart-wrapper">
          <Link to="/cart" className="cart-btn">
            🛒
            <div>
              <div className="cart-text">My Cart</div>
              {cartCount > 0 && (
                <div className="cart-count">{cartCount} item(s)</div>
              )}
            </div>
            {cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>

      <div className="category-bar">
        <span className="category-label">☰ Categories</span>
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
            className="category-link"
          >
            {cat.label}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default Navbar