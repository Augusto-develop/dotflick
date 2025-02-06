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
        </div>
    </div>
</template>

<script>
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
    methods: {
        toggleCart() {
            this.$emit('open-cart', !this.cartStatus);
        }
    }
}
</script>

<style scoped></style>