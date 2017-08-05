import * as firebase from "firebase";

export default class Firebase {

    /**
     * Initialises Firebase
     */
    static initialise() {
        firebase.initializeApp({
            apiKey: "AIzaSyCpOKNd2Ik3OgRAryOqTXvK8dpi9m76PdE",
            authDomain: "poised-rock-154320.firebaseapp.com",
            databaseURL: "https://poised-rock-154320.firebaseio.com",
            projectId: "poised-rock-154320",
            storageBucket: "poised-rock-154320.appspot.com",
            messagingSenderId: "260738794264"
        }); 
    }

}