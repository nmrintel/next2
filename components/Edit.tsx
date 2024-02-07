import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { writeToFirestore, readFromFirestore, addToFirestore } from "@/lib/FirebaseConfig";
import { set } from 'firebase/database';
import { useAuth } from '../lib/AuthContext';
import firebase from 'firebase/app';
import 'firebase/firestore';

export default function Edit() {
  console.log("Edit");

  let profile: { name: string, age: string, affiliation: string, hobby: string }
    = { name: "", age: "", affiliation: "", hobby: "" }

  const [inputValue1, setInputValue1] = useState('') // Set profile.name as initial value
  const [inputValue2, setInputValue2] = useState('')
  const [inputValue3, setInputValue3] = useState('')
  const [inputValue4, setInputValue4] = useState('')

  readFromFirestore("userProfile", useAuth().currentUser.email).then((doc: any) => {
    profile = doc;
    setInputValue1(profile.name);
    setInputValue2(profile.age);
    setInputValue3(profile.affiliation);
    setInputValue4(profile.hobby);
  }).catch((error) => {
    console.log("Error getting document:", error);
  });

  
  console.log(profile);

 

  const userID = useAuth().currentUser.email;

  const handleSubmit = (event: any) => {
    console.log("handleSubmit");
    event.preventDefault();
    writeToFirestore("userProfile", userID, {
      name: inputValue1,
      age: inputValue2,
      affiliation: inputValue3,
      hobby: inputValue4,
    });
    setInputValue1('');
    setInputValue2('');
    setInputValue3('');
    setInputValue4('');
  };

  return (
    <div style={{ margin: '100px' }}>
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

        <FormGroup>
          <Label for="exampleText">趣味</Label>
          <Input type="text" name="text" id="exampleText" value={inputValue4} onChange={e => setInputValue4(e.target.value)} />
        </FormGroup>
        <Button type="submit">プロフィールを更新する</Button>
      </Form>
    </div>
  );
}
