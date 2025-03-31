import "../../styles/components/mainPage/StatisticSection.css";

export const StatisticSection = () : JSX.Element => {
  
  const data = [
    {
      id: 1,
      number: 20,
      text: "Притулків по всій Україні працюють разом із нами, щоб допомогти тваринам знайти дім",
    },
    {
      id: 2,
      number: 40,
      text: "Тваринок щомісяця отримують новий шанс на життя завдяки вашій підтримці",
    },
    {
      id: 3,
      number: 50,
      text: "Понад 50 небайдужих людей стали спонсорами для тваринок у різних притулках.",
    },
    {
      id: 4,
      number: 65,
      text: "Ми працюємо вже 65 днів, об’єднуючи небайдужих людей та притулки.",
    }];

  return (
    <div className="main-page__statistic-section">
      {data.map((item) => (
        <div key={item.id} className="main-page__statistic-section-item">
          <div className="main-page__statistic-section-item-circle">{item.number}</div>
          <div className="main-page__statistic-section-item-text">{item.text}</div>
        </div>
      ))}
    </div>
  );
};
