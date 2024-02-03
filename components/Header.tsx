import { useAuth } from './AuthContext'
import { Nav, NavItem, NavLink } from 'reactstrap';
import Account from './account';
import Logout from './logout';

export default function Header({ onSwitch1, onSwitch2}:{onSwitch1:()=>void, onSwitch2:()=>void}) {
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
              onClick={onSwitch1}
            >
              自分のポートフォリオをみる
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
            active
            onClick={onSwitch2}>
              自分のポートフォリオの編集する
            </NavLink>
          </NavItem>
          
        </Nav>

      </div>
    </div>
  )
}

