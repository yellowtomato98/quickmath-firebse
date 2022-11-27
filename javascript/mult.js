// firebase

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js'
import { getAuth, signInAnonymously, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js'
import { getDatabase, ref, set, onDisconnect, remove } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js'

const firebaseConfig = {
  apiKey: "AIzaSyCb6DWzGo7N9dSf3YarcUpzYRXZUOfS10A",
  authDomain: "quickmath-cd59e.firebaseapp.com",
  databaseURL: "https://quickmath-cd59e-default-rtdb.firebaseio.com",
  projectId: "quickmath-cd59e",
  storageBucket: "quickmath-cd59e.appspot.com",
  messagingSenderId: "1090677233175",
  appId: "1:1090677233175:web:d413f3c1761aafdc25ee52",
  measurementId: "G-HC3JB81THB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const analytics = getAnalytics(app);

function padZeros(x, size){
    x = String(x)
    while (x.length < size){
        x = "0"+x
    }
    return x
}

function generateName(){
    const tag = Math.floor(Math.random()*100000)
    return "Guest"+padZeros(tag, 5)
}

function new_user(){
    signInAnonymously(auth);

    let userId;
    let userRef;

    onAuthStateChanged(auth, user => {
        // console.log(user)
        if (user){
            userId = user.uid;
            userRef = ref(database, 'users/'+String(userId));
            set(userRef, {
                id: userId, 
                name: generateName(),
                color: "green",
            })
            onDisconnect(userRef).remove()
            // logged in
        }
    })
}

// game js

(function start(){
    new_user()
})();
