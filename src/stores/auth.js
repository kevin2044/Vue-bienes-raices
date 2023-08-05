import { ref, computed, onMounted } from "vue"
import { useRouter } from 'vue-router'
import { defineStore } from "pinia"
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export const useAuthStore = defineStore('auth', () => {
    const auth = useFirebaseAuth()
    const authUser = ref(null)
    const router = useRouter()
    //console.log(authUser.value)
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
            router.push({name: 'admin-propiedades'})
        })
        .catch((error) => {
            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;
            errorMsg.value = errorCodes[errorCode]
        });
    }

    const logout = () => {
        console.log('cerrando session')
        signOut(auth).then(() => {
            // Sign-out successful.
            authUser.value = null
            router.push({name: 'login'})
        }).catch((error) => {
            // An error happened.
            console.log(error)
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
        logout,
    }
})