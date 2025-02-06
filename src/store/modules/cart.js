export default {
    namespaced: true,
    state: {
        movies: [],
    },
    mutations: {
        ADD_CART(state, movieId) {
            // Verificar se o ID do filme já foi adicionado para evitar duplicados
            // if (!state.movies.includes(movieId)) {
                state.movies.push(movieId);
            // }
        },
        REMOVE_CART(state, movieId) {
            state.movies = state.movies.filter(id => id !== movieId);
        },
    },
    actions: {
        addCart({ commit }, movieId) {
            commit('ADD_CART', movieId);            
        },
        removeCart({ commit }, movieId) {
            commit('REMOVE_CART', movieId);            
        },
    },
    getters: {
        getCart: (state) => state.movies,
    },
};

