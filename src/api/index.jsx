import axios from 'axios';

const api_key = "341ce107cdbf9cc2f2dfcca2b3c7cb6e";
const baseUrl = "https://api.themoviedb.org/3/";

async function fetchPopularMovies(page =1){
    const response = await axios.get(`${baseUrl}movie/popular`,{
    params: {
        api_key: api_key,
        language: 'en-US',
        page: page
    }
})
    return response.data;
}

async function searchMovies(query, page = 1) {
    const response = await axios.get(`${baseUrl}search/movie`, {
    params: {
        api_key: api_key,
        language: 'en-US',
        query: query,   
        page: page,
}
})
    return response.data;
}

async function fetchMovieDetails(movieID){
    const response = await axios.get(`${baseUrl}movie/${movieID}`,{
    params: {
        api_key: api_key,
        language: 'en-US',
    }
})
    return response.data;
} 
async function fetchMovieTrailer(movieID){
    const response = await axios.get(`${baseUrl}movie/${movieID}/videos`,{
    params: {
        api_key: api_key,
        language: 'en-US',
    }
})
    return response.data;
}

async function fetchMovieCast(movieID){
    const response = await axios.get(`${baseUrl}movie/${movieID}/credits`,{
    params: {
        api_key: api_key,
        language: 'en-US',
    }
})
    return response.data;
}



export {
    fetchPopularMovies, 
    searchMovies, 
    fetchMovieDetails, 
    fetchMovieTrailer,
    fetchMovieCast
};