import { createStore } from 'vuex';
import searchMovies from '@/store/modules/search-movies';
import favorites from '@/store/modules/favorites';
import cart from '@/store/modules/cart';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    searchMovies,
    favorites,
    cart
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    }),
  ],
});
