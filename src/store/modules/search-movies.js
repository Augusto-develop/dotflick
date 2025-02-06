export default {
    namespaced: true,
    state: {
        query: '',
    },
    mutations: {
        setQuery(state, query) {
            state.query = query;
        },
    },
    actions: {
        updateQuery({ commit }, query) {
            commit('setQuery', query);
        },
    },
    getters: {
        getQuery: (state) => state.query,
    },
};