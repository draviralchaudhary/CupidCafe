import { siteConfig } from "../config/site";
import { useState } from 'react';
import { Search, ShoppingBasket, Heart, Sparkles, MapPin, Clock, Star, Menu as MenuIcon, X } from 'lucide-react';
import cafeImage from "../assets/cafe.png";


const API = "https://cupidcafe-production.up.railway.app/";

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const menuItems: MenuItem[] = [
  { id: 1, name: 'Golden Hour Cappuccino', price: 180, category: 'Coffee & Tea', image: 'https://images.unsplash.com/photo-1761102912980-37d29d9bea4b?w=400', description: 'Sunset-inspired blend', rating: 4.8 },
  { id: 2, name: 'Cupid Cafe Latte', price: 200, category: 'Coffee & Tea', image: 'https://images.unsplash.com/photo-1746047255898-d92cb0fba33e?w=400', description: 'Smooth and aromatic', rating: 4.9 },
  { id: 3, name: 'Twilight Mocha', price: 190, category: 'Coffee & Tea', image: 'https://images.unsplash.com/photo-1676338596295-4c10f6124a20?w=400', description: 'Rich chocolate delight', rating: 4.7 },
  { id: 4, name: 'Mountain View Fries', price: 150, category: 'Snacks', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400', description: 'Crispy and golden', rating: 4.6 },
  { id: 5, name: 'Sunset Pasta', price: 280, category: 'Mains', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400', description: 'Creamy and delicious', rating: 4.8 },
  { id: 6, name: 'Sky Garden Salad', price: 220, category: 'Healthy', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', description: 'Fresh and vibrant', rating: 4.7 },
  { id: 7, name: 'Vibes Burger', price: 320, category: 'Burgers', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', description: 'Juicy and satisfying', rating: 4.9 },
  { id: 8, name: 'Rooftop Pizza', price: 380, category: 'Mains', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', description: 'Wood-fired perfection', rating: 4.8 },
  { id: 9, name: 'Twilight Mocktail', price: 160, category: 'Beverages', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', description: 'Refreshing and colorful', rating: 4.6 },
  { id: 10, name: 'Golden Smoothie Bowl', price: 240, category: 'Healthy', image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400', description: 'Nutritious and beautiful', rating: 4.7 },
  { id: 11, name: 'Sky Pancakes', price: 200, category: 'Desserts', image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400', description: 'Fluffy and sweet', rating: 4.8 },
  { id: 12, name: 'Vibes Ice Cream', price: 140, category: 'Desserts', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', description: 'Cool and creamy', rating: 4.9 },
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = ['All', 'Coffee & Tea', 'Snacks', 'Mains', 'Burgers', 'Healthy', 'Beverages', 'Desserts'];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(prevCart => {
      return prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0);
    });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }} className="min-h-screen bg-white text-gray-900">

      {/* Apple-style Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-amber-500" size={24} />
            <span className="font-semibold text-lg tracking-tight">Cupid Cafe</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#home" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a>
            <a href="#menu" className="text-gray-600 hover:text-gray-900 transition-colors">Menu</a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingBasket size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
            <button className="px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Book a Table
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-6 py-4 space-y-3">
              <a href="#home" className="block text-gray-600 hover:text-gray-900 transition-colors">Home</a>
              <a href="#menu" className="block text-gray-600 hover:text-gray-900 transition-colors">Menu</a>
              <a href="#about" className="block text-gray-600 hover:text-gray-900 transition-colors">About</a>
              <a href="#contact" className="block text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
              <button className="w-full px-5 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Book a Table
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img
            src={cafeImage}
            alt="Cupid Cafe Cafe"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 text-white text-sm">
            <MapPin size={16} />
            <span>Live the Moment</span>
          </div>

          <h1 className="font-bold text-white mb-6" style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}>
            Cupid Cafe
          </h1>

          <p className="text-white/90 mb-10 max-w-2xl mx-auto" style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', fontWeight: '400', lineHeight: '1.5' }}>
            Where breathtaking sunsets meet exquisite cuisine. Experience dining among the clouds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Explore Menu
            </button>
            <button onClick={async () => {
                const res = await fetch(`${API}/health`);
                const data = await res.json();
                console.log(data);
                alert(JSON.stringify(data));
                  }}>
                  Test Backend 🔥
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300">
              Reserve Now
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Clock className="text-amber-500" size={24} />
              <div className="text-left">
                <p className="text-sm text-gray-500">Opens Daily</p>
                <p className="font-semibold">{siteConfig.timing}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MapPin className="text-amber-500" size={24} />
              <div className="text-left">
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold">{siteConfig.location}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Star className="text-amber-500" size={24} fill="currentColor" />
              <div className="text-left">
                <p className="text-sm text-gray-500">Rating</p>
                <p className="font-semibold">{siteConfig.rating}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-6">
              Our Story
            </div>
            <h2 className="font-bold mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              A Moment Worth Living
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Perched on the viewpoint with panoramic sunset views, Cupid Cafe is more than just a café — it's an experience.
              Our cozy outdoor seating, twinkling string lights, and lush surroundings create the perfect ambiance for
              unforgettable moments.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              From gourmet dishes to , every item on our menu is crafted with passion and served with love.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={cafeImage}
              alt="Cafe atmosphere"
              className="rounded-3xl w-full h-64 object-cover shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1761102912980-37d29d9bea4b?w=600"
              alt="Food"
              className="rounded-3xl w-full h-64 object-cover shadow-lg mt-8"
            />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-6">
              Our Menu
            </div>
            <h2 className="font-bold mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              Curated with Love
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Every dish tells a story, crafted to perfection with the finest ingredients
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full font-semibold text-gray-900 shadow-lg">
                    ₹{item.price}
                  </div>
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-lg">
                    <Star className="text-amber-500" size={14} fill="currentColor" />
                    <span className="text-sm font-semibold text-gray-900">{item.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-amber-600 font-medium mb-2 uppercase tracking-wide">
                    {item.category}
                  </div>
                  <h3 className="font-semibold mb-2" style={{ fontSize: '1.25rem', lineHeight: '1.3' }}>
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {item.description}
                  </p>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full py-3 bg-gray-900 text-white rounded-full font-medium transition-all duration-300 hover:bg-gray-800 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <Heart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bold mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
            Book your table now and witness the magic of sunset dining at Cupid Cafe
          </p>
          <button className="px-10 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
            Reserve Your Spot
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-amber-500" size={24} />
                <span className="font-semibold text-lg">Cupid Cafe</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Live the moment at our hilltop paradise. Where memories are made and moments are cherished.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#menu" className="hover:text-white transition-colors">Menu</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hours</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Monday - Sunday</li>
                <li>{siteConfig.timing}</li>
                <li className="pt-2">Happy Hours</li>
                <li>5:00 PM - 10:00 PM</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>{siteConfig.location}</li>
                <li>{siteConfig.phone[0]}</li>
                <li>{siteConfig.phone[1]}</li>
                <li>Follow us on Instagram: @{siteConfig.insta}</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p> 2026 Cupid Cafe © Designed with ❤️ for unforgettable moments.</p>
          </div>
        </div>
      </footer>

      {/* Floating Cart Button - Mobile */}
      {cart.length > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="md:hidden fixed bottom-6 right-6 bg-gray-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-40"
        >
          <ShoppingBasket size={24} />
          <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-semibold">
            {cart.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </button>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-0 md:p-6"
          onClick={() => setShowCart(false)}
        >
          <div
            className="bg-white rounded-t-3xl md:rounded-3xl max-w-2xl w-full max-h-[90vh] md:max-h-[80vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-bold flex items-center gap-3" style={{ fontSize: '1.75rem' }}>
                <ShoppingBasket size={28} />
                Your Cart
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 240px)' }}>
              {cart.length === 0 ? (
                <div className="p-12 text-center">
                  <ShoppingBasket className="mx-auto mb-4 text-gray-300" size={64} />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                        <p className="text-amber-600 font-semibold">₹{item.price} × {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors font-semibold"
                        >
                          -
                        </button>
                        <span className="font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-gray-600">Total Amount</span>
                  <span className="font-bold text-gray-900" style={{ fontSize: '2rem' }}>₹{totalPrice}</span>
                </div>
                <button
                  className="w-full py-4 bg-gray-900 text-white rounded-full font-semibold transition-all duration-300 hover:bg-gray-800 hover:shadow-xl hover:scale-105"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
