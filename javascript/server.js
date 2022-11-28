import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js'
import { getAuth, 
    signInAnonymously, 
    onAuthStateChanged, 
    setPersistence,
    browserSessionPersistence } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js'
import { getDatabase, 
    ref, 
    set, 
    get,
    onDisconnect } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js'

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
setPersistence(auth, browserSessionPersistence);

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

function generateLobby(){
    return Math.floor(Math.random()*1000);
}

export function new_user(){
    signInAnonymously(auth);

    let userId;
    let userRef;

    onAuthStateChanged(auth, user => {
        console.log(user)
        if (user){
            userId = user.uid;
            userRef = ref(database, 'users/'+String(userId));
            set(userRef, {
                id: userId, 
                name: generateName()
            })
            onDisconnect(userRef).remove();
        } else {
            // not logged in
        }
    })
}

export function new_lobby(){
    onAuthStateChanged(auth, user => {
        let lobbyId = generateLobby();
        let lobbyRef = ref(database, 'lobbies/'+String(lobbyId));

        let userId = user.uid;
        let userRef = ref(database, 'users/'+String(userId));

        set(userRef, {
            id: userId,
            name: generateName()
        })

        set(lobbyRef, {
            id: lobbyId,
            host: userId,
            users: [userId]
        })
        onDisconnect(lobbyRef).remove();
        onDisconnect(userRef).remove();
    })
}

export function new_lobby_user(lobbyId){
    onAuthStateChanged(auth, user => {
        let userId = user.uid;
        let userRef = ref(database, 'users/'+String(userId));

        let lobbyPath = 'lobbies/'+String(lobbyId);
        let lobbyRef = ref(database, lobbyPath);

        cur_lobby = get(database, lobbyPath);
        cur_lobby[users].push(userId)
        set(lobbyRef, cur_lobby)

        onDisconnect(userRef).remove();
    })
}

export function get_user(userId){
    let userRef = ref(database, 'users/'+String(userId));
    get(userRef).then((snapshot) => {
        if (snapshot.exists()){
            console.log(snapshot.val());
            return (snapshot.val());
        } else {
            return;
        }
    })
}

(function(){
    signInAnonymously(auth);

    let userId;
    let userRef;

    onAuthStateChanged(auth, user => {
        console.log(user)
        if (user){
            userId = user.uid;
            userRef = ref(database, 'users/'+String(userId));

            // set(userRef, {
            //     id: userId, 
            //     name: generateName()
            // })
            // userData = get_user(userId);
            
            const past_user = sessionStorage.getItem(userId);
            if (past_user){
                console.log("hello!");
                console.log(past_user);
                set(userRef, JSON.parse(past_user));
            } else {
                set(userRef, {
                    id: userId, 
                    name: generateName()
                })
                get(userRef).then((userData) => {
                    sessionStorage.setItem(userId, JSON.stringify(userData.val()));
                })
            }

            onDisconnect(userRef).remove();
        } else {
            // logged out
        }
    })
})();

// get(userRef).then((snapshot) => {
//     if (!snapshot.exists()){
//         set(userRef, {
//             id: userId, 
//             name: generateName()
//         })
//     }
// })