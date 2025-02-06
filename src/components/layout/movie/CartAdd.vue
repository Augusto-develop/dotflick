<template>
  <button class="button-add" @click="addMovieCart()">Adicionar</button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "CartAdd",
  props: {
    movie: Object
  },
  components: {
    
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters('cart', ['getCart']),
  },
  methods: {
    ...mapActions('cart', ['addCart', 'removeCart']),
    isCart() {
      const savedCart = this.$store.state.cart.movies;
      if (savedCart) {
        return savedCart.includes(this.movie.id);
      }
    },
    addMovieCart() {
      // if (this.isCart()) {
      //   this.removeCart(this.movie.id);
      // } else {
        this.addCart(this.movie.id);
      // }
    },
  }
};
</script>

<style scoped>
.button-add {
  @apply bg-white bg-opacity-30 text-white hover:bg-white hover:text-black transition-all duration-300 w-[80%] mx-auto rounded-lg px-4 py-2 border-none;
}
</style>
