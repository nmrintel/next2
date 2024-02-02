import { Button } from 'reactstrap';
import { useAuth } from '../context/AuthContext'
import { getAuth, signOut } from "firebase/auth";
import { Nav, NavItem, NavLink } from 'reactstrap';

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
            <div2 style={{ display: "flex", alignItems: "center" ,justifyContent: "space-between",}}>

            <a href="./">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="./home.png" alt="Next" style={{ width: "400px", height: "80px" }} />
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

          <Nav
  card
  fill
  justified
  tabs
>
  <NavItem>
    <NavLink
      active
      href="#"
    >
      Link
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="#">
      Another Link
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink
      disabled
      href="#"
    >
      Disabled Link
    </NavLink>
  </NavItem>
</Nav>

        </div>
        :
        <div suppressHydrationWarning={true}>ログインしていません</div>}
    </div>
  )
}
export default Header;
