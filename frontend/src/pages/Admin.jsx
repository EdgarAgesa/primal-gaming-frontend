import { useState, useEffect } from 'react'
import axios from 'axios'

const CATEGORIES = ['Consoles', 'Games', 'PCs&laptop', 'Controllers']

function Admin() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Consoles')
  const [image, setImage] = useState(null)
  const [message, setMessage] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const fetchProducts = () => {
    axios.get('https://primal-gaming-backend.onrender.com/api/products')
      .then(res => setProducts(res.data))
  }

  useEffect(() => {
    if (loggedIn) fetchProducts()
  }, [loggedIn])

  const handleLogin = () => {
    axios.post('https://primal-gaming-backend.onrender.com/api/admin/login', { username, password })
      .then(res => {
        if (res.data.success) setLoggedIn(true)
        else setMessage('❌ Invalid credentials')
      })
      .catch(() => setMessage('❌ Invalid credentials'))
  }

  const handleAddProduct = () => {
    if (!name || !price || !image) {
      setMessage('❌ Please fill all fields and select an image')
      return
    }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('image', image)

    axios.post('https://primal-gaming-backend.onrender.com/api/products', formData)
      .then(() => {
        setMessage('✅ Product added successfully!')
        setName('')
        setPrice('')
        setDescription('')
        setCategory('Consoles')
        setImage(null)
        fetchProducts()
        setTimeout(() => setMessage(''), 3000)
      })
      .catch(() => setMessage('❌ Failed to add product'))
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`https://primal-gaming-backend.onrender.com/api/products/${id}`)
        .then(() => {
          setMessage('✅ Product deleted!')
          fetchProducts()
          setTimeout(() => setMessage(''), 3000)
        })
    }
  }

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  if (!loggedIn) {
    return (
      <div style={styles.container}>
        <div style={styles.loginBox}>
          <div style={styles.loginHeader}>
            <span style={styles.loginEmoji}>🔐</span>
            <h2 style={styles.loginTitle}>Admin Login</h2>
            <p style={styles.loginSubtitle}>Primal Gaming Hub Dashboard</p>
          </div>
          {message && <p style={styles.errorMsg}>{message}</p>}
          <input
            style={styles.input}
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
          <button onClick={handleLogin} style={styles.loginBtn}>
            Login to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🎮 Admin Dashboard</h2>
        <p style={styles.subtitle}>Primal Gaming Hub — Product Manager</p>
      </div>

      {message && (
        <div style={styles.messageBox}>
          {message}
        </div>
      )}

      {/* Add Product Form */}
      <div style={styles.formBox}>
        <h3 style={styles.formTitle}>➕ Add New Product</h3>
        <div style={styles.formGrid}>
          <input
            style={styles.input}
            placeholder="Product Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Price (Ksh)"
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <select
            style={styles.input}
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'PCs&laptop' ? 'PCs & Laptops' : cat}
              </option>
            ))}
          </select>
          <input
            style={styles.input}
            placeholder="Short Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <input
          style={{ ...styles.input, marginTop: '1rem' }}
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
        />
        <button onClick={handleAddProduct} style={styles.addBtn}>
          ➕ Add Product
        </button>
      </div>

      {/* Products List */}
      <div style={styles.productsSection}>
        <div style={styles.productsHeader}>
          <h3 style={styles.formTitle}>📦 All Products ({products.length})</h3>
          <div style={styles.filterBtns}>
            {['All', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  ...styles.filterBtn,
                  backgroundColor: activeCategory === cat ? '#e94560' : '#16213e',
                }}
              >
                {cat === 'PCs&laptop' ? 'PCs & Laptops' : cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <p style={styles.emptyMsg}>No products in this category yet.</p>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} style={styles.productRow}>
              <img
                src={`https://primal-gaming-backend.onrender.com/uploads/${product.image}`}
                alt={product.name}
                style={styles.productImage}
              />
              <div style={styles.productInfo}>
                <p style={styles.productName}>{product.name}</p>
                <p style={styles.productCategory}>📁 {product.category}</p>
                <p style={styles.productPrice}>Ksh {product.price}</p>
              </div>
              <button
                onClick={() => handleDelete(product.id)}
                style={styles.deleteBtn}
              >
                🗑️ Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: '#0a0a0f',
    minHeight: '100vh',
    padding: '2rem',
  },
  header: {
    marginBottom: '2rem',
    borderLeft: '4px solid #e94560',
    paddingLeft: '1rem',
  },
  title: {
    color: '#e94560',
    fontSize: '2rem',
    margin: '0',
  },
  subtitle: {
    color: '#aaa',
    margin: '0.3rem 0 0 0',
  },
  loginBox: {
    backgroundColor: '#16213e',
    borderRadius: '12px',
    padding: '2.5rem',
    maxWidth: '420px',
    margin: '5rem auto',
    border: '1px solid #e94560',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  loginEmoji: {
    fontSize: '3rem',
  },
  loginTitle: {
    color: '#e94560',
    fontSize: '1.8rem',
    margin: '0.5rem 0 0 0',
  },
  loginSubtitle: {
    color: '#aaa',
    margin: '0.3rem 0 0 0',
    fontSize: '0.9rem',
  },
  errorMsg: {
    color: '#e94560',
    textAlign: 'center',
  },
  messageBox: {
    backgroundColor: '#16213e',
    border: '1px solid #e94560',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1.5rem',
    color: '#fff',
    textAlign: 'center',
  },
  formBox: {
    backgroundColor: '#16213e',
    borderRadius: '12px',
    padding: '2rem',
    marginBottom: '2rem',
    border: '1px solid #333',
    maxWidth: '1200px',
  },
  formTitle: {
    color: '#fff',
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '1rem',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #333',
    backgroundColor: '#0a0a0f',
    color: '#fff',
    fontSize: '1rem',
    width: '100%',
  },
  addBtn: {
    marginTop: '1.5rem',
    padding: '0.9rem 2rem',
    backgroundColor: '#e94560',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  loginBtn: {
    padding: '0.9rem',
    backgroundColor: '#e94560',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  productsSection: {
    maxWidth: '1200px',
  },
  productsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  filterBtns: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '0.4rem 0.9rem',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.85rem',
  },
  productRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: '#16213e',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '1rem',
    border: '1px solid #333',
  },
  productImage: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: '#fff',
    margin: '0',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  productCategory: {
    color: '#aaa',
    margin: '0.2rem 0',
    fontSize: '0.85rem',
  },
  productPrice: {
    color: '#e94560',
    margin: '0',
    fontWeight: 'bold',
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    color: '#e94560',
    border: '1px solid #e94560',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
  },
  emptyMsg: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: '2rem',
  }
}

export default Admin