import { Link } from "react-router-dom";
import "../../styles/components/mainPage/FirstSection.css";
import { Button } from "../Button";

export const FirstSection = (): JSX.Element => {
  return (
    <div className="main-page__first-section">
      <div className="main-page__first-section-group">
        <h2>Тваринкам теж потрібен дім!</h2>
        <div className="main-page__first-section-text">
          Станьте чиїмось дивом вже сьогодні! У притулках на вас чекають
          чотирилапі друзі, які мріють про турботу та любов. Відкрийте своє
          серце та подаруйте їм справжню домівку. Натисніть нижче, щоб знайти
          свого нового улюбленця.
        </div>
        <Link to="/shelters" className="no-text-decoration">
          <Button className="main-page__first-section-btn">
            Дізнатися більше
          </Button>
        </Link>
      </div>
      <div className="main-page__first-section-animal-container">
        <img src="/images/6.png" alt="Description" />
      </div>
    </div>
  );
};
