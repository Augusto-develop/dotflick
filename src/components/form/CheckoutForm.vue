<template>
    <div class="w-full md:w-1/2 text-left" :class="{ 'pr-4': !isMobile }">
        <div class="max-w-xl mx-auto">
            <h2 class="text-3xl font-bold mb-6 text-left">Finalizar Compra</h2>
            <form class="w-full" ref="checkoutForm" @submit.prevent="handleSubmit">
                <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-1">
                    <div class="sm:col-span-1">
                        <label for="nome" class="block text-sm font-medium text-gray-900 text-white">Nome
                            Completo</label>
                        <div class="mt-2">
                            <input id="nome" name="nome" type="text" v-model="form.nome" placeholder=" " maxlength="100"
                                :class="{ 'border-red-300': v$.nome.$error }"
                                class="block w-full rounded-md  bg-gray-800 px-3 py-1.5 text-base text-gray-900 text-white outline-none focus:outline-none focus:ring-0 focus:border-purple-500 focus:border-purple-500 placeholder:text-gray-400 placeholder-gray-500">
                        </div>
                        <span v-if="v$.nome.$error" class="text-red-500 text-sm mt-2 block">
                            <span v-if="!v$.nome.$model">O nome é obrigatório.</span>
                        </span>
                    </div>
                </div>
                <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                    <div class="sm:col-span-1">
                        <label for="cpf" class="block text-sm font-medium text-gray-900 text-white">CPF</label>
                        <div class="mt-2">
                            <input id="cpf" name="cpf" type="text" v-model="form.cpf" placeholder=" "
                                v-mask="'###.###.###-##'" :class="{ 'border-red-300': v$.cpf.$error }"
                                class="block w-full rounded-md  bg-gray-800 px-3 py-1.5 text-base text-gray-900 text-white outline-none focus:outline-none focus:ring-0 focus:border-purple-500 focus:border-purple-500 placeholder:text-gray-400 placeholder-gray-500">
                        </div>
                        <span v-if="v$.cpf.$error" class="text-red-500 text-sm mt-2 block">
                            <span v-if="!v$.cpf.$model">O CPF é obrigatório.</span>
                            <span v-else>O CPF é inválido.</span>
                        </span>
                    </div>
                    <div class="sm:col-span-1">
                        <label for="celular" class="block text-sm font-medium text-gray-900 text-white">Celular</label>
                        <div class="mt-2">
                            <input id="celular" name="celular" type="text" v-model="form.celular" placeholder=" "
                                v-mask="'(##) #####-####'" :class="{ 'border-red-300': v$.celular.$error }"
                                class="block w-full rounded-md  bg-gray-800 px-3 py-1.5 text-base text-gray-900 text-white outline-none focus:outline-none focus:ring-0 focus:border-purple-500 focus:border-purple-500 placeholder:text-gray-400 placeholder-gray-500">
                        </div>
                        <span v-if="v$.celular.$error" class="text-red-500 text-sm mt-2 block">
                            <span v-if="!v$.celular.$model">O celular é obrigatório.</span>
                            <span v-else>Formato de celular inválido.</span>
                        </span>
                    </div>
                </div>
                <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-1">
                    <div class="sm:col-span-1">
                        <label for="email" class="block text-sm font-medium text-gray-900 text-white">E-mail</label>
                        <div class="mt-2">
                            <input id="email" name="email" type="email" v-model="form.email" placeholder=" "
                                maxlength="100" :class="{ 'border-red-300': v$.email.$error }"
                                class="block w-full rounded-md  bg-gray-800 px-3 py-1.5 text-base text-gray-900 text-white outline-none focus:outline-none focus:ring-0 focus:border-purple-500 focus:border-purple-500 placeholder:text-gray-400 placeholder-gray-500">
                        </div>
                        <span v-if="v$.email.$error" class="text-red-500 text-sm mt-2 block">
                            <span v-if="!v$.email.$model">O e-mail é obrigatório.</span>
                            <span v-else>Formato de e-mail inválido.</span>
                        </span>
                    </div>
                </div>
                <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
                    <div class="sm:col-span-1">
                        <label for="cep" class="block text-sm font-medium text-gray-900 text-white">CEP</label>
                        <div class="mt-2">
                            <input id="cep" name="cep" type="text" v-model="form.cep" placeholder=" "
                                v-mask="'##.###-###'" :class="{ 'border-red-300': v$.cep.$error }"
                                class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-gray-900 text-white outline-none focus:outline-none focus:ring-0 focus:border-purple-500 placeholder:text-gray-400 placeholder-gray-500">
                        </div>
                        <span v-if="v$.cep.$error" class="text-red-500 text-sm mt-2 block">
                            <span v-if="!v$.cep.$model">O CEP é obrigatório.</span>
                            <span v-else>Formato de CEP inválido.</span>
                        </span>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="endereco"
                            class="block text-sm font-medium text-gray-900 text-white">Endereço</label>
                        <div class="mt-2">
                            <input name="endereco" id="endereco" type="text" v-model="form.endereco" placeholder=" "
                                maxlength="100" :class="{ 'border-red-300': v$.endereco.$error }"
                                class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-gray-900 text-white outline-none focus:outline-none focus:ring-0 focus:border-purple-500 placeholder:text-gray-400 placeholder-gray-500">
                        </div>
                        <span v-if="v$.endereco.$error" class="text-red-500 text-sm mt-2 block">
                            O endereço é obrigatório.
                        </span>
                    </div>
                </div>

                <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
                    <div class="sm:col-span-2">
                        <label for="cidade" class="block text-sm font-medium text-gray-900 text-white">Cidade</label>
                        <div class="mt-2">
                            <input id="cidade" name="cidade" type="text" v-model="form.cidade" placeholder=" "
                                maxlength="100" :class="{ 'border-red-300': v$.cidade.$error }"
                                class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-gray-900 text-white outline-none focus:outline-none focus:ring-0 focus:border-purple-500 placeholder:text-gray-400 placeholder-gray-500">
                        </div>
                        <span v-if="v$.cidade.$error" class="text-red-500 text-sm mt-2 block">
                            A cidade é obrigatória.
                        </span>
                    </div>
                    <div class="sm:col-span-1">
                        <label for="estado" class="block text-sm font-medium text-gray-900 text-white">UF</label>
                        <div class="mt-2">
                            <select name="estado" id="estado" v-model="form.estado"
                                :class="{ 'border-red-300': v$.estado.$error }"
                                class="block w-full rounded-md bg-gray-800 px-3 py-1.5 text-base text-gray-900 text-white outline-none focus:outline-none focus:ring-0 focus:border-purple-500 placeholder:text-gray-400 placeholder-gray-500">
                                <option value="" disabled selected>Selecione</option>
                                <option v-for="uf in ufs" :key="uf" :value="uf">{{ uf }}</option>
                            </select>
                        </div>
                        <span v-if="v$.estado.$error" class="text-red-500 text-sm mt-2 block">
                            O UF é obrigatório.
                        </span>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { required, email } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { ref } from 'vue'
import { useStore } from 'vuex';
import { maska } from 'maska'
import { UFlist } from '@/lib/utils'
import { cpfValidator, cepValidator, celularValidator } from '@/lib/validators'

export default {
    name: 'CheckoutForm',
    data() {
        return {
            ufs: UFlist,
            isMobile: window.innerWidth < 768,
        }
    },
    directives: {
        mask: maska
    },
    setup() {

        const store = useStore();

        const form = ref({
            nome: '',
            cpf: '',
            celular: '',
            email: '',
            cep: '',
            endereco: '',
            cidade: '',
            estado: '',
        })

        const rules = {
            nome: { required },
            cpf: { required, cpfValidator },
            celular: { required, celularValidator },
            email: { required, email },
            cep: { required, cepValidator },
            endereco: { required },
            cidade: { required },
            estado: { required },
        }

        const v$ = useVuelidate(rules, form)

        const handleSubmit = () => {
            v$.value.$touch()
            if (v$.value.$invalid) {
                return
            }

            store.dispatch('checkout/setPayerNameConfirmModal', form.value.nome)
            store.dispatch('cart/clearCart')
            store.dispatch('checkout/openConfirmModal')

            form.value = {
                nome: '',
                cpf: '',
                celular: '',
                email: '',
                cep: '',
                endereco: '',
                cidade: '',
                estado: ''
            }

            v$.value.$reset()
        }

        return { form, v$, handleSubmit }
    },
}
</script>



<style scoped></style>
