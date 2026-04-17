import axios from 'axios';

const api_key = "341ce107cdbf9cc2f2dfcca2b3c7cb6e";
const baseUrl = "https://api.themoviedb.org/3/";

// Axios instance with timeout configuration
const axiosInstance = axios.create({
  timeout: 10000, // 10 seconds timeout
});

// Retry logic utility
async function retryRequest(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error; // Last retry failed
      
      // Only retry on network errors, not on 4xx/5xx responses
      if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || !error.response) {
        console.warn(`Retry attempt ${i + 1}/${maxRetries} after ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      } else {
        throw error; // Don't retry on HTTP errors
      }
    }
  }
}

async function fetchPopularMovies(page = 1){
    try {
        return await retryRequest(() =>
          axiosInstance.get(`${baseUrl}movie/popular`, {
            params: {
              api_key: api_key,
              language: 'en-US',
              page: page
            }
          }).then(res => res.data)
        );
    } catch (error) {
        console.error('Error fetching popular movies:', error.message);
        throw new Error('Failed to load movies. Please check your internet connection and try again.');
    }
}

async function searchMovies(query, page = 1) {
    try {
        return await retryRequest(() =>
          axiosInstance.get(`${baseUrl}search/movie`, {
            params: {
              api_key: api_key,
              language: 'en-US',
              query: query,   
              page: page,
            }
          }).then(res => res.data)
        );
    } catch (error) {
        console.error('Error searching movies:', error.message);
        throw new Error('Failed to search movies. Please try again.');
    }
}

async function fetchMovieDetails(movieID){
    try {
        return await retryRequest(() =>
          axiosInstance.get(`${baseUrl}movie/${movieID}`, {
            params: {
              api_key: api_key,
              language: 'en-US',
            }
          }).then(res => res.data)
        );
    } catch (error) {
        console.error('Error fetching movie details:', error.message);
        throw new Error('Failed to load movie details. Please try again.');
    }
} 

async function fetchMovieTrailer(movieID){
    try {
        return await retryRequest(() =>
          axiosInstance.get(`${baseUrl}movie/${movieID}/videos`, {
            params: {
              api_key: api_key,
              language: 'en-US',
            }
          }).then(res => res.data)
        );
    } catch (error) {
        console.error('Error fetching movie trailer:', error.message);
        throw new Error('Failed to load trailer. Please try again.');
    }
}

async function fetchMovieCast(movieID){
    try {
        return await retryRequest(() =>
          axiosInstance.get(`${baseUrl}movie/${movieID}/credits`, {
            params: {
              api_key: api_key,
              language: 'en-US',
            }
          }).then(res => res.data)
        );
    } catch (error) {
        console.error('Error fetching movie cast:', error.message);
        throw new Error('Failed to load cast information. Please try again.');
    }
}

export {
    fetchPopularMovies, 
    searchMovies, 
    fetchMovieDetails, 
    fetchMovieTrailer,
    fetchMovieCast
};