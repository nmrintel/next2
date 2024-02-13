import Header from './Header'
import { useState } from 'react'
import Edit from './Editer/Edit'
import { useAuth } from '../lib/AuthContext';
import PageMotion from './motion'
import React from "react"
import Viewer from './View'
import Board from './Board/board'
import Fedin from "./motion"

export default function Main() {
    const [mode, setMode] = useState(0)
    const [loaded, setLoaded] = useState(false)

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
        if (mode === 1) {
            if (users.currentUser) {
                const userId = users.currentUser.email;
                console.log("userId in Main:", userId);

                return (
                    <>
                    <div style={{ marginTop: '10%', marginLeft: '40%', marginRight: '25%' }}>
                        <PageMotion >
                            <Viewer id={userId} setLoaded={setLoaded} />
                        </PageMotion>
                    </div>
                    {loaded &&
                        <PageMotion>
                             <Footer />
                        </PageMotion>
                    }
                   
                    </>
                    
                );
            }
            else {
                return (
                    <>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <h1>ログインしてください</h1>
                    </div>
                    <Footer />
                    </>
                    
                );
            }

        } else if (mode === 2) {
            if (users.currentUser) {
                return (
                    <>
                    <PageMotion>
                        <Edit />
                    </PageMotion>
                    <Footer />
                    </>
                    
                )
            }
            else {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <h1>ログインしてください</h1>
                    </div>
                );
            }

        }
        else if (mode === 0) {
            return (
            <Fedin>
            <Board />
            </Fedin>
            )
        }
        else {
            return null;
        }
    }

    return (
        <>
            <Header onSwitch1={SwitchToView} onSwitch2={SwitchToEdit} onSwitch3={SwitchToBoard} mode={mode} />
            {RenderComponent()}
        </>
    );
}


function Footer() {
    return (
        <div style={{ backgroundColor: "black", color: "white", padding: "10px", textAlign: "center" }}>
            <p>nmrintel@github</p>
        </div>
    );
}

