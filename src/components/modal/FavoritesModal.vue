<template>
  <div class="relative">
    <div v-if="isOpen" class="fixed left-0 w-full h-full bg-black/50 z-40" @click.self="closeModal"
      :style="{ top: layerTop }"></div>
    <transition name="slide">
      <div v-if="isOpen" class="absolute top-full right-0 w-[500px] max-w-full bg-gray-800 shadow-lg
         flex flex-col z-50 text-white" :style="{ height: modalHeight }">
        <div class="flex justify-between items-center p-4">
          <h2 class="text-lg font-bold">Meus Favoritos</h2>
          <button @click="removeAllFavorite" class="text-red-400 text-sm hover:text-red-600 focus:outline-none">
            Esvaziar
          </button>
        </div>
        <div class="flex-1 overflow-y-auto">
          <ul class="list-none p-4">
            <li v-for="(movie, index) in listMoviesFavorite" :key="index"
              class="flex items-center mb-2 border-b border-gray-600 pb-2">
              <span class="w-1/2 flex items-center overflow-hidden truncate">
                <img :src="movie.miniature" :alt="movie.title" class="poster mr-2" width="30px" height="45px" />
                <span class="truncate" :title="movie.title">{{ movie.title }}</span>
              </span>
              <span class="w-1/4 text-center">
                {{ movie.price }}
              </span>
              <div class="flex items-center justify-center w-auto">
                <div class="relative group mx-4">
                  <ShoppingCartIcon @click="addFavoriteOnCart(movie.id)"
                    class="w-6 h-6 text-gray-400 cursor-pointer group-hover:text-green-400 transition-colors" />
                  <div id="tooltip-add-to-cart" role="tooltip"
                    class="absolute invisible group-hover:visible inline-block px-2 py-1 mt-2 text-xs font-medium text-white bg-gray-700 rounded-lg shadow-xs opacity-0 group-hover:opacity-100 transition-opacity tooltip dark:bg-gray-700 top-full left-1/2 transform -translate-x-1/2 z-50 whitespace-nowrap">
                    Adicionar ao Carrinho
                  </div>
                </div>
                <div class="relative group mx-4">
                  <TrashIcon @click="removeMovieFavorite(movie.id)"
                    class="w-6 h-6 text-gray-400 cursor-pointer group-hover:text-red-400 transition-colors" />
                  <div id="tooltip-remove-favorite" role="tooltip"
                    class="absolute invisible group-hover:visible inline-block px-2 py-1 mt-2 text-xs font-medium text-white bg-gray-700 rounded-lg shadow-xs opacity-0 group-hover:opacity-100 transition-opacity tooltip dark:bg-gray-700 top-full left-1/2 transform -translate-x-1/2 z-50 whitespace-nowrap">
                    Remover
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getMovieTitleById } from '@/service/movieService';
import { TrashIcon, ShoppingCartIcon } from '@heroicons/vue/24/outline';
import { convertTmdbToPrice, formatToCurrency } from '@/lib/utils';

export default {
  name: "FavoritesModal",
  components: {
    TrashIcon,
    ShoppingCartIcon
  },
  props: {
    isOpen: Boolean,
    sticky: Boolean,
  },
  data() {
    return {
      modalHeight: "calc(100vh - 90px)",
      layerTop: "90",
      listMoviesFavorite: [],
      posterUrl: process.env.VUE_APP_IMAGE_TMDB_URL
    };
  },
  computed: {
    ...mapGetters('favorites', ['getFavorites', 'isFavoritesModalOpen']),
  },
  methods: {
    ...mapActions('favorites', ['addFavorite', 'removeFavorite', 'clearFavorites', 'closeFavoritesModal']),
    ...mapActions('cart', ['addCart']),
    async showFavorites() {
      const savedFavorites = this.$store.state.favorites.movies;
      if (savedFavorites) {

        this.listMoviesFavorite = (await Promise.all(
          Object.keys(savedFavorites).map(async key => {
            try {
              const movie = await getMovieTitleById(savedFavorites[key]);
              if (movie && movie.id) {
                return {
                  id: movie.id,
                  title: movie.title,
                  price: formatToCurrency(convertTmdbToPrice(movie.vote_average)),
                  miniature: this.posterUrl + movie.poster_path,
                };
              }
              return null;
            } catch (error) {
              console.error(`Erro ao buscar filme com ID ${savedFavorites[key]}:`, error);
              return null;
            }
          })
        )).filter(Boolean);
      }
    },
    removeMovieFavorite(movieid) {
      this.removeFavorite(movieid);
      this.showFavorites();
    },
    removeAllFavorite() {
      this.clearFavorites();
      this.showFavorites();
    },
    addFavoriteOnCart(movieid) {
      this.addCart(movieid);
      this.removeMovieFavorite(movieid);
    },
    updateModalHeight(newVal) {
      // const header = document.querySelector(".header-wrap");
      const headerHeight = newVal ? 60 : 90;
      this.modalHeight = `calc(100vh - ${headerHeight}px)`;
      this.layerTop = headerHeight;
    },
    closeModal() {
      this.closeFavoritesModal();
    },
  },
  watch: {
    sticky(newVal) {
      this.updateModalHeight(newVal);
    },
    isOpen(newVal) {
      if (newVal) {
        this.showFavorites();
      }
    }
  },
  mounted() {
    this.updateModalHeight();
    window.addEventListener("resize", this.updateModalHeight);
    if (this.isFavoritesModalOpen) {
      this.showFavorites();
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateModalHeight);
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.poster {
  object-fit: cover;
}
</style>
