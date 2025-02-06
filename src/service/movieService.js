const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "fed0514532b5f6a98a744b4ad6557801";

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
