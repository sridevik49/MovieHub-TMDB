import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchPopularMovies, searchMovies } from './api'
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import Loader from "./Components/Loader";
import Pagination from "./Components/Pagination";
import MovieDetails from "./Layout/Movie";
import useDebounce from "./hooks/useDebounce";
import './App.css'

const Home = React.lazy(() => import("./Layout/Home/index"))
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact/index"))



const App = () => {

  const [movie, setMovie] = useState([])
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);


  const debouncedSearch = useDebounce(search, 500);

useEffect(() => {
  if (debouncedSearch) {
    searchMovies(debouncedSearch, currentPage)
      .then(d => {
        setMovie(d.results);
        setTotalPages(d.total_pages);
      });
  } else {
    fetchPopularMovies(currentPage)
      .then(d => {
        setMovie(d.results);
        setTotalPages(d.total_pages);
      });
  }
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


  return (
    <BrowserRouter>
      <div className="app">
        <div className="app">
          <Navbar search={search} setSearch={setSearch} />
          

          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loader />}>
                  <>
                    <Home movie={movie} />

                    <Pagination
                      currentPage={currentPage}
                      handleNext={handleNext}
                      handlePrev={handlePRev}
                      totalPages={totalPages}
                    />
                  </>
                </Suspense>
              }
            />

            <Route
              path="/movie/:id"
              element={
                <Suspense fallback={<h2>Loading Movie...</h2>}>
                  <MovieDetails />
                </Suspense>
              }
            />
            <Route path="*" element={<h1>404 Page Not Found</h1>} />

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

          </Routes>

          <Footer />
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App