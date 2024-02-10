import React, { useState } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { uploadImage } from '@/lib/FirebaseConfig';
import firebase from 'firebase/app';
import 'firebase/storage';
import test from 'node:test';
import DisplayImg from '@/components/Editer/display';
import { updateFirestore,readFromFiresotre2 } from '@/lib/FirebaseConfig';
import { useAuth } from '@/lib/AuthContext';

const ImageUploadForm = () => {
  const DocID = useAuth().currentUser.email;

  async function handleChange(e:any){
    if (e.target.files[0]) {
      const returnedURL:string = await uploadImage(e.target.files[0]);
      updateFirestore("userProfile", DocID, "imageUrl", returnedURL);
    }
  };

  return (
    <Form>
      <h1>新しいプロフィール画像</h1>
      <Input type="file" onChange={handleChange} />
    </Form>
  );
};



export default ImageUploadForm;