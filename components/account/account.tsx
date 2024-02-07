import React, { useState } from 'react';
import {Button } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Login from './login'
import Register from './register'
import ResetPassword from './forgetPassword'

export default function Account() {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [login, setLogin] = useState(0);

    const callBackLogin = () => {
        setLogin(0);
    }

    const callBackRegister = () => {
        setLogin(1);
    }

    const callBackReset = () => {
        setLogin(2);
    }

    const renderContent = () => {
        if (login === 0) {
            return <Login onSwitch1={callBackReset} onSwitch2={callBackRegister} />;
        } else if (login === 1) {
            return <Register onSwitch={callBackLogin}/>;
        } else if (login === 2) {
            return <ResetPassword onSwitch={callBackLogin}/>;
        }
    }

    return (
        <div>
            <Button color="danger" onClick={toggle} style={{ width: 300, height: 60, margin: '10px' }}>
                ログイン
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>アカウント(デモ:bowmrban@na-cat.com/111111)</ModalHeader>
                <ModalBody>
                    {renderContent()}
                </ModalBody>
            </Modal>
        </div>
    );
}
