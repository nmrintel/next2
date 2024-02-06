import { doc, setDoc } from "firebase/firestore";
import { writeToFirestore } from "@/lib/FirebaseConfig";
import { Button } from "reactstrap";
import { useAuth } from './AuthContext';
import { write } from "fs";

// //iteToFirestore(data);
//}

export default function Home() {
    const user = useAuth().currentUser;
    const userID = user?.email;
    console.log(userID);
    writeToFirestore("userProfile",userID,{name:"test"});
    return (<p>Home</p>)
}