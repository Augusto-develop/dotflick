<template>
    <div>
        <div @click="toggleFavorites" class="modalfavorite group relative w-10 h-10 flex items-center justify-center cursor-pointer">
            <div class="absolute inset-0 bg-white bg-opacity-20 rounded-full opacity-0 
               group-hover:opacity-100 group-hover:scale-110 p-3 group-hover:p-4 
               transition-all duration-300 ease-in-out 
               group-hover:shadow-[0_4px_12px_rgba(255,255,255,0.2)]">
            </div>   
            <HeartIconOutline v-if="!favoritesStatus" class="w-6 h-6 text-yellow-500 z-10" />
            <HeartIconSolid v-if="favoritesStatus" class="w-6 h-6 text-yellow-600 z-10" />
        </div>
    </div>
</template>

<script>

import { HeartIcon as HeartIconOutline } from '@heroicons/vue/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid';

export default {
    name: "FavoriteToogle",
    components: {
        HeartIconOutline,
        HeartIconSolid
    },
    props: {
        favoritesStatus: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        toggleFavorites() {
            this.$emit('open-favorites', !this.favoritesStatus);
        }
    }
};
</script>

<style scoped></style>