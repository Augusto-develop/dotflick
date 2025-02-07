<template>
  <div class="relative">
    <transition name="slide">
      <div v-if="isOpen" class="absolute top-full right-0 w-full max-w-full bg-gray-800 shadow-lg p-6
        flex flex-col md:flex-row z-50 text-white" :style="{ height: 'calc(100vh - 90px)' }">

        <CheckoutForm ref="checkoutForm"></CheckoutForm>

        <!-- Lista de Produtos (Lado Direito) -->
        <div class="w-full md:w-1/2 pl-4 mt-6 md:mt-0">
          <div class="max-w-2xl mx-auto">
            <h2 class="text-xl font-bold mb-4">Resumo da Compra</h2>
            <ul class="space-y-3">
              <li class="flex justify-between border-b border-gray-700 pb-2">
                <span>Imagem</span>
                <span>Nome</span>
                <span>Quantidade</span>
                <span>Preço</span>
              </li>
              <!-- <li v-for="(item, index) in cartItems" :key="index" class="flex justify-between">
                <span><img :src="item.image" alt="produto" class="w-10 h-10" /></span>
                <span>{{ item.name }}</span>
                <span>{{ item.quantity }}</span>
                <span>{{ item.price | currency }}</span>
              </li> -->
            </ul>
            <div class="mt-4 text-lg font-bold flex justify-between">
              <span>Total:</span>
              <!-- <span>{{ totalPrice | currency }}</span> -->
            </div>
            <button  @click="submitForm" class="bg-green-500 hover:bg-green-600 text-white mt-4 p-3 w-full rounded-lg">
              Finalizar
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>


import CheckoutForm from '@/components/form/CheckoutForm.vue';

export default {
  components: {
    CheckoutForm
  },
  props: {
    isOpen: Boolean,
    modalHeight: String,
    cartItems: Array,
    totalPrice: Number,
  },  
  methods: {
    submitForm() {      
      this.$refs.checkoutForm.handleSubmit();
    }
  }
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
