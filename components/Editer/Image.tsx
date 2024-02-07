import React, { useState } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { uploadImage } from '@/lib/FirebaseConfig';
import firebase from 'firebase/app';
import 'firebase/storage';

const ImageUploadForm = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");

  const handleChange = (e:any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  async function handleUpload(file:any){
    const returnedURL:string = await uploadImage(file); // Remove the explicit type annotation
    setUrl(returnedURL);
  }



  return (
    <Form>
      <Input type="file" onChange={handleChange} />
      <Button color="primary" onClick={() => handleUpload(image)}>Upload</Button>
      {url && <a href={url}>View Image</a>}
    </Form>
  );
};

export default ImageUploadForm;