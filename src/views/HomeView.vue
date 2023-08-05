<script setup>
import Propiedad from '../components/Propiedad.vue'
import usePropiedades from '../composables/usePropiedades'
import { propertyPrice } from '../helpers'

const { propiedadesCollection } = usePropiedades()
</script>

<template>
    <main>
        <h1 class="text-center text-h3 font-weight-bold">Nuestras Propiedades</h1>
        <v-card 
            flat 
            class="py-10"
        >
            <v-row>
                <Propiedad 
                    v-for="propiedad in propiedadesCollection"
                    :key="propiedad.id"
                    :propiedad="propiedad"
                    :price="propertyPrice"
                />
            </v-row>
        </v-card>
    </main>
</template>
