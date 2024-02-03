import styles from '../styles/Home.module.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useState } from 'react';
//import { db } from "../lib/FirebaseConfig"; // Add this line to export the 'db' variable
import { addDoc, setDoc, collection } from 'firebase/firestore';
import firebase from 'firebase/app';



export default function Register({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doRegister = async () => {

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert('登録完了！');
      console.log(user);


      // const docRef = await addDoc(collection(db, "users"), {
      //   first: "Ada",
      //   last: "Lovelace",
      //   born: 1815
      // });
      //console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return (
    <div className={styles.card}>
      <h1>新規登録</h1>
      <div>
        <Form>
          <FormGroup>
            <Label>
              メールアドレス：
            </Label>
            <Input
              type="email"
              name="email"
              style={{ height: 50, fontSize: "1.2rem" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>
              パスワード：
            </Label>
            <Input
              type="password"
              name="password"
              style={{ height: 50, fontSize: "1.2rem" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              color="primary"
              onClick={() => {
                doRegister();
              }}
            >
              登録
            </Button>

            <Button onClick={onSwitch}>戻る</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
