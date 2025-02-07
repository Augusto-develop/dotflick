<template>
    <div>
        <div @click="toggleCart" class="group relative w-10 h-10 flex items-center justify-center cursor-pointer">
            <div class="absolute inset-0 bg-white bg-opacity-20 rounded-full opacity-0 
               group-hover:opacity-100 group-hover:scale-110 p-3 group-hover:p-4 
               transition-all duration-300 ease-in-out 
               group-hover:shadow-[0_4px_12px_rgba(255,255,255,0.2)]">
            </div>
            <ShoppingCartIconOutline v-if="!cartStatus" class="w-6 h-6 text-green-500 z-10" />
            <ShoppingCartIconSolid v-if="cartStatus" class="w-6 h-6 text-green-600 z-10" />            
            <span v-if="getQtdeCart() > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold 
                   rounded-full h-5 w-5 flex items-center justify-center z-20">
                {{ getQtdeCart() }}
            </span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ShoppingCartIcon as ShoppingCartIconOutline } from '@heroicons/vue/24/outline'
import { ShoppingCartIcon as ShoppingCartIconSolid } from '@heroicons/vue/24/solid'

export default {
    name: "CartToogle",
    components: {
        ShoppingCartIconOutline,
        ShoppingCartIconSolid,
    },
    props: {
        cartStatus: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
                   
        };
    },
    computed: {
        ...mapGetters('cart', ['getCart']),
    },
    methods: {
        toggleCart() {
            this.$emit('open-cart', !this.cartStatus);
        },
        getQtdeCart() {
            const savedMoviesCart = this.$store.state.cart.movies;
            if (savedMoviesCart) {
                return savedMoviesCart.length;
            }

            return 0;
        }
    }
}
</script>

<style scoped></style>