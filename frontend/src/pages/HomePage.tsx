import Header from "../components/Header";
import { Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.css";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <>
      <div className="headerContainer">
        <h1 className="header-1">Welcome To</h1>
        <h1 className="header-2">Sideline Scoop</h1>
        <Link to="/home">
          <button type="button" className="btn">
            Get Started
          </button>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
