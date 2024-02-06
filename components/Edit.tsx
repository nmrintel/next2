import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { writeToFirestore, readFromFirestore, addToFirestore } from "@/lib/FirebaseConfig";
import { set } from 'firebase/database';
import { useAuth } from './AuthContext';


function Edit() {
  const [inputValue, setInputValue] = useState('')
  const userID = useAuth().currentUser.email;

  const handleSubmit = (event:any) => {
    event.preventDefault();
    writeToFirestore("userProfile",userID,{name:inputValue});
    setInputValue('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleText">文字列</Label>
        <Input type="text" name="text" id="exampleText" value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </FormGroup>
      <Button type="submit">送信</Button>
    </Form>
  );
}

export default Edit;