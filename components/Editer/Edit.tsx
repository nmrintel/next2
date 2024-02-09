import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { writeToFirestore, readFromFirestore,updateFirestore,readFromFiresotre2} from "@/lib/FirebaseConfig";
import { set } from 'firebase/database';
import { useAuth } from '@/lib/AuthContext';
import firebase from 'firebase/app';
import 'firebase/firestore';
import ImageUploadForm from './Image';


export default function Edit(this: any) {
  console.log("Edit");
  const [inputValue1, setInputValue1] = useState('')
  const [inputValue2, setInputValue2] = useState('')
  const [inputValue3, setInputValue3] = useState('')

  let profile: { name: string, age: string, affiliation: string}
    = { name: "", age: "", affiliation: ""}

  const userID = useAuth().currentUser.email;

  useEffect(() => {
    readFromFirestore("userProfile", userID).then((doc: any) => {
      profile = doc;
      setInputValue1(profile.name);
      setInputValue2(profile.age);
      setInputValue3(profile.affiliation);
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, []);

  const handleSubmit = (event: any) => {
    console.log("handleSubmit");
    event.preventDefault();
    writeToFirestore("userProfile", userID, {
      name: inputValue1,
      age: inputValue2,
      affiliation: inputValue3,
    });
  };


  return (
    <div>
      <div style={{ margin: '100px' }}>
        <h1>新しいプロフィール画像</h1>
        <ImageUploadForm/>
      </div>
      <div style={{ margin: '100px' }}>
        <h1>プロフィール編集</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="exampleText">名前</Label>
            <Input type="text" name="text" id="exampleText" value={inputValue1} onChange={e => setInputValue1(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label for="exampleText">年齢</Label>
            <Input type="text" name="text" id="exampleText" value={inputValue2} onChange={e => setInputValue2(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label for="exampleText">所属</Label>
            <Input type="text" name="text" id="exampleText" value={inputValue3} onChange={e => setInputValue3(e.target.value)} />
          </FormGroup>

          <Button type="submit">プロフィールを更新する</Button>
        </Form>
      </div>
    </div>

  );
}

