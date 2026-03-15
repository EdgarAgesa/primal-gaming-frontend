import './Cart.css'

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
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty!</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image}     
                alt={item.name}
                className="cart-image"
              />
              <div className="cart-info">
                <h3 className="cart-name">{item.name}</h3>
                <p className="cart-price">Ksh {item.price} x {item.quantity}</p>
                <p className="cart-subtotal">Subtotal: Ksh {item.price * item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="cart-remove-btn"
              >
                ✕ Remove
              </button>
            </div>
          ))}

          <div className="cart-total-box">
            <h3 className="cart-total">Total: Ksh {total}</h3>
            <button onClick={handleCheckout} className="cart-checkout-btn">
              💬 Checkout via WhatsApp
            </button>
            <button onClick={() => setCart([])} className="cart-clear-btn">
              🗑️ Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart