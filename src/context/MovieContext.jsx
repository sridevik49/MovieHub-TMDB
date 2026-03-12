import React, { useState, useEffect } from "react";
import { fetchPopularMovies, searchMovies} from "../api";

const MovieContext = React.createContext();

export const MovieProvider = ({ children }) => {

  const [movie, setMovie] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const[loading, setLoading] = useState(false);

  async function fetchMovies  ()  {
      setLoading(true); 
      try {
        if (search) {
          const d = await searchMovies(search, currentPage);
          setMovie(d.results);
          setTotalPages(d.total_pages);
        } 
		else {
          const d = await fetchPopularMovies(currentPage);
          setMovie(d.results);
          setTotalPages(d.total_pages);
        }
		

      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false); 
      }
    };

  useEffect(() => {
    fetchMovies();
  }, [search, currentPage]);

  function handleNext() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  return (
    <MovieContext.Provider
      value={{
        movie,
        search,
        setSearch,
        currentPage,
        totalPages,
        handleNext,
        handlePrev,
        setMovie,
		loading
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext };