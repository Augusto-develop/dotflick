export default {
    namespaced: true,
    state: {       
        isModalCheckoutOpen: false,
    },
    mutations: {        
        SET_CHECKOUT_MODAL_STATE(state, value) {
            state.isModalCheckoutOpen = value;
        },
    },
    actions: {       
        openCheckoutModal({ commit }) {
            commit('SET_CHECKOUT_MODAL_STATE', true);
        },
        closeCheckoutModal({ commit }) {
            commit('SET_CHECKOUT_MODAL_STATE', false);
        },
    },
    getters: {        
        isCheckoutModalOpen: (state) => state.isModalCheckoutOpen,
    },
};

