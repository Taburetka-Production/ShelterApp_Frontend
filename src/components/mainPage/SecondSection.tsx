import { Link } from "react-router-dom";
import "../../styles/components/mainPage/SecondSection.css";
import { Button } from "../button/Button";
import { ROUTES } from "@/routes/routes";

export const SecondSection = (): JSX.Element => {
  return (
    <div className="main-page__second-section">
      <div className="main-page__second-section-animal-container">
        <img src="/images/Dog.svg" alt="Description" />
      </div>

      <div className="main-page__second-section-group">
        <h1>Будинок тепла для кожного хвостика</h1>
        <div className="main-page__second-section-text">
          Наша ініціатива покликана дарувати безпритульним тваринам безпечний
          прихисток, кваліфікований медичний догляд і справжній дім. Ми
          об’єднуємо волонтерів, благодійників та місцеві спільноти, щоб кожен
          котик, песик чи інший пухнастий друг отримав любов і турботу, яких
          заслуговує. Приєднуйтесь до нас — разом ми знайдемо для них найкращі
          родини!
        </div>
        <Link to={ROUTES.SHELTERS_PAGE} className="no-text-decoration">
          <Button className="main-page__second-section-btn">
            Відвідати притулки
          </Button>
        </Link>
      </div>
    </div>
  );
};
