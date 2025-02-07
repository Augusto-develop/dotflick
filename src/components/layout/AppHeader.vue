<template>
  <div class="header-wrap" :class="{ active: displayHeader, sticky: sticky }">
    <header class="header transition-padding">
      <div class="wrap flex justify-between items-center px-4">
        <div class="logo h-[40px]">
          <img v-if="isMobile" src="@/assets/img/logo-mini.svg" alt="DotFlick" width="190" height="40" />
          <img v-else src="@/assets/img/logo.svg" alt="DotFlick" width="50" height="40" />
        </div>
        <div class="flex-grow flex justify-center">
          <MoviesSearch :disabled="isAnyModalOpen"></MoviesSearch>
        </div>
        <div class="flex items-center space-x-4">
          <FavoritesToogle @open-favorites="toogleModalFavorite" :favoritesStatus="isFavoritesModalOpen">
          </FavoritesToogle>
          <CartToogle @open-cart="toogleModalCart" :cartStatus="isCartModalOpen"></CartToogle>
        </div>
      </div>
    </header>
    <CartModal :isOpen="isCartModalOpen" :sticky="sticky"></CartModal>
    <FavoritesModal :isOpen="isFavoritesModalOpen" :sticky="sticky"></FavoritesModal>
    <CheckoutModal :isOpen="isCheckoutModalOpen" :sticky="sticky"></CheckoutModal>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import FavoritesToogle from './header/FavoritesToogle.vue'
import CartToogle from './header/CartToogle.vue'
import MoviesSearch from './header/MoviesSearch.vue'
import CartModal from '@/components/modal/CartModal.vue';
import FavoritesModal from '@/components/modal/FavoritesModal.vue';
import CheckoutModal from '@/components/modal/CheckoutModal.vue';

export default {
  name: "AppHeader",
  components: {
    FavoritesToogle,
    CartToogle,
    MoviesSearch,
    CartModal,
    FavoritesModal,
    CheckoutModal
  },
  data() {
    return {
      sticky: false,
      isMobile: window.innerWidth < 768,
    };
  },
  computed: {
    ...mapGetters('cart', ['isCartModalOpen']),
    ...mapGetters('favorites', ['isFavoritesModalOpen']),
    ...mapGetters('checkout', ['isCheckoutModalOpen']),
    isAnyModalOpen() {
      return this.isCartModalOpen || this.isFavoritesModalOpen || this.isCheckoutModalOpen;
    }
  },
  methods: {
    ...mapActions('cart', ['openCartModal', 'closeCartModal']),
    ...mapActions('favorites', ['openFavoritesModal', 'closeFavoritesModal']),
    ...mapActions('checkout', ['closeCheckoutModal']),

    handleModalChange() {
      if (this.isAnyModalOpen) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    },
    initSticky() {
      this.sticky = window.scrollY > 100;
    },
    toogleModalCart() {
      if (!this.isCartModalOpen) {
        this.openCartModal();
        this.closeFavoritesModal();
        this.closeCheckoutModal();
      } else {
        this.closeCartModal();
      }
    },
    toogleModalFavorite() {
      if (!this.isFavoritesModalOpen) {
        this.openFavoritesModal();
        this.closeCartModal();
        this.closeCheckoutModal();
      } else {
        this.closeFavoritesModal();
      }
    },
  },
  watch: {
    isCartModalOpen() {
      this.handleModalChange();
    },
    isFavoritesModalOpen() {
      this.handleModalChange();
    },
    isCheckoutModalOpen() {
      this.handleModalChange();
    }
  },
  mounted() {
    window.addEventListener("scroll", this.initSticky);
    this.handleModalChange();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.initSticky);
  },

};
</script>

<style scoped></style>
