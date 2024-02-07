import { initializeApp } from "firebase/app";
import { doc, setDoc, getDoc } from 'firebase/firestore'
import "firebase/auth"
import "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage ,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import { set } from "firebase/database";

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

export  async function writeToFirestore(collection:string, docId:string, data:any) {
  if (!docId) return console.error("Document ID is required")
  if (!data) return console.error("Data is required")
  try {
    await setDoc(doc(db, collection, docId), data);
    console.log("Document written successfully");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}

export async function readFromFirestore(collection:string, docId:string) {
  try {
    if (!docId) return console.error("Document ID is required")
    if (!collection) return console.error("Collection is required")

    const docSnap = await getDoc(doc(db, collection, docId));
    if (docSnap.exists()) {
      console.log("Document data(firebaseConfig):", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!(firebaseConfig)");
    }
  } catch (error) {
    console.error("Error reading document: ", error);
  }
}


export async function uploadImage(file: File): Promise<string> {
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

export { auth};
