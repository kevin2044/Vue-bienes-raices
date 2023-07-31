<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <v-card
        elevation="3"
        max-width="1200"
        class="mx-auto"
    >
        <v-layout>
            <v-app-bar
                color="blue-darken-1"
            >
                <template v-slot:prepend>
                    <!-- <h1>izquierda</h1> -->
                    <v-btn
                        :to="{name: 'home'}"
                    >
                        Bienes Raices- VueFire
                    </v-btn>
                </template>
                <template v-slot:append>
                    <!-- <h1>derecha</h1> -->
                    <v-btn :to="{name: 'home'}">
                        Inicio
                    </v-btn>
                    <v-btn :to="{name: 'login'}">
                        Iniciar Sesion
                    </v-btn>
                </template>
            </v-app-bar>
            <v-main>
                <v-container>
                    <RouterView />
                </v-container>
            </v-main>
        </v-layout>
    </v-card>
</template>

<style scoped>

</style>
