import './ProductCard.css'

function ProductCard({ product, addToCart }) {
  const handleBuyNow = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in purchasing the following item:\n\nProduct: ${product.name}\nPrice: Ksh ${product.price}\n\nCould you please assist me with this order?`
    )
    window.open(`https://wa.me/254104166093?text=${message}`, '_blank')
  }

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Ksh {product.price}</p>
        <div className="product-buttons">
          <button onClick={() => addToCart(product)} className="cart-btn">
            🛒 Add to Cart
          </button>
          <button onClick={handleBuyNow} className="buy-btn">
            ⚡ Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard