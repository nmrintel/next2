import { Button } from 'reactstrap';
import { useAuth } from '../context/AuthContext'
import { getAuth, signOut } from "firebase/auth";

function Header() {
  const { currentUser } = useAuth();

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
    <div style={{ padding: "1rem 0" }} >
      {currentUser ?

        <div suppressHydrationWarning={true}>
          <div2 style={{ display: "flex", alignItems: "center" ,justifyContent: "space-between"}}>

            <a href="./">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="./favicon.ico" alt="Next" style={{ width: "80px", height: "80px" }} />
                <h1 style={{ marginLeft: "1rem" }}>ページのヘッダ</h1>
              </div>
            </a>

            <login>
              <div>{currentUser.email} でログインしています。</div>
              <Button style={{ width: 220 }} onClick={() => {
                doLogout();
              }}
              >ログアウト</Button>

            </login>

          </div2>

        </div>
        :
        <div suppressHydrationWarning={true}>ログインしていません</div>}
    </div>
  )
}
export default Header;
