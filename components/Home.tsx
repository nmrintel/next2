import { doc, setDoc } from "firebase/firestore";
import { writeToFirestore } from "@/lib/FirebaseConfig";
import { Button } from "reactstrap";
import { useAuth } from './AuthContext';
import { write } from "fs";

export default function Home() {
    return (<p>Home</p>)
}