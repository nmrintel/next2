import styles from '@/styles/Home.module.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useState } from 'react';
import { addDoc, setDoc, collection } from 'firebase/firestore';
import { writeToFirestore ,writeToFirestore2} from '@/lib/FirebaseConfig';

export default function Register({ onSwitch }: { onSwitch: () => void }) {
  console.log('Register')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doRegister = async (event: any) => {
    event.preventDefault();
    const auth = getAuth();


    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user?.email;
      console.log(userId);

      if (userId) {
        writeToFirestore2("userProfile", userId, { name:"",age:"",affiliation:"",imageUrl: "https://firebasestorage.googleapis.com/v0/b/authtest-f6078.appspot.com/o/images%2FnoImage.png?alt=media&token=ce8f80ba-0a01-49c6-bea6-e1ec93b839b4",language: { C: false, Python: false, Java: false, Javascript: false, Nextjs: false }});
        alert('登録完了！');
      }
      else{
        console.log('userId is null');
        alert('ユーザー無し')
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
