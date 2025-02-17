const API_URL = process.env.VUE_APP_API_TMDB_URL;
const API_KEY = process.env.VUE_APP_API_TMDB_KEY;

export async function handleFetchMovies(query = "", page = 1) {
  const queryOn = query.length > 0;  

  const endpoint = queryOn ? "search/movie" : "movie/popular";
  let url = `${API_URL}${endpoint}?language=pt-BR&api_key=${API_KEY}&page=${page}`;
  
  if (queryOn) {
    url += `&query=${encodeURIComponent(query)}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao buscar os filmes");
    }
    return await response.json();
  } catch (error) {
    console.error("Erro na API:", error);
    return { results: [] };
  }
}

export async function getMovieTitleById(movieId) { 
  const endpoint = `movie/${movieId}`;
  let url = `${API_URL}${endpoint}?language=pt-BR&api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro ao buscar o filme");
    }

    return await response.json();   

  } catch (error) {
    console.error("Erro na API:", error);
    return null;
  }
}
