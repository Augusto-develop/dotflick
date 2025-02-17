<template>
  <div class="movie-list-container p-4">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div v-for="(movie, index) in movies" :key="index" class="movie-item group relative">
        <img :src="posterUrl + movie.poster_path" :alt="movie.title" class="poster" />
        <FavoritesAdd :movie="movie"></FavoritesAdd>
        <div v-if="movie"
          class="layer-movie-info absolute bottom-0 left-0  w-full bg-black bg-opacity-75 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
          <div
            class="font-bold w-full bg-gray-700 bg-opacity-80 mb-2.5 text-yellow-500  text-xs sm:text-xs md:text-sm lg:text-base">
            {{ formatDateRelease(movie.release_date) }}
          </div>
          <div class="font-bold text-xs sm:text-xs md:text-sm lg:text-base">
            {{ movie.title }}
          </div>
          <div class="flex items-center mt-1">
            <StarIcon class="w-5 h-5 text-yellow-400" />
            <span class="ml-2 text-xs sm:text-xs md:text-sm lg:text-base">
              {{ formattedVoteAverage(movie) }}
            </span>
          </div>
          <div class="mt-1 text-xs sm:text-xs md:text-sm lg:text-base text-center">
            <span v-for="(genre, idx) in movie.genres" :key="idx" class="mr-1">
              {{ genre.name }}
              <span v-if="idx < movie.genres.length - 1">, </span>
            </span>
          </div>
          <div class="mt-1 text-xs sm:text-xs md:text-sm lg:text-base">{{ formatPrice(movie) }}</div>
          <div class="mt-2 w-full text-center py-2">
            <CartAdd :movie="movie"></CartAdd>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="text-center py-4">
      <p>Carregando...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { StarIcon } from '@heroicons/vue/24/solid';
import { handleFetchMovies } from "@/service/movieService";
import FavoritesAdd from "@/components/layout/movie/FavoritesAdd.vue";
import CartAdd from "@/components/layout/movie/CartAdd.vue";
import { formatDate, convertTmdbToPrice, formatToCurrency } from '@/lib/utils';

export default {
  name: "HomePage",
  components: {
    StarIcon,
    FavoritesAdd,
    CartAdd,
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
      isLoading: false,
      hasMore: true,
      posterUrl: "https://image.tmdb.org/t/p/w500"
    };
  },
  mounted() {
    this.fetchMovies();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    ...mapGetters('searchMovies', ['getQuery']),
  },
  watch: {
    getQuery(newQuery) {
      this.currentPage = 1;
      this.hasMore = true;
      this.fetchMovies(newQuery);
    },
  },
  methods: {
    async fetchMovies() {
      const query = this.getQuery || '';
      if (this.isLoading || !this.hasMore) return;
      this.isLoading = true;
      try {
        const data = await handleFetchMovies(query, this.currentPage);
        if (data.results.length > 0) {
          if (this.currentPage === 1) {
            this.movies = data.results;
          } else {
            this.movies.push(...data.results);
          }
          this.currentPage++;
        } else {
          this.hasMore = false;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    handleScroll() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.offsetHeight;
      if (scrollPosition >= documentHeight - 100) {
        this.fetchMovies();
      }
    },
    formattedVoteAverage(movie) {
      return typeof movie.vote_average === 'number'
        ? movie.vote_average.toFixed(1)
        : '0.0';
    },
    formatDateRelease(data) {
      return formatDate(data);
    },
    formatPrice(movie) {
      return formatToCurrency(convertTmdbToPrice(movie.vote_average));
    }
  }
};
</script>

<style scoped>
.movie-list {
  @apply w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4;
}

.movie-item {
  @apply relative rounded-lg overflow-hidden bg-gray-800;
}

.movie-item .button-favorite {
  @apply cursor-pointer rounded-full bg-white bg-opacity-30 text-white hover:bg-white hover:text-black transition-all duration-300;
}

.movie-item img {
  transition: transform 0.3s ease-in-out;
}

.movie-item:hover img {
  transform: scale(1.1);
  /* Zoom na imagem */
}

.movie-item .absolute.top-2.right-2 {
  transition: all 0.3s ease-in-out;
}

.movie-item .absolute.top-2.right-2:hover .heart-icon {
  fill: black;
}

.movie-item .absolute.top-2.right-2 .heart-icon {
  fill: white;
}

/* Descrição do filme */
.movie-item .absolute.bottom-0.left-0 {
  transition: opacity 0.3s ease-in-out;
}

.movie-item:hover .absolute.bottom-0.left-0 {
  opacity: 1;
  /* Faz a descrição aparecer ao passar o mouse */
}



.movie-item .poster {
  @apply w-full h-full object-cover transition-all duration-300 group-hover:scale-110
}

.movie-item .layer-movie-info {
  font-family: "Montserrat", sans-serif;
}
</style>
