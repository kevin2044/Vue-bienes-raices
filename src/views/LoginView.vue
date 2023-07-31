<script setup>
import { useForm, useField } from 'vee-validate'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginSchema } from '../validation/loginSchema'

const { handleSubmit } = useForm({validationSchema: loginSchema})
const auth = useFirebaseAuth()

console.log(auth)

const email = useField('email')
const password = useField('password')

const submit = handleSubmit((values) => {
    console.log(values)
    signInWithEmailAndPassword(auth, values.email, values.password)
    .then((userCredential) => {
        console.log(userCredential)
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log(user)
    })
    .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
    });
})

</script>

<template>
    <v-card
        flat
        max-width="600"
        class="mx-auto my-3"
    >
        <v-card-title
            class="text-h3 font-weight-bold"
            tag="h3"
        >
            Iniciar Sesión
        </v-card-title>
        <v-card-subtitle
            class="text-h5"
        >
            Iniciar Sesión con tu cuenta
        </v-card-subtitle>
        <v-form class="mt-5">
            <v-text-field 
                type="email"
                label="Email"
                bg-color="blue-grey-lighten-5"
                class="mb-5"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
            />
            <v-text-field 
                type="password"
                label="Password"
                bg-color="blue-grey-lighten-5"
                class="mb-5"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
            />
            <v-btn
                block
                color="pink-accent-3"
                @click="submit"
            >
                Iniciar Sesión
            </v-btn>
        </v-form>
    </v-card>
</template>
