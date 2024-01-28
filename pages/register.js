import styles from '../styles/Home.module.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { Col, Container, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { useState } from 'react';
import firebaseApp from '../lib/FirebaseConfig';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doRegister = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('登録完了！');
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        alert('登録失敗')
      });
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
          <Button
            style={{ width: 220 }}
            color="primary"
            onClick={() => {
              doRegister();
            }}
          >
            登録
          </Button>
        </Form>
      </div>
    </div>
  )
}
