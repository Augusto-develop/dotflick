<template>
    <div class="w-full md:w-1/2 pr-4 text-left">
        <div class="max-w-xl mx-auto">
            <h2 class="text-xl font-bold mb-6 text-center">Finalizar Compra</h2>
            <form class="w-full" ref="checkoutForm" @submit.prevent="handleSubmit">
                <div class="grid md:grid-cols-1 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_first_name" id="floating_first_name"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required />
                        <label for="floating_first_name"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Nome Completo
                        </label>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_cpf" id="floating_cpf" v-model="form.cpf" placeholder=" "
                            v-mask="'###.###.###-##'" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
                            border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500
                            focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                        <label for="floating_cpf" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
                            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 
                            rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 peer-focus:-translate-y-6">CPF</label>
                        <span v-if="v$.cpf.$error" class="text-red-500 text-sm mt-1 block">
                            CPF Inválido
                        </span>
                    </div>

                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_cellphone" id="floating_cellphone" placeholder=" "
                            v-model="form.phone" v-mask="'(##) #####-####'" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
                            border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
                            focus:outline-none focus:ring-0 focus:border-blue-600 peer" />

                        <label for="floating_cellphone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
                            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 
                            rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                            peer-focus:-translate-y-6">Celular</label>

                        <span v-if="v$.phone.$error" class="text-red-500 text-sm mt-1 block">
                            Telefone inválido
                        </span>
                    </div>
                </div>
                <div class="grid md:grid-cols-1 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="email" name="floating_email" id="floating_email" v-model="form.email"
                            v-validate="'required|email'" placeholder=" " class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 
                                    border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 
                                    focus:outline-none focus:ring-0 focus:border-blue-600 peer" />

                        <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
                            duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 
                            rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 
                            peer-focus:-translate-y-6">
                            E-mail</label>

                        <span v-if="v$.email.$error" class="text-red-500 text-sm mt-1 block">
                            Email inválido
                        </span>
                    </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_zip" id="floating_zip"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required />

                        <label for="floating_zip"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Cep</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_address" id="floating_address"
                            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" " required />
                        <label for="floating_address"
                            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Endereço</label>
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
import { maska } from 'maska'

export default {
    name: 'CheckoutForm',
    components: {
        
    },
    directives: {
         mask: maska 
    },
    setup() {
        const form = ref({
            email: '',
            phone: '',
            cpf: ''
        })

        const rules = {
            email: { required, email },
            phone: { required },
            cpf: { required }
        }

        const v$ = useVuelidate(rules, form)

        const handleSubmit = () => {
            v$.value.$touch()
            if (v$.value.$invalid) {
                return
            }
            alert('Formulário enviado com sucesso!')
        }

        return { form, v$, handleSubmit }
    }
}
</script>

<style scoped>
.label {
    @apply peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6;
}
</style>
