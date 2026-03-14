function ProductCard({ product, addToCart }) {
  const handleBuyNow = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in purchasing the following item:\n\nProduct: ${product.name}\nPrice: Ksh ${product.price}\n\nCould you please assist me with this order?`
    )
    window.open(`https://wa.me/254104166093?text=${message}`, '_blank')
  }

  return (
    <div style={styles.card}>
      <img
        src={`https://primal-gaming-backend.onrender.com/uploads/${product.image}`}
        alt={product.name}
        style={styles.image}
      />
      <div style={styles.info}>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.price}>Ksh {product.price}</p>
        <div style={styles.buttons}>
          <button onClick={() => addToCart(product)} style={styles.cartBtn}>
            🛒 Add to Cart
          </button>
          <button onClick={handleBuyNow} style={styles.buyBtn}>
            ⚡ Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: '#16213e',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #e94560',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  info: {
    padding: '1rem',
  },
  name: {
    color: '#fff',
    margin: '0 0 0.5rem 0',
    fontSize: '1.1rem',
  },
  description: {
    color: '#aaa',
    fontSize: '0.9rem',
    margin: '0 0 0.5rem 0',
  },
  price: {
    color: '#e94560',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    margin: '0 0 1rem 0',
  },
  buttons: {
    display: 'flex',
    gap: '0.5rem',
  },
  cartBtn: {
    flex: 1,
    padding: '0.5rem',
    backgroundColor: '#0f3460',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  buyBtn: {
    flex: 1,
    padding: '0.5rem',
    backgroundColor: '#e94560',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  }
}

export default ProductCard