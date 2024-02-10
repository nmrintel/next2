import Header from './Header'
import { useState } from 'react'
import Edit from './Editer/Edit'
import { useAuth } from '../lib/AuthContext';
import PageMotion from './motion'
import React from "react"
import Viewer from './View'
import Board from './Board/board'

export default function Main() {
    const [mode, setMode] = useState(0)

    const SwitchToView = () => {
        setMode(0)
    }

    const SwitchToEdit = () => {
        setMode(1)
    }

    const SwitchToBoard = () => {
        setMode(2)
    }

    const users = useAuth();

    const RenderComponent = () => {
        if (mode === 0) {
            if (users.currentUser) {
                return <PageMotion Children={Viewer} />;
            }
            else {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <h1>ログインしてください</h1>
                    </div>
                );
            }

        } else if (mode === 1) {
            if (users.currentUser) {
                return <Edit />;
            }
            else {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <h1>ログインしてください</h1>
                    </div>
                );
            }

        }
        else if (mode === 2) {
            return <Board />;
        }
        else {
            return null;
        }
    }

    return (
        <>
            <Header onSwitch1={SwitchToView} onSwitch2={SwitchToEdit} onSwitch3={SwitchToBoard}mode={mode} />
            {RenderComponent()}
        </>
    );
}