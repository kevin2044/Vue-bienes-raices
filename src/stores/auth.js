import { ref, computed, onMounted } from "vue"
import { defineStore } from "pinia"
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export const useAuthStore = defineStore('auth', () => {
    const auth = useFirebaseAuth()
    const authUser = ref(null)
    console.log(authUser.value)
    const errorCodes = {
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'El password es incorrecto',
    }

    const errorMsg = ref('')

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                authUser.value = user
                const uid = user.uid;
                console.log(uid)
                // ...
            } else {
                // User is signed out
                // ...
            }
        })
    })

    const login = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            console.log(userCredential)
            // Signed in 
            const user = userCredential.user;
            authUser.value = user
            console.log(authUser.value)
        })
        .catch((error) => {
            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;
            errorMsg.value = errorCodes[errorCode]
        });
    }

    const hasError = computed(() => {
        return errorMsg.value 
    })

    const isAuth = computed(() => {
        return authUser.value
    })

    return {
        login,
        errorMsg,
        hasError,
        isAuth,
    }
})