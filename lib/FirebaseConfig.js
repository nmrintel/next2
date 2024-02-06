import { initializeApp, getApps, FirebaseApp, firebase } from "firebase/app";
import { getFirestore, Firestore , doc, setDoc} from 'firebase/firestore'
import { getAuth, Auth } from "firebase/auth"
import "firebase/auth"


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID
};

let firebaseApp = FirebaseApp;
let auth = Auth;
let db = Firestore; // Add this line to export Firestore

firebaseApp = initializeApp(firebaseConfig);
auth = getAuth();
db = getFirestore(firebaseApp); // Assign the Firestore instance to db

async function writeToFirestore(collection, docId, data) {
  if(!docId) return console.error("Document ID is required")
  if(!data) return console.error("Data is required")
  try {
    await setDoc(doc(db, collection, docId), data);
    console.log("Document written successfully");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}

async function readFromFirestore(collection, docId) {
  try {
    const docSnap = await getDoc(doc(db, collection, docId));
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error reading document: ", error);
  }
}

async function addToFirestore(collection, data) {
  try {
    const docRef = await db.collection(collection).add(data);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export { firebaseApp, auth,writeToFirestore, readFromFirestore, addToFirestore};
