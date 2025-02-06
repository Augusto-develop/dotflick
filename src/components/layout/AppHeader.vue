<template>
  <div class="header-wrap" :class="{ active: displayHeader, sticky: sticky }">
    <header class="header transition-padding">
      <div class="wrap flex justify-between items-center px-4">
        <div class="logo h-[40px]">
          <img src="@/assets/img/logo.svg" alt="DotFlick" width="190" height="40" />
        </div>
        <div class="flex-grow flex justify-center">
          <MoviesSearch :disabled="isModalCartOpen || isModalFavoriteOpen"></MoviesSearch>
        </div>
        <div class="flex items-center space-x-4">
          <FavoritesToogle @open-favorites="toogleModalFavorite" :favoritesStatus="isModalFavoriteOpen"></FavoritesToogle>
          <CartToogle @open-cart="toogleModalCart" :cartStatus="isModalCartOpen"></CartToogle>
        </div>
      </div>
    </header>
    <CartModal :isOpen="isModalCartOpen" @close="closeModalCart" :sticky="sticky"></CartModal>
    <FavoritesModal :isOpen="isModalFavoriteOpen" @close="closeModalFavorite" :sticky="sticky"></FavoritesModal>
  </div>
</template>

<script>

import FavoritesToogle from './header/FavoritesToogle.vue'
import CartToogle from './header/CartToogle.vue'
import MoviesSearch from './header/MoviesSearch.vue'
import CartModal from '@/components/modal/CartModal.vue';
import FavoritesModal from '@/components/modal/FavoritesModal.vue';

export default {
  name: "AppHeader",
  components: {
    FavoritesToogle,
    CartToogle,
    MoviesSearch,
    CartModal,
    FavoritesModal
  },
  data() {
    return {
      sticky: false,
      isModalCartOpen: false,
      isModalFavoriteOpen: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.initSticky);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.initSticky);
  },
  methods: {
    initSticky() {
      this.sticky = window.scrollY > 100;
    },
    toogleModalCart() {
      if (!this.isModalCartOpen) {
        this.isModalCartOpen = true;
        this.closeModalFavorite();
      } else {
        this.closeModalCart();
      }
    },
    closeModalCart() {
      this.isModalCartOpen = false;
    },
    toogleModalFavorite() {
      if (!this.isModalFavoriteOpen) {
        this.isModalFavoriteOpen = true;
        this.closeModalCart();
      } else {
        this.closeModalFavorite();
      }
    },
    closeModalFavorite() {
      this.isModalFavoriteOpen = false;
    },
  }
};
</script>

<style scoped></style>
