import { doc, setDoc } from "firebase/firestore"; 
import { writeToFirestore } from "@/lib/FirebaseConfig";
import {Button } from "reactstrap";

// //iteToFirestore(data);
//}

export default function Home() {
    return <Button onClick={() => writeToFirestore("user","111",{name:"aaa"})}>aaa</Button>
}