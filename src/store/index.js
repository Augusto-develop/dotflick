import { createStore } from 'vuex';
import searchMovies from '@/store/modules/search-movies';
import favorites from '@/store/modules/favorites';
import cart from '@/store/modules/cart';
import checkout from '@/store/modules/checkout';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  modules: {
    searchMovies,
    favorites,
    cart,
    checkout
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
    }),
  ],
});
