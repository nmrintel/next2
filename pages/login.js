import styles from '../styles/Home.module.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { useState } from 'react';
import Link from 'next/link';
import { Router } from 'react-router-dom';
import router from 'next/router';
<<<<<<< HEAD
=======

>>>>>>> 6089520eef7713300acbc24ebe7396d8f89e4218

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = () => {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;

        alert('ログインOK!');
        console.log(user);
        router.push('/');
      })
      .catch((error) => {
        console.log(error);
        alert('ログイン失敗')
      });
  }
  return (
    <div className={styles.card}>
      <h1>ログイン</h1>
      <div style={{ paddingBottom: "1rem" }}>
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
              doLogin();
            }}
          >
            ログイン
          </Button>
        </Form>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          href="/forgot_password">
          パスワードを忘れた場合
        </Link>
        <Button onClick={() => Router.push('/register')}>新規登録</Button>
      </div>
    </div>
  )
}
