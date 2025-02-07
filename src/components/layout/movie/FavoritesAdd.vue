<template>
  <div class="group absolute top-2 right-2 p-2 cursor-pointer rounded-full text-white hover:bg-white hover:text-black 
    transition-all duration-300" @click="toggleFavorite()">
    <HeartIcon class="w-6 h-6 cursor-pointer"
      :class="{ 'text-yellow-500': isFavorite(), 'text-gray-500': !isFavorite() }" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { HeartIcon } from '@heroicons/vue/24/solid';

export default {
  name: "FavoriteAdd", 
  components: {
    HeartIcon
  },
  props: {
    movie: Object
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters('favorites', ['getFavorites']),
  },
  methods: {
    ...mapActions('favorites', ['addFavorite', 'removeFavorite']),
    isFavorite() {
      const savedFavorites = this.$store.state.favorites.movies;
      if (savedFavorites) {
        return savedFavorites.includes(this.movie.id);
      }
    },
    toggleFavorite() {
      if (this.isFavorite()) {
        this.removeFavorite(this.movie.id);
      } else {
        this.addFavorite(this.movie.id);
      }
    },
  }
};
</script>

<style scoped></style>
