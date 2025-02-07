<template>
  <div class="wrap-search" :class="[{ 'disabled': isDisabled }]">
    <input type="text" class="input-search" :disabled="isDisabled" v-model="query" @input="onSearchInput" placeholder="Buscar..." />
    <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">     
      <MagnifyingGlassIcon class="w-5 h-5"></MagnifyingGlassIcon>
    </span>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import { MagnifyingGlassIcon  } from '@heroicons/vue/24/outline';

export default {
  name: "MoviesSearch",
  components: {
    MagnifyingGlassIcon
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {     
      query: '',
    };
  },
  mounted() {   
    const savedQuery = this.$store.state.searchMovies.query;
    if (savedQuery) {
      this.query = savedQuery;
      console.log(this.query);
      this.$nextTick(() => {
        this.updateQuery(this.query);
      });
    }
  },  
  computed: {
    isDisabled() {
      return this.disabled;
    }  
  },
  methods: {
    ...mapActions('searchMovies', ['updateQuery']),
    onSearchInput() {
      this.updateQuery(this.query);
    }
  }
};
</script>

<style scoped>

.wrap-search{
  @apply relative flex items-center rounded-full pl-3;
}

.input-search {
  @apply block min-w-0 grow py-2 px-4 pr-10 text-white placeholder:text-gray-400 bg-transparent border border-gray-300 focus:border-purple-500 focus:ring-0 focus:outline-none sm:text-sm rounded-full;
}

.input-search:disabled {
  background-color: #f0f0f0;
  opacity: 0.5;
  cursor: not-allowed;
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
