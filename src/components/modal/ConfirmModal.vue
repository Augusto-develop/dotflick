<template>
    <div class="relative">
        <div v-if="isConfirmModalOpen"
            class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-8">
            <div class="bg-white dark:bg-gray-800 p-10 rounded-lg shadow-xl max-w-md w-full">
                <div class="flex flex-col items-center text-center">
                    <CheckCircleIcon class="w-24 h-24 text-green-500 dark:text-green-400 mb-4" />
                    <h2 class="text-2xl font-semibold text-green-600 dark:text-green-400">
                        <span class="text-white">Obrigado </span>{{ namePayer }}<span class="text-white">!</span>
                    </h2>
                    <p class="text-gray-600 dark:text-gray-300 mt-2">Sua compra foi finalizada com sucesso!</p>
                </div>
                <div class="mt-8 text-center">
                    <button @click="closeModal"
                        class="bg-green-500 dark:bg-green-600 text-white p-3 rounded-md w-full hover:bg-green-600 dark:hover:bg-green-500">
                        Ir para loja
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import { CheckCircleIcon } from '@heroicons/vue/24/outline';

export default {
    components: {
        CheckCircleIcon,
    },
    props: {

    },
    computed: {
        ...mapGetters('checkout', ['isConfirmModalOpen', 'namePayer']),
    },
    methods: {
        ...mapActions('checkout', ['closeCheckoutModal', 'closeConfirmModal']),
        closeModal() {
            this.closeCheckoutModal();
            this.closeConfirmModal();
        }
    }
};
</script>

<style scoped></style>