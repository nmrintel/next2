import styles from '@/styles/Home.module.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useState } from 'react';
import { addDoc, setDoc, collection } from 'firebase/firestore';
import { writeToFirestore } from '@/lib/FirebaseConfig';



export default function Register({ onSwitch }: { onSwitch: () => void }) {
  console.log('Register')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doRegister = async (event:any) => {
    event.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      alert('登録完了！');
      const userId = user?.email;
      if (userId) {
        writeToFirestore("userProfile", userId, { imageUrl: "gs://authtest-f6078.appspot.com/images/noImage.png" });
      }
      else{
        console.log('userId is null');
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('登録失敗(重複したメールアドレス等)');
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
              onClick={(event) => {
                doRegister(event);
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
