export default {
    namespaced: true,
    state: {
        movies: [],
        isModalCartOpen: false,
    },
    mutations: {
        ADD_CART(state, movieId) {
            // Verificar se o ID do filme já foi adicionado para evitar duplicados
            if (!state.movies.includes(movieId)) {
                state.movies.push(movieId);
            }
        },
        REMOVE_CART(state, movieId) {
            state.movies = state.movies.filter(id => id !== movieId);
        },
        CLEAR_CART(state) {
            state.movies = [];
        },
        SET_CART_MODAL_STATE(state, value) {
            state.isModalCartOpen = value;
        },
    },
    actions: {
        addCart({ commit }, movieId) {
            commit('ADD_CART', movieId);
        },
        removeCart({ commit }, movieId) {
            commit('REMOVE_CART', movieId);
        },
        clearCart({ commit }) {
            commit('CLEAR_CART');
        },
        openCartModal({ commit }) {
            commit('SET_CART_MODAL_STATE', true);
        },
        closeCartModal({ commit }) {
            commit('SET_CART_MODAL_STATE', false);
        },
    },
    getters: {
        getCart: (state) => state.movies,
        isCartModalOpen: (state) => state.isModalCartOpen,
    },
};

