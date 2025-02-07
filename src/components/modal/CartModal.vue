<template>
  <div class="relative">
    <div v-if="isOpen" class="fixed left-0 w-full h-full bg-black/50 z-40" @click.self="closeModal"
      :style="{ top: layerTop }"></div>
    <transition name="slide">
      <div v-if="isOpen" :class="{ 'overflow-y-auto': isMobile }"
        class="absolute top-full right-0 w-[500px] max-w-full bg-gray-800 shadow-lg flex flex-col z-50 text-white"
        :style="{ height: modalHeight }">
        <div class="flex justify-between items-center p-4">
          <h2 class="text-lg font-bold">Meu Carrinho</h2>
          <button @click="removeAllCart" class="text-red-400 text-sm hover:text-red-600 focus:outline-none">
            Esvaziar
          </button>
        </div>
        <div class="lg:flex-1 overflow-y-auto">
          <div v-if="listMoviesCart.length === 0" class="p-4 mt-4 text-center text-sm text-gray-400">
            Carrinho vazio
          </div>
          <ul class="list-none p-4">
            <li v-for="(movie, index) in listMoviesCart" :key="index"
              class="flex items-center mb-2 border-b border-gray-600 pb-2">
              <span class="w-1/2 flex items-center overflow-hidden truncate">
                <img :src="movie.miniature" :alt="movie.title" class="poster mr-2" width="30px" height="45px" />
                <span class="truncate" :title="movie.title">{{ movie.title }}</span>
              </span>
              <span class="w-1/4 text-center">
                {{ movie.qtde }}
              </span>
              <span class="w-1/4 text-center">
                {{ movie.price }}
              </span>
              <div class="flex items-center justify-center w-auto">
                <div class="relative group mx-4">
                  <TrashIcon @click="removeMovieCart(movie.id)"
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
        <div class="p-4">
          <div class="flex justify-between font-bold text-lg">
            <span class="text-xs">Total:</span>
            <span>{{ formatToCurrency(sumCart) }}</span>
          </div>
          <button @click="handleOpenCheckoutModal" :disabled="listMoviesCart.length === 0"
            class="w-full mt-3 bg-green-600 text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
            Finalizar Compra
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getMovieTitleById } from '@/service/movieService';
import { convertTmdbToPrice, formatToCurrency } from '@/lib/utils';
import { TrashIcon } from '@heroicons/vue/24/outline';

export default {
  name: "CartModal",
  components: {
    TrashIcon
  },
  props: {
    isOpen: Boolean,
    sticky: Boolean,
  },
  data() {
    return {
      modalHeight: "calc(100vh - 90px)",
      layerTop: "90",
      listMoviesCart: [],
      posterUrl: process.env.VUE_APP_IMAGE_TMDB_URL,
      sumCart: 0,
      isMobile: window.innerWidth < 768,
    };
  },
  computed: {
    ...mapGetters('cart', ['getCart', 'isCartModalOpen']),
  },
  watch: {
    sticky(newVal) {
      this.updateModalHeight(newVal);
    },
    isOpen(newVal) {
      if (newVal) {
        this.showCart();
      }
    }
  },
  methods: {   
    formatToCurrency,
    ...mapActions('cart', ['addCart', 'removeCart', 'clearCart', 'closeCartModal']),
    ...mapActions('checkout', ['openCheckoutModal']),
    async showCart() {
      this.sumCart = 0;
      const savedMoviesCart = this.$store.state.cart.movies;
      if (savedMoviesCart) {
        const countMovies = savedMoviesCart.reduce((acc, movieId) => {
          acc[movieId] = (acc[movieId] || 0) + 1;
          return acc;
        }, {});

        this.listMoviesCart = (await Promise.all(
          Object.keys(countMovies).map(async key => {
            try {
              const movie = await getMovieTitleById(key);
              if (movie && movie.id) {

                const price = convertTmdbToPrice(movie.vote_average);
                this.sumCart += parseFloat(price);

                return {
                  id: movie.id,
                  title: movie.title,
                  qtde: countMovies[key],
                  price: formatToCurrency(price),
                  miniature: this.posterUrl + movie.poster_path,
                };
              }
              return null;
            } catch (error) {
              console.error(`Erro ao buscar filme com ID ${key}:`, error);
              return null;
            }
          })
        )).filter(Boolean);
      }
    },
    removeMovieCart(movieid) {
      this.removeCart(movieid);
      this.showCart();
    },
    removeAllCart() {
      this.clearCart();
      this.showCart();
    },
    closeModal() {
      this.closeCartModal();
    },
    updateModalHeight(newVal) {
      const headerHeight = newVal ? 60 : 90;
      // Verifique se o dispositivo é móvel
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // Em dispositivos móveis, você pode definir uma altura mínima ou um valor fixo
        // ou ajustar com base no conteúdo
        this.modalHeight = `calc(100vh - ${headerHeight + 50}px)`; // 50px para o botão
        this.layerTop = headerHeight + 10; // Ajuste do topo para dispositivos móveis
      } else {
        // Em telas maiores, calcula a altura normalmente
        this.modalHeight = `calc(100vh - ${headerHeight}px)`;
        this.layerTop = headerHeight;
      }
    },
    handleOpenCheckoutModal() {
      this.closeModal();
      this.openCheckoutModal();
    }
  },
  mounted() {
    this.updateModalHeight();
    window.addEventListener("resize", this.updateModalHeight);
    if (this.isCartModalOpen) {
      this.showCart();
    }
  },
  created() {
    window.addEventListener('resize', this.updateModalHeight);
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
