import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { writeToFirestore, readFromFirestore, addToFirestore } from "@/lib/FirebaseConfig";
import { useAuth } from './AuthContext';

const MyForm = () => {
    console.log('MyForm')
    const [inputValue1, setInputValue1] = useState('');
    // const [inputValue2, setInputValue2] = useState('');
    // const [inputValue3, setInputValue3] = useState('');
    // const [inputValue4, setInputValue4] = useState('');

    const { users } = useAuth();
    const userId = users?.email;


    const SubmitForm = async (e:any) => {
        e.preventDefault();
        console.log('SubmitForm');
        try {
            await writeToFirestore("userProfile", userId, {
                1: inputValue1
            });
            setInputValue1('');
           
            console.log('ポートフォリオの登録完了！');
            writeToFirestore("userProfile", "aaa", { name: "aaa" });
        } catch (error) {
            console.error("Error adding document: ", error);
            console.log('ポートフォリオの登録失敗！');

        }
    };

    return (
        <Form >
            <FormGroup>
                <Label for="exampleText1">Text Area</Label>
                <Input type="textarea" name="text1" id="exampleText1" value={inputValue1}/>
            </FormGroup>

            <Button onClick={() => SubmitForm}>Submit1</Button>
        </Form>
    );
};

export default MyForm;