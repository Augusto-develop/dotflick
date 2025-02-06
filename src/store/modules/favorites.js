export default {
    namespaced: true,
    state: {
        movies: [],
    },
    mutations: {
        ADD_FAVORITE(state, movieId) {
            // Verificar se o ID do filme já foi adicionado para evitar duplicados
            if (!state.movies.includes(movieId)) {
                state.movies.push(movieId);
            }
        },
        REMOVE_FAVORITE(state, movieId) {
            state.movies = state.movies.filter(id => id !== movieId);
        },
    },
    actions: {
        addFavorite({ commit }, movieId) {
            commit('ADD_FAVORITE', movieId);            
        },
        removeFavorite({ commit }, movieId) {
            commit('REMOVE_FAVORITE', movieId);            
        },
    },
    getters: {
        getFavorites: (state) => state.movies,
    },
};

