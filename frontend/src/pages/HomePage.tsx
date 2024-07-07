import Header from "../components/Header";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <>
      <div>
        <Header color="white">Welcome to</Header>
        <Header color="#d50a0a">Sideline Scoop</Header>
        <button type="button" className="btn">
          Get started //Bootstrap button
        </button>
      </div>
    </>
  );
};

export default HomePage;
