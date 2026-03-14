function Cart({ cart, removeFromCart, setCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    if (cart.length === 0) return

    const itemsList = cart
      .map((item, i) => `${i + 1}. ${item.name} x${item.quantity} - Ksh ${item.price * item.quantity}`)
      .join('\n')

    const message = encodeURIComponent(
      `Hi! I'd like to place the following order:\n\n🛒 My Order:\n${itemsList}\n\nTotal: Ksh ${total}\n\nCould you please assist me with this order?`
    )
    window.open(`https://wa.me/254104166093?text=${message}`, '_blank')
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p style={styles.empty}>Your cart is empty!</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={styles.item}>
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
                style={styles.image}
              />
              <div style={styles.info}>
                <h3 style={styles.name}>{item.name}</h3>
                <p style={styles.price}>Ksh {item.price} x {item.quantity}</p>
                <p style={styles.subtotal}>Subtotal: Ksh {item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                style={styles.removeBtn}
              >
                ✕ Remove
              </button>
            </div>
          ))}

          <div style={styles.totalBox}>
            <h3 style={styles.total}>Total: Ksh {total}</h3>
            <button onClick={handleCheckout} style={styles.checkoutBtn}>
              💬 Checkout via WhatsApp
            </button>
            <button onClick={() => setCart([])} style={styles.clearBtn}>
              🗑️ Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: '#0f0f1a',
    minHeight: '100vh',
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    color: '#e94560',
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  empty: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: '1.2rem',
    marginTop: '3rem',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: '#16213e',
    borderRadius: '12px',
    padding: '1rem',
    marginBottom: '1rem',
    border: '1px solid #e94560',
  },
  image: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#fff',
    margin: '0 0 0.3rem 0',
  },
  price: {
    color: '#aaa',
    margin: '0',
    fontSize: '0.9rem',
  },
  subtotal: {
    color: '#e94560',
    margin: '0.3rem 0 0 0',
    fontWeight: 'bold',
  },
  removeBtn: {
    backgroundColor: 'transparent',
    color: '#e94560',
    border: '1px solid #e94560',
    borderRadius: '8px',
    padding: '0.4rem 0.8rem',
    cursor: 'pointer',
  },
  totalBox: {
    backgroundColor: '#16213e',
    borderRadius: '12px',
    padding: '1.5rem',
    marginTop: '1.5rem',
    border: '1px solid #e94560',
    textAlign: 'right',
  },
  total: {
    color: '#fff',
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  checkoutBtn: {
    backgroundColor: '#25D366',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
    marginRight: '1rem',
  },
  clearBtn: {
    backgroundColor: 'transparent',
    color: '#e94560',
    border: '1px solid #e94560',
    borderRadius: '8px',
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    cursor: 'pointer',
  }
}

export default Cart