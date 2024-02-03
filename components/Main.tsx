import Home from './Home'
import Header from './Header'
import {useState} from 'react'
import Edit from './Edit'

export default function Main() {
    const [mode, setMode] = useState(0)

    const SwitchToView = () => {
        setMode(0)
    }

    const SwitchToEdit = () => {
        setMode(1)
    }

    const RenderComponent = () => {
        if (mode === 0) {
            return <Home />;
        } else if (mode === 1) {
            return <Edit />;
        } else {
            return null;
        }
    }

    return (
        <>
            <Header onSwitch1={SwitchToView} onSwitch2={SwitchToEdit} />
            {RenderComponent()}
        </>
    );
}