import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";


export default function Login({ onSwitch1, onSwitch2 }: { onSwitch1: () => void, onSwitch2: () => void }) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const doLogin = () => {

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;

                alert('ログインOK!');
                console.log(user);
            })
            .catch((error) => {
                console.log(error);
                alert('ログイン失敗')
            });
    }

    return (
        <div>
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
                <Button onClick={onSwitch1}>パスワードを忘れた場合</Button>
                <Button onClick={onSwitch2}>新規登録</Button>
            </div>
        </div>
    )
}
