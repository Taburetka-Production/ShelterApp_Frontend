import { Link } from "react-router-dom";
import "../../styles/components/mainPage/ThirdSection.css";
import { Button } from "../button/Button";
import { ROUTES } from "@/routes/routes";
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

        <Link
          to={ROUTES.SHELTERS_PAGE}
          className="no-text-decoration"
          role="button"
        >
          <Button className="main-page__third-section-btn">
            Дізнатися більше
          </Button>
        </Link>
      </div>

      <div className="main-page__third-section-animal-container">
        <img src="/images/CatInArm.svg" alt="Description" />
      </div>
    </div>
  );
};
