import { FirstSection } from "./FirstSection";
import "../../styles/components/mainPage/MainContent.css";
import { SecondSection } from "./SecondSection";
import { ThirdSection } from "./ThirdSection";
import { StatisticSection } from "./StatisticSection";

export const MainContent = () : JSX.Element => {
  return (
    <div className="all-mainpage-sections">
      <FirstSection></FirstSection>
      <StatisticSection></StatisticSection>
      {/* <SecondSection></SecondSection> */}
      <ThirdSection></ThirdSection>
    </div>
  );
};
