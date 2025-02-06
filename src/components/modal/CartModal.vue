<template>
  <div class="relative">
    <div v-if="isOpen" class="fixed left-0 w-full h-full bg-black/50 z-40" @click.self="$emit('close')"
      :style="{ top: layerTop }"></div>
    <transition name="slide">
      <div v-if="isOpen" class="absolute top-full right-0 w-[500px] max-w-full bg-white shadow-lg p-4
         flex flex-col overflow-y-auto z-50" :style="{ height: modalHeight }">

        <div class="flex justify-between items-center border-b pb-2">
          <h2 class="text-lg font-bold">Meu Carrinho</h2>
          <button @click="emptyCart" class="text-red-500 text-sm">Esvaziar</button>
        </div>

        <div class="flex-1 overflow-y-auto mt-4">
          <ul class="list-none">
            <li v-for="(movie, index) in listMoviesCart" :key="index" class="flex items-center mb-2 border-b pb-2">
              <!-- Coluna com a miniatura e o título do filme -->
              <span class="w-1/2 flex items-center overflow-hidden truncate">
                <img :src="movie.miniature" :alt="movie.title" class="poster mr-2" width="30px" height="45px" />
                <span class="truncate" :title="movie.title">{{ movie.title }}</span> <!-- Adicionado o title -->
              </span>

              <!-- Coluna de Quantidade -->
              <span class="w-1/4 text-center">
                {{ movie.qtde }}
              </span>

              <!-- Coluna de Preço -->
              <span class="w-1/4 text-center">
                R$ {{ movie.preco }}
              </span>

              <!-- Botão de remoção -->
              <button @click="removeMovieCart(movie.id)" class="text-red-500 text-sm w-1/4 text-center">🗑️</button>
            </li>
          </ul>
        </div>

        <div class="border-t pt-3">
          <div class="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>R$ 19,90</span>
          </div>
          <button class="w-full mt-3 bg-green-600 text-white py-2 rounded-lg">Finalizar Compra</button>
        </div>

        <!-- <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-500 text-lg">✖</button> -->
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getMovieTitleById } from '@/service/movieService';

export default {
  name: "CartModal",
  props: {
    isOpen: Boolean,
    sticky: Boolean,
  },
  data() {
    return {
      modalHeight: "calc(100vh - 90px)",
      layerTop: "90",
      listMoviesCart: [],
      posterUrl: "https://image.tmdb.org/t/p/w500"
    };
  },
  computed: {
    ...mapGetters('cart', ['getCart']),
  },
  watch: {
    sticky(newVal) {
      this.updateModalHeight(newVal);
    },
    isOpen(newVal) {
      if (newVal) {
        this.showCart();
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
    ...mapActions('cart', ['addCart', 'removeCart']),
    async showCart() {
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
                return {
                  id: movie.id,
                  title: movie.title,
                  qtde: countMovies[key],
                  preco: '19,99',
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
