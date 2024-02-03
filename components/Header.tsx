import { Button } from 'reactstrap';
import { useAuth } from '../context/AuthContext'
import { getAuth, signOut } from "firebase/auth";
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
            <div>
              <div>{currentUser.email} でログインしています。</div>
              <Logout />
            </div>
            :
            <div>
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
    </div>
  )
}

