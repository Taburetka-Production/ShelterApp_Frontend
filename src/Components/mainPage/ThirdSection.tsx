import { Link } from "react-router-dom";
import "../../styles/components/mainPage/ThirdSection.css";
import { Button } from "../Button";

export const ThirdSection = (): JSX.Element => {
  return (
    <div className="main-page__third-section">
      <div className="main-page__third-section-group">
        <h2>Об’єднуємо сили заради чотирилапих друзів!</h2>
        <p className="main-page__third-section-text">
          Наша ініціатива співпрацює з десятками притулків по всій Україні, щоб
          кожна тварина знайшла люблячу родину. Завдяки цій співпраці ми
          допомагаємо тисячам хвостатих знайти новий дім. Підтримайте нашу місію
          – дайте їм шанс на краще життя.
        </p>

        <Link to="/shelters" className="no-text-decoration" role="button">
          <Button className="main-page__third-section-btn">
            Дізнатися більше
          </Button>
        </Link>
      </div>

      <div className="main-page__third-section-photo-container">
        <img
          className="main-page__third-section-first"
          src="/images/5.svg"
          alt="Description"
        />

        <img
          className="main-page__third-section-second"
          src="/images/4.svg"
          alt="Description"
        />
      </div>

      <div className="main-page__third-section-animal-container">
        <img src="/images/9.svg" alt="Description" />
      </div>
    </div>
  );
};
