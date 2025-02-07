export default {
    namespaced: true,
    state: {       
        isModalCheckoutOpen: false,
        isModalConfirmOpen: false,
        payerName: ""
    },
    mutations: {        
        SET_CHECKOUT_MODAL_STATE(state, value) {
            state.isModalCheckoutOpen = value;
        },
        SET_CONFIRM_MODAL_STATE(state, value) {
            state.isModalConfirmOpen = value;
        },        
        SET_CONFIRM_PAYER_NAME(state, value) {
            state.payerName = value;
        },
    },
    actions: {       
        openCheckoutModal({ commit }) {
            commit('SET_CHECKOUT_MODAL_STATE', true);
        },
        closeCheckoutModal({ commit }) {
            commit('SET_CHECKOUT_MODAL_STATE', false);
        },
        openConfirmModal({ commit }) {
            commit('SET_CONFIRM_MODAL_STATE', true);
        },
        closeConfirmModal({ commit }) {
            commit('SET_CONFIRM_MODAL_STATE', false);
        },
        setPayerNameConfirmModal({ commit }, payerName) {
            commit('SET_CONFIRM_PAYER_NAME', payerName);
        },
    },
    getters: {        
        isCheckoutModalOpen: (state) => state.isModalCheckoutOpen,
        isConfirmModalOpen: (state) => state.isModalConfirmOpen,
        namePayer: (state) => state.payerName,
    },
};

