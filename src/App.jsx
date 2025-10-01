import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductCreate from './pages/ProductCreate';
import Home from './pages/Home';
import Registration from './pages/Registration';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProductList from './pages/ProductList';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AddEvent from './pages/AddEvent';
import EventList from './pages/EventList';
import UserProfile from './pages/UserProfile';
import UserEvents from './pages/UserEvents';
import EventDetails from './pages/EventDetails';
import EditEvent from './pages/EditEvent';
import Contact from './pages/Contact'; // Add this import
import Footer from './components/Footer';
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/events" element={<EventList />} /> 
              <Route path="/contact" element={<Contact />} /> {/* Add contact route */}
              <Route path="/profile" element={<UserProfile />} /> 
              <Route path="/added-events" element={<UserEvents />} />
              <Route path="/my-events" element={<UserEvents />} /> {/* Header এর জন্য extra route */}
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/event/:id" element={<EventDetails />} /> {/* Home page এর জন্য extra route */}
              <Route path="/edit-event/:id" element={<EditEvent />} />
              <Route
                path="/add-event"
                element={
                  <PrivateRoute>
                    <AddEvent/>
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-product"
                element={
                  <PrivateRoute>
                    <ProductCreate />
                  </PrivateRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;