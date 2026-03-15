import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './components/Footer.css'
import { useState } from 'react'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  return (
    <Router>
      <Navbar
        cartCount={cart.length}
        onCategorySelect={setSelectedCategory}
      />
      <Routes>
        <Route path="/" element={
          <Home
            addToCart={addToCart}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />}
        />
        <Route path="/cart" element={
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            setCart={setCart}
          />}
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App