<template>
  <div class="relative">
    <div v-if="isOpen" class="fixed left-0 w-full h-full bg-black/50 z-40" @click.self="$emit('close')"
      :style="{ top: layerTop }"></div>
    <transition name="slide">
      <div v-if="isOpen" class="absolute top-full right-0 w-[500px] max-w-full bg-white shadow-lg p-4
         flex flex-col overflow-y-auto z-50" :style="{ height: modalHeight }">
        <div class="flex justify-between items-center border-b pb-2">
          <h2 class="text-lg font-bold">Meus Favoritos</h2>
          <button @click="emptyCart" class="text-red-500 text-sm">Esvaziar</button>
        </div>
        <div class="flex-1 overflow-y-auto mt-4">


          <ul class="list-none">
            <li v-for="(movie, index) in listMoviesFavorite" :key="index" class="flex items-center mb-2 border-b pb-2">
              <!-- Movie details -->
              <span class="w-1/2 flex items-center overflow-hidden truncate">
                <img :src="movie.miniature" :alt="movie.title" class="poster mr-2" width="30px" height="45px" />
                <span class="truncate" :title="movie.title">{{ movie.title }}</span>
              </span>

              <span class="w-1/4 text-center">
                R$ {{ movie.preco }}
              </span>

              <!-- Icon Section -->
              <div class="flex items-center justify-center w-1/4">
                <!-- Add to Cart Icon -->
                <div class="relative group flex justify-center items-center">
                  <ShoppingCartIcon class="w-6 h-6 text-green-500 cursor-pointer" />

                  <!-- Tooltip -->
                  <div id="tooltip-add-to-cart" role="tooltip" class="absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-xs 
      opacity-0 transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap 
      top-full mt-2 left-1/2 transform -translate-x-1/2">
                    Adicionar ao Carrinho
                  </div>
                </div>
              </div>



              <div class="flex items-center justify-center w-1/4">
                <!-- Add to Cart Icon -->
                <div class="relative group flex justify-center items-center">
                  <TrashIcon @click="removeMovieFavorite(movie.id)" class="w-6 h-6 text-red-500 cursor-pointer" />
                  <!-- Tooltip for Remove from Favorites -->
                  <div id="tooltip-remove-favorite" role="tooltip"
                    class="absolute invisible group-hover:visible inline-block px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-xs opacity-0 group-hover:opacity-100 transition-opacity tooltip dark:bg-gray-700 top-full left-1/2 transform -translate-x-1/2 z-50 whitespace-nowrap max-w-xs overflow-hidden">
                    Remover dos Favoritos
                    <div class="tooltip-arrow" data-popper-arrow></div>
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
import { TrashIcon, ShoppingCartIcon } from '@heroicons/vue/24/solid';



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
      posterUrl: "https://image.tmdb.org/t/p/w500"
    };
  },
  computed: {
    ...mapGetters('favorites', ['getFavorites']),
  },
  watch: {
    sticky(newVal) {
      this.updateModalHeight(newVal);
    },
    isOpen(newVal) {
      if (newVal) {
        this.showFavorites();
        document.body.classList.add('no-scroll'); // Impede rolagem
      } else {
        document.body.classList.remove('no-scroll'); // Restaura rolagem
      }
    }
  },
  mounted() {
    this.updateModalHeight();
    window.addEventListener("resize", this.updateModalHeight);
  },
  beforeUnmount() {
    document.body.classList.remove('no-scroll');
    window.removeEventListener("resize", this.updateModalHeight);
  },
  methods: {
    ...mapActions('favorites', ['addFavorite', 'removeFavorite']),
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
                  preco: '19,99',
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
    emptyCart() {
      alert("Carrinho esvaziado!");
    },
    updateModalHeight(newVal) {
      // const header = document.querySelector(".header-wrap");
      const headerHeight = newVal ? 60 : 90;
      this.modalHeight = `calc(100vh - ${headerHeight}px)`;
      this.layerTop = headerHeight;
    },
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
