import { Home, ShoppingBag, PlusSquare, MessageCircle, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Layout.css';

function BottomNav() {
  return (
    <nav className="bottom-nav glass-panel">
      <div className="bottom-nav-content">
        <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <Home size={24} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/market" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <ShoppingBag size={24} />
          <span>Market</span>
        </NavLink>
        <NavLink to="/add" className="nav-item nav-item-add">
          <div className="add-btn-wrapper">
            <PlusSquare size={28} />
          </div>
        </NavLink>
        <NavLink to="/chat" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <MessageCircle size={24} />
          <span>Chat</span>
        </NavLink>
        <NavLink to="/profile" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <User size={24} />
          <span>Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default BottomNav;
