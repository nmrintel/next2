import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { writeToFirestore, readFromFirestore, updateFirestore, readFromFiresotre2 } from "@/lib/FirebaseConfig";
import { set } from 'firebase/database';
import { useAuth } from '@/lib/AuthContext';
import firebase from 'firebase/app';
import 'firebase/firestore';
import ImageUploadForm from './Image';

function Check(props: any) {
  const userID = useAuth().currentUser.email;

  const [ch1, setCh1] = useState(false);
  const handleCheck1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCh1(event.target.checked);
  }

  const [ch2, setCh2] = useState(false);
  const handleCheck2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCh2(event.target.checked);
  }

  const [ch3, setCh3] = useState(false);
  const handleCheck3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCh3(event.target.checked);
  }

  const [ch4, setCh4] = useState(false);
  const handleCheck4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCh4(event.target.checked);
  }

  const [ch5, setCh5] = useState(false);
  const handleCheck5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCh5(event.target.checked);
  }

  let profile:{C:boolean, Java:boolean, JavaScript:boolean, Nextjs:boolean, Python:boolean} = {C:false, Java:false, JavaScript:false, Nextjs:false, Python:false};

  useEffect(() => {
    readFromFirestore("userProfile", userID).then((doc: any) => {
      profile = doc.language;
      setCh1(profile.C);
      setCh2(profile.Python);
      setCh3(profile.Java);
      setCh4(profile.JavaScript);
      setCh5(profile.Nextjs);
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, []);

  const handleSubmit2 = (event: any) => {
    console.log("handleSubmit2");
    event.preventDefault();
    alert("使用言語を更新しました");
    writeToFirestore("userProfile", userID, {
      language: {
        Python: ch1,
        C: ch2,
        Java: ch3,
        JavaScript: ch4,
        Nextjs: ch5
      }
    });
  };

  return (
    <div style={{marginTop:"100px"}}>
      <h1>使用言語</h1>
      <Form>

        <FormGroup
          check
          inline
        >
          <Input type="checkbox" checked={ch1} onChange={handleCheck1} />
          <Label check>
            Python
          </Label>
        </FormGroup>

        <FormGroup
          check
          inline
        >
          <Input type="checkbox" checked={ch2} onChange={handleCheck2} />
          <Label check>
            C
          </Label>
        </FormGroup>

        <FormGroup
          check
          inline
        >
          <Input type="checkbox" checked={ch3} onChange={handleCheck3} />
          <Label check>
            Java
          </Label>
        </FormGroup>

        <FormGroup
          check
          inline
        >
          <Input type="checkbox" checked={ch4} onChange={handleCheck4} />
          <Label check>
            JavaScript
          </Label>
        </FormGroup>

        <FormGroup
          check
          inline
        >
          <Input type="checkbox" checked={ch5} onChange={handleCheck5} />
          <Label check>
            Next.js
          </Label>
        </FormGroup>
      </Form>
      <Button onClick={handleSubmit2}>使用言語を更新する</Button>
    </div>
  );
}

function Profile() {
  const [inputValue1, setInputValue1] = useState('')
  const [inputValue2, setInputValue2] = useState('')
  const [inputValue3, setInputValue3] = useState('')
  const [inputValue4, setInputValue4] = useState('')

  let profile: { name: string, age: string, affiliation: string, text: string }
    = { name: "", age: "", affiliation: "", text: "" };

  const userID = useAuth().currentUser.email;

  useEffect(() => {
    readFromFirestore("userProfile", userID).then((doc: any) => {
      profile = doc;
      setInputValue1(profile.name);
      setInputValue2(profile.age);
      setInputValue3(profile.affiliation);
      setInputValue4(profile.text)
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
      text: inputValue4
    });
    alert("プロフィールを更新しました");
  };

  return(
    <div style={{marginTop:"100px"}}>
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

      <FormGroup>
        <Label for="exampleText">自己アピール</Label>
        <Input type="textarea" name="text" id="exampleText" value={inputValue4} onChange={e => setInputValue4(e.target.value)} />
      </FormGroup>

      <Button type="submit">プロフィールを更新する</Button>
    </Form>
  </div>
  )
}

export default function Edit(this: any) {
  console.log("Edit");

  return (
    <div style={{ margin: '200px' }}>
      <ImageUploadForm />
      <Profile />
      <Check />
    </div>
  );
}

