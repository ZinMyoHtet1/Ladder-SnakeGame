import {useNavigate} from "react-router-dom"

import home_icon from "./../assets/home-icon.svg";

function Header() {
    const navigate = useNavigate()
    const handleHome = () => {
    navigate("/", { replace: true });
  };
  return (
    <div className="header">
          <div className="home_btn btn" onClick={handleHome}>
            <img src={home_icon} alt="home_icon" />
            <span>Home</span>
          </div>
        </div>
  )
}

export default Header
