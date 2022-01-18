import { Analytics, getAnalytics } from "firebase/analytics"
import { initializeApp } from "firebase/app"

export let analytics: Analytics

export const setupFirebase = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyAH9HkcdTUfBuCK97OX4qA3GYTjYnsyzkQ",
        authDomain: "myply-firebase.firebaseapp.com",
        projectId: "myply-firebase",
        storageBucket: "myply-firebase.appspot.com",
        messagingSenderId: "271533684249",
        appId: "1:271533684249:web:d39eaf3d9207a4fe785c88",
        measurementId: "G-DQ50H6LJYG",
    }

    analytics = getAnalytics(initializeApp(firebaseConfig))
}
