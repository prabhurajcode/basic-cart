import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Fetch products from Fake Store API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=20")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  // Function to handle adding or removing from cart
  const handleCart = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        product.inCart = !product.inCart;
        setCartCount((prevCount) => prevCount + (product.inCart ? 1 : -1));
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            Fake Store
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="#1">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#2">
                  About
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Shop
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    All Products
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Popular Items
                  </a>
                  <a className="dropdown-item" href="#">
                    New Arrivals
                  </a>
                </div>
              </li>
            </ul>
            <div className="col d-flex justify-content-end">
              <button className="btn btn-outline-success">
                <i className="fa fa-cart-plus"></i> Cart ({cartCount})
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header section */}
      <div className="bg-dark text-white text-center py-4 text-center mt-5">
        <div className="container">
          <h1 className="display-4">Welcome to Fake Store</h1>
          <p className="lead">
            Your one-stop destination for all your shopping needs.
          </p>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="card h-100">
                <img
                  className="card-img-top"
                  src={product.image}
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">$ {product.price}</p>

                  <button
                    className={`btn btn-${
                      product.inCart ? "danger" : "primary"
                    }`}
                    onClick={() => handleCart(product.id)}
                  >
                    {product.inCart ? "Remove from Cart" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer section */}
      <footer className="footer bg-dark text-white text-center py-4">
        <div className="container">
          <span>&copy; 2024 Fake Store. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

App.propTypes = {
  initialProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      inCart: PropTypes.bool,
    })
  ),
  initialCartCount: PropTypes.number,
};

export default App;
