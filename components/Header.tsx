import { useAuth } from './AuthContext'
import { Nav, NavItem, NavLink } from 'reactstrap';
import Account from './account';
import Logout from './logout';

export default function Header() {
  const { currentUser } = useAuth();

  return (
    <div style={{ padding: "1rem 0" }} >
      <div suppressHydrationWarning={true}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
          <a href="./">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src="./home.png" alt="Next" style={{ width: "400px", height: "80px" }} />
            </div>
          </a>

          {currentUser ?
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>{currentUser.email} でログインしています。</div>
              <Logout />
            </div>
            :
            <div style={{ display: "flex", alignItems: "center",justifyContent:"space-between" }}>
              <div>ログインしていません  </div>
              <Account />
            </div>
          }
        </div>

        <Nav
          card
          fill
          justified
          tabs
        >
          <NavItem>
            <NavLink
              active
            >
              自分のポートフォリオをみる
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="#">
              自分のポートフォリオの編集する
            </NavLink>
          </NavItem>
          
        </Nav>

      </div>
    </div>
  )
}

