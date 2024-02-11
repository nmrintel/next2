import React, { useState } from 'react';
import Viewer from "@/components/View"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Example({id}:{id:string}) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Click Me
      </Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>詳細</ModalHeader>
        <ModalBody>
          <Viewer id={id} />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Example;