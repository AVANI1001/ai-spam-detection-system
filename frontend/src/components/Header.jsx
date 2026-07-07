// import { FaRobot } from "react-icons/fa";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        🤖
        {/* <FaRobot size={35} /> */}
        <div>
          <h2>AI Spam Detector</h2>
          <p>Machine Learning Powered</p>
        </div>
      </div>

      <div className="status">
        <span className="online"></span>
        <span>ML Service Online</span>
      </div>
    </header>
  );
}

export default Header;