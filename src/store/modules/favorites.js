export default {
    namespaced: true,
    state: {
        movies: [],
        isModalFavoritesOpen: false,
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
        CLEAR_FAVORITES(state) {
            state.movies = [];
        },
        SET_FAVORITES_MODAL_STATE(state, value) {
            state.isModalFavoritesOpen = value;
        },
    },
    actions: {
        addFavorite({ commit }, movieId) {
            commit('ADD_FAVORITE', movieId);            
        },
        removeFavorite({ commit }, movieId) {
            commit('REMOVE_FAVORITE', movieId);            
        },
        clearFavorites({ commit }) {
            commit('CLEAR_FAVORITES');
        },        
        openFavoritesModal({ commit }) {
            commit('SET_FAVORITES_MODAL_STATE', true);
        },
        closeFavoritesModal({ commit }) {
            commit('SET_FAVORITES_MODAL_STATE', false);
        },
    },
    getters: {
        getFavorites: (state) => state.movies,
        isFavoritesModalOpen: (state) => state.isModalFavoritesOpen,
    },
};
