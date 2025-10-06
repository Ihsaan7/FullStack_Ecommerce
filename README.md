# React Mini Ecommerce

A modern, responsive e-commerce application built with React 19 and Vite, featuring a sleek UI with dark/light theme support, shopping cart functionality, and seamless navigation.

## 🚀 Live Demo

[View Live Demo](https://react-mini-ecommerce-3x48med4x-egzziwd-8640s-projects.vercel.app)

## ✨ Features

- **Modern React 19** with latest features and optimizations
- **React Router v7** with data loaders and nested routing
- **Dark/Light Theme** with persistent localStorage
- **Shopping Cart** with localStorage persistence
- **Responsive Design** optimized for all devices
- **Product Categories** and detailed product views
- **API Integration** with external product data
- **Tailwind CSS v4** for modern styling
- **Vite** for fast development and building

## 🛠️ Tech Stack

### Core Technologies
- **React 19.1.1** - Latest React with concurrent features
- **Vite 7.1.7** - Fast build tool and dev server
- **React Router DOM 7.9.3** - Client-side routing with data loaders
- **Tailwind CSS 4.1.14** - Utility-first CSS framework

### Key Libraries
- **Axios 1.12.2** - HTTP client for API requests
- **React Icons 5.5.0** - Icon library
- **Heroicons 2.2.0** - Beautiful SVG icons

### Development Tools
- **ESLint 9.36.0** - Code linting
- **PostCSS** - CSS processing
- **SWC** - Fast TypeScript/JavaScript compiler

## 📁 Project Structure

```
src/
├── api/                    # API layer
│   ├── base.js            # Axios configuration
│   ├── product.js         # Product API functions
│   └── category.js        # Category API functions
├── component/             # Reusable components
│   ├── cart/
│   │   └── CartCard.jsx   # Cart item component
│   └── home/
│       ├── Carousel.jsx   # Image carousel
│       └── ProductCard.jsx # Product display card
├── context/               # React Context providers
│   ├── ProductContext.js  # Product context definition
│   ├── ProductProvider.jsx # Cart state management
│   └── ThemeContext.jsx   # Theme state management
├── layout/                # Layout components
│   ├── Container.jsx      # Page container wrapper
│   └── NavLayout.jsx      # Navigation layout
├── loader/                # React Router data loaders
│   ├── recentLoader.js    # Product data loader
│   └── storeLoader.js     # Store data loader
├── pages/                 # Page components
│   ├── Cart.jsx           # Shopping cart page
│   ├── Detail.jsx         # Product detail page
│   ├── Home.jsx           # Homepage
│   └── Store.jsx          # Product store page
├── main.jsx               # App entry point
└── router.jsx             # Route configuration
```

## 🎯 Key Features Explained

### React Router v7 Implementation
This project uses **React Router v7** (not v6) with advanced features:

```jsx
// Nested routing with data loaders
export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      { index: true, element: <Home />, loader: recentLoader },
      { path: "store", element: <Store />, loader: recentLoader },
      { path: "store/:id", element: <Detail />, loader: recentLoader },
      {
        path: "cart",
        loader: recentLoader,
        children: [
          { index: true, element: <Cart /> },
          { path: ":id", element: <Cart />, loader: recentLoader },
        ],
      },
    ],
  },
]);
```

**Features:**
- **Data Loaders**: Pre-load data before component rendering
- **Nested Routes**: Hierarchical route structure
- **Dynamic Routes**: Parameterized routes (`:id`)
- **Index Routes**: Default child routes

### LocalStorage Integration

#### Cart Persistence
```jsx
// Cart state with localStorage sync
const [cartItem, setCartItems] = useState(() => {
  try {
    const storage = localStorage.getItem("cart");
    return storage ? JSON.parse(storage) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
});

useEffect(() => {
  try {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
}, [cartItem]);
```

#### Theme Persistence
```jsx
// Theme state with localStorage
const [theme, setTheme] = useState(() => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") || "light";
  }
  return "light";
});

useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);
```

### API Integration
- **Base API Configuration**: Centralized axios setup
- **Environment Variables**: API URL configuration via `VITE_API_URL`
- **Error Handling**: Comprehensive error management
- **Data Loaders**: Pre-fetching data for optimal performance

### Modern UI Features
- **Tailwind CSS v4**: Latest version with enhanced features
- **Dark Mode**: Class-based dark mode implementation
- **Responsive Design**: Mobile-first approach
- **Custom Gradients**: Luxurious gradient backgrounds
- **Smooth Animations**: CSS transitions and transforms

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ihsaan7/React_Mini_Ecommerce.git
   cd React_Mini_Ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=your_api_url_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Theme Customization
The app supports both light and dark themes. Theme preferences are automatically saved to localStorage.

### Styling
- Uses Tailwind CSS v4 with custom configurations
- Custom gradients and shadows defined in `tailwind.config.js`
- Responsive breakpoints and modern design patterns

### API Configuration
Update the API base URL in `.env` file:
```env
VITE_API_URL=https://your-api-endpoint.com
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px and up
- **Tablet**: 768px and up  
- **Desktop**: 1024px and up
- **Large Desktop**: 1280px and up

## 🔧 Performance Optimizations

- **Vite**: Fast HMR and optimized builds
- **React 19**: Concurrent features and automatic batching
- **Data Loaders**: Pre-loading data for better UX
- **LocalStorage**: Efficient state persistence
- **Code Splitting**: Automatic route-based splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ihsaan**
- GitHub: [@Ihsaan7](https://github.com/Ihsaan7)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the excellent build tool
- Tailwind CSS team for the utility-first CSS framework
- React Router team for the powerful routing solution

---

**Built with ❤️ using React 19, Vite, and Tailwind CSS**