<template>
  <div class="relative">
    <transition name="slide">
      <div v-if="isOpen" class="absolute top-full right-0 w-full max-w-full bg-gray-800 shadow-lg p-6
        flex flex-col md:flex-row z-50 text-white pt-[55px] overflow-y-auto" :style="{ height: modalHeight }">
        <button @click="closeModal" class="absolute top-4 right-4 text-white text-2xl">
          <XMarkIcon class="w-10 h-10"></XMarkIcon>
        </button>
        <CheckoutForm ref="checkoutForm"></CheckoutForm>
        <div class="w-full md:w-1/2 mt-6 md:mt-0" :class="{ 'pl-4': !isMobile }">
          <div class="max-w-2xl mx-auto mt-[63px] pb-[90px]">
            <ul class="space-y-3">
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <span class="w-1/2 text-left pl-[36px]">Nome</span>
                <span class="w-1/4 text-center">Qtde</span>
                <span class="w-1/4 text-center">Preço</span>
                <span class="w-[40px]"></span>
              </li>
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
                <div class="flex items-center justify-center w-[40px]">
                  <div class="relative group mx-4">
                    <TrashIcon @click="removeMovieCart(movie.id)"
                      class="w-6 h-6 text-gray-400 cursor-pointer group-hover:text-red-400 transition-colors" />
                    <div id="tooltip-remove-favorite" role="tooltip"
                      class="absolute invisible group-hover:visible inline-block px-2 py-1 mt-2 text-xs font-medium text-white bg-gray-700 rounded-lg shadow-xs opacity-0 group-hover:opacity-100 transition-opacity tooltip bg-gray-700 top-full left-1/2 transform -translate-x-1/2 z-50 whitespace-nowrap">
                      Remover
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div v-if="listMoviesCart.length === 0" class="p-4 mt-4 text-center text-sm text-gray-400">
              Carrinho vazio
            </div>
            <div class="mt-4 text-lg font-bold flex justify-between">
              <span>Total:</span>
              <span>{{ formatToCurrency(sumCart) }}</span>
            </div>
            <button @click="submitForm" :disabled="listMoviesCart.length === 0" :class="{ 'mb-[100px]': isMobile }"
              class="bg-green-500 hover:bg-green-600 text-white mt-4 p-3 w-full rounded-lg mt-[37px] disabled:opacity-50 disabled:cursor-not-allowed">
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </transition>
    <ConfirmModal></ConfirmModal>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import { getMovieTitleById } from '@/service/movieService';
import { convertTmdbToPrice, formatToCurrency } from '@/lib/utils';
import { TrashIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import CheckoutForm from '@/components/form/CheckoutForm.vue';
import ConfirmModal from './ConfirmModal.vue';

export default {
  components: {
    CheckoutForm,
    TrashIcon,
    XMarkIcon,
    ConfirmModal
  },
  props: {
    isOpen: Boolean,
    sticky: Boolean,
  },
  data() {
    return {
      modalHeight: "calc(100vh - 90px)",
      listMoviesCart: [],
      posterUrl: process.env.VUE_APP_IMAGE_TMDB_URL,
      sumCart: 0,
      isMobile: window.innerWidth < 768,
    }
  },
  computed: {
    ...mapGetters('cart', ['getCart']),
    ...mapGetters('checkout', ['isCheckoutModalOpen']),
  },
  watch: {
    sticky(newVal) {
      this.updateModalHeight(newVal);
    },
    isOpen(newVal) {
      if (newVal) {
        this.showCart();
      }
    },
    getCart() {
      this.showCart();
    }
  },
  methods: {
    submitForm() {
      this.$refs.checkoutForm.handleSubmit();
    },
    formatToCurrency,
    ...mapActions('cart', ['addCart', 'removeCart', 'clearCart', 'closeCartModal']),
    ...mapActions('checkout', ['closeCheckoutModal']),
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
    updateModalHeight(newVal) {
      const headerHeight = newVal ? 60 : 90;
      this.modalHeight = `calc(100vh - ${headerHeight}px)`;
      this.layerTop = headerHeight;
    },
    removeMovieCart(movieid) {
      this.removeCart(movieid);
      this.showCart();
    },
    closeModal() {
      this.closeCheckoutModal();
    },
  },
  mounted() {
    this.updateModalHeight();
    window.addEventListener("resize", this.updateModalHeight);
    if (this.isCheckoutModalOpen) {
      this.showCart();
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateModalHeight);
  },
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
