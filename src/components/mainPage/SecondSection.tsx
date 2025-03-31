import { Link } from "react-router-dom";
import "../../styles/components/mainPage/SecondSection.css";
import { Button } from "../Button";

export const SecondSection = (): JSX.Element => {
  return (
    <div className="main-page__second-section">

      <div className="main-page__second-section-animal-container">
        <img src="/images/Dog.svg" alt="Description" />
      </div>

      <div className="main-page__second-section-group">
        <h1>About us</h1>
        <div className="main-page__second-section-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim venia.
        </div>
        <Link to="/shelters" className="no-text-decoration">
          <Button className="main-page__second-section-btn">Visit Animals</Button>
        </Link>
      </div>
    </div>
  );
};
