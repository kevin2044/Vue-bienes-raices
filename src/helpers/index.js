import { computed } from 'vue'

export const propertyPrice = computed(() => {
    return (precio) => {
        return Number(precio).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })
    }
})