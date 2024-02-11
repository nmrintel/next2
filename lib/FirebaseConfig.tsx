import { initializeApp } from "firebase/app";
import { doc, setDoc, getDoc, updateDoc, collection, getDocs } from 'firebase/firestore'
import "firebase/auth"
import "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { set } from "firebase/database";
import { QuerySnapshot } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export async function writeToFirestore(collection: string, docId: string, data: any) {
  if (!docId) return console.error("Document ID is required")
  if (!data) return console.error("Data is required")
  try {
    await updateDoc(doc(db, collection, docId), data);
    console.log("Document written successfully");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}

export async function writeToFirestore2(collection: string, docId: string, data: any) {
  if (!docId) return console.error("Document ID is required")
  if (!data) return console.error("Data is required")
  try {
    await setDoc(doc(db, collection, docId), data);
    console.log("Document written successfully");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}


export async function getDocumentIds(collectionName: string): Promise<string[]> {
  try {
    const myCollection = collection(db, collectionName);
    const mySnapshot = await getDocs(myCollection);
    const documentIds: string[] = [];
    mySnapshot.forEach((doc) => {
      documentIds.push(doc.id);
    });
    return documentIds;
  } catch (error) {
    console.error("Error getting document IDs: ", error);
    return [];
  }
}


export async function readFromFirestore(collection: string, docId: string) {
  try {
    if (!docId) return console.error("Document ID is required(readFromFiresotre in firebaseConfig)")
    if (!collection) return console.error("Collection is required(readFromFiresotre in firebaseConfig)")

    const docSnap = await getDoc(doc(db, collection, docId));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!(readFromFiresotre in firebaseConfig)");
    }
  } catch (error) {
    console.error("Error reading document: ", error);
  }
}

export async function readFromFiresotre2(collection: string, docId: string, data_name: string) {
  try {
    if (!docId) return console.error("Document ID is required(readFromFiresotre in firebaseConfig)")
    if (!collection) return console.error("Collection is required(readFromFiresotre in firebaseConfig)")
    if (!data_name) return console.error("Data name is required(readFromFiresotre in firebaseConfig)")

    const docSnap = await getDoc(doc(db, collection, docId));
    if (docSnap.exists()) {
      const specificData = docSnap.data()?.[data_name]; // Access specific data field using dot notation
      return specificData;
    } else {
      console.log("No such document!(readFromFiresotre in firebaseConfig)");
    }
  } catch (error) {
    console.error("Error reading document: ", error);
  }
}

export function updateFirestore(collection: string, docId: string, data_name: string, data: any) {
  if (!docId) return console.error("Document ID is required")
  if (!data) return console.error("Data is required")
  if (!data_name) return console.error("Data name is required")
  if (!collection) return console.error("Collection is required")

  const docRef = doc(db, collection, docId);
  setDoc(docRef, {
    [data_name]: data
  }, { merge: true });
  console.log("Document was updated successfully");
}

export async function uploadImage(file: File): Promise<string> {
  if (!file) {
    alert("No file");
    return Promise.reject("No file");
  }
  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('File available at', downloadURL);
        resolve(downloadURL);
      }
    );
  });
}

export { auth };
