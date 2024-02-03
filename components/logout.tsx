import { Button } from 'reactstrap';
import { useAuth } from '../context/AuthContext'
import { getAuth, signOut } from "firebase/auth";
import { Nav, NavItem, NavLink } from 'reactstrap';
import Login from './account';

export default function Logout(onSwitch: any) {
    const doLogout = () => {
        const auth = getAuth();

        signOut(auth)
            .then(() => {
                alert('ログアウト完了！');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Button style={{ width: 220 }} onClick={() => {
            doLogout();
          }}
          >ログアウト</Button>
    )
}