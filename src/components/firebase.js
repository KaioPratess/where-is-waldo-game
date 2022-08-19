// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";


function Firebase() {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA_6NzJhqx_GWodizVLBxbM6tzPHRXYrD0",
    authDomain: "where-s-waldo-game.firebaseapp.com",
    projectId: "where-s-waldo-game",
    storageBucket: "where-s-waldo-game.appspot.com",
    messagingSenderId: "162540878009",
    appId: "1:162540878009:web:76184a13138fcfa68a4368"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // Create a new collection and a document
  const addToDb = (col, doc) => {
    try {
      const docRef = await addDoc(collection(db, col), doc);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // get docs from collection in database
  const getDb = (col) => {
    const querySnapshot = await getDocs(collection(db, col));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

}
