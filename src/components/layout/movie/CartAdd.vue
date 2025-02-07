<template>
  <button @click="addToCart" :class="[
    'button-add',
    isCart() ? 'bg-green-500 w-16' : 'bg-gray-500 w-[80%]', // Modificando a largura do botão
  ]"
    class="relative mx-auto rounded-lg text-white transition-all duration-300 ease-in-out active:scale-90 focus:ring-0 focus:outline-none overflow-hidden px-4 py-2 border-none hover:bg-white hover:text-black bg-opacity-30">
    <template v-if="isCart()">
      <ShoppingCartIcon class="w-5 h-5 inline-block" />
    </template>
    <template v-else>
      Adicionar
    </template>
    <span v-if="clickEffect" class="absolute bg-green-400 rounded-full opacity-75 animate-ping"
      :style="clickEffectStyle"></span>
  </button>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import { ShoppingCartIcon } from '@heroicons/vue/24/solid';

export default {
  name: "CartAdd",  
  components: {
    ShoppingCartIcon
  },
  props: {
    movie: Object,
  },
  data() {
    return {
      addedToCart: false,
      clickEffect: false,
    };
  },
  computed: {
    ...mapGetters('cart', ['getCart']),
  },
  methods: {
    ...mapActions('cart', ['addCart', 'openCartModal']),
    isCart() {
      const savedCart = this.$store.state.cart.movies;
      if (savedCart) {
        return savedCart.includes(this.movie.id);
      }
      return false;
    },
    addToCart(event) {
      if (this.isCart()) {
        this.openCartModal();
      } else {
        this.addCart(this.movie.id);
        this.triggerClickEffect(event);
      }
    },
    triggerClickEffect(event) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      this.clickEffectStyle = {
        width: `${size}px`,
        height: `${size}px`,
        left: `${event.clientX - rect.left - size / 2}px`,
        top: `${event.clientY - rect.top - size / 2}px`,
      };

      this.clickEffect = true;
      setTimeout(() => (this.clickEffect = false), 500);
    },
  }
};
</script>



<style scoped>
.button-add {
  /* @apply bg-white bg-opacity-30 text-white hover:bg-white hover:text-black transition-all duration-300 mx-auto rounded-lg px-4 py-2 border-none; */
}
</style>
