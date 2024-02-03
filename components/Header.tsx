import { Button } from 'reactstrap';
import { useAuth } from '../context/AuthContext'
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
            <div style={{ display: "flex", alignItems: "center" }}>
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
              自分のポートフォリオ
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              他人の
            </NavLink>
          </NavItem>
        </Nav>

      </div>
    </div>
  )
}

