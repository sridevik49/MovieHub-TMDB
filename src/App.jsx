import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchPopularMovies, searchMovies } from './api'
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import Loader from "./Components/Loader";
import Pagination from "./Components/Pagination";
import MovieDetails from "./Layout/Movie";
import useDebounce from "./hooks/useDebounce";
import './App.scss'

const Login = React.lazy(() => import("./pages/UserInfo/Login"));
const Signup = React.lazy(() => import("./pages/UserInfo/Signup"));
const ForgotPassword = React.lazy(() => import("./pages/UserInfo/ForgotPassword"));
const Home = React.lazy(() => import("./Layout/Home/"))
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact/"))
const Profile = React.lazy(() => import("./pages/UserInfo/Profile"));


const App = () => {
  const { user } = useAuth();
  const [movie, setMovie] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setLoading(true);
    setError("");
    
    const fetchData = async () => {
      try {
        let data;
        if (debouncedSearch) {
          data = await searchMovies(debouncedSearch, currentPage);
        } else {
          data = await fetchPopularMovies(currentPage);
        }
        setMovie(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to load movies. Please try again.");
        setMovie([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearch, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  function handleNext() {
    setCurrentPage((prev) => prev + 1)
  }

  function handlePRev() {
    setCurrentPage((prev) => prev - 1)
  }

  function handleRetry() {
    setError("");
    setLoading(true);
    // Trigger refetch by resetting state
    if (debouncedSearch) {
      searchMovies(debouncedSearch, currentPage)
        .then(d => {
          setMovie(d.results);
          setTotalPages(d.total_pages);
        })
        .catch(err => {
          setError(err.message || "Failed to load movies. Please try again.");
          setMovie([]);
        })
        .finally(() => setLoading(false));
    } else {
      fetchPopularMovies(currentPage)
        .then(d => {
          setMovie(d.results);
          setTotalPages(d.total_pages);
        })
        .catch(err => {
          setError(err.message || "Failed to load movies. Please try again.");
          setMovie([]);
        })
        .finally(() => setLoading(false));
    }
  }


  return (
    <BrowserRouter>
      <div className="app">
        <div className="app">
          <Navbar search={search} setSearch={setSearch} />


          <Routes>

            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <Suspense fallback={<Loader />}>
                  <Login />
                </Suspense>
              }
            />

            <Route
              path="/signup"
              element={
                <Suspense fallback={<Loader />}>
                  <Signup />
                </Suspense>
              }
            />

            <Route
              path="/forgot-password"
              element={
                <Suspense fallback={<Loader />}>
                  <ForgotPassword />
                </Suspense>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Suspense fallback={<Loader />}>
                    <Profile />
                  </Suspense>
                </PrivateRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Suspense fallback={<Loader />}>
                    <>
                      {error && (
                        <div style={{
                          color: "#ff6b6b",
                          padding: "20px",
                          textAlign: "center",
                          fontSize: "16px",
                          margin: "20px",
                          backgroundColor: "rgba(255, 107, 107, 0.1)",
                          borderRadius: "8px",
                          border: "1px solid #ff6b6b"
                        }}>
                          <p style={{ marginBottom: "15px" }}>{error}</p>
                          <p style={{ fontSize: "14px", marginBottom: "15px", color: "#dcd0f5" }}>
                            Tips: Check your internet connection, or the API might be unavailable.
                          </p>
                          <button
                            onClick={handleRetry}
                            style={{
                              backgroundColor: "#8a4fff",
                              color: "#fff",
                              border: "none",
                              padding: "10px 20px",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "14px",
                              fontWeight: "500",
                              transition: "0.3s",
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#a36fff"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#8a4fff"}
                          >
                            Retry
                          </button>
                        </div>
                      )}
                      {loading && (
                        <div style={{
                          color: "#e0d9f0",
                          padding: "40px",
                          textAlign: "center"
                        }}>
                          <p>Loading movies...</p>
                        </div>
                      )}
                      {!loading && !error && movie.length === 0 && (
                        <div style={{
                          color: "#e0d9f0",
                          padding: "40px",
                          textAlign: "center"
                        }}>
                          <p>No movies found. Try a different search.</p>
                        </div>
                      )}
                      {movie.length > 0 && (
                        <>
                          <Home movie={movie} />
                          <Pagination
                            currentPage={currentPage}
                            handleNext={handleNext}
                            handlePrev={handlePRev}
                            totalPages={totalPages}
                          />
                        </>
                      )}
                    </>
                  </Suspense>
                </PrivateRoute>
              }
            />

            <Route
              path="/movie/:id"
              element={
                <PrivateRoute>
                  <Suspense fallback={<h2>Loading Movie...</h2>}>
                    <MovieDetails />
                  </Suspense>
                </PrivateRoute>
              }
            />

            {/* Other pages */}
            <Route
              path="/about"
              element={
                <Suspense fallback={<Loader />}>
                  <About />
                </Suspense>
              }
            />

            <Route
              path="/contact"
              element={
                <Suspense fallback={<Loader />}>
                  <Contact />
                </Suspense>
              }
            />

            <Route path="*" element={<h1>404 Page Not Found</h1>} />

          </Routes>
          <Footer />
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App