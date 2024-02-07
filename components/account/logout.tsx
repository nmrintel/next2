import { Button } from 'reactstrap';
import { getAuth, signOut } from "firebase/auth";

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
                <Button style={{ width: 300, height: 60 }}  onClick={() => {
                        doLogout();
                    }}
                    >ログアウト</Button>
        )
}