import { useAuth } from './AuthContext'
import { Nav, NavItem, NavLink } from 'reactstrap';
import Account from './account';
import Logout from './logout';

export default function Header({ onSwitch1, onSwitch2,mode}:{onSwitch1:()=>void, onSwitch2:()=>void,mode:number}) {
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
          justified
          tabs
          card
        >
          <NavItem>
            <NavLink
              active
              onClick={onSwitch1}
              style={{ color: (mode==0) ? "white" : "blue" ,backgroundColor: (mode==0) ? "blue" : "white"}}
              
            >
              自分のポートフォリオをみる
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
            active
            onClick={onSwitch2}
            style={{ color: !(mode === 0) ? "white" : "blue" ,backgroundColor: !(mode === 0) ? "blue" : "white"}}
            >
              自分のポートフォリオの編集する
            </NavLink>
          </NavItem>
          
        </Nav>

      </div>
    </div>
  )
}

