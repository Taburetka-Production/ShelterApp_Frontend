import "@/styles/components/mainPage/MainContent.css";
import { FirstSection } from "./FirstSection";
import { SecondSection } from "./SecondSection";
import { StatisticSection } from "./StatisticSection";
import { ThirdSection } from "./ThirdSection";

export const MainContent = (): JSX.Element => {
  return (
    <div className="all-mainpage-sections">
      <FirstSection></FirstSection>
      <StatisticSection></StatisticSection>
      <SecondSection></SecondSection>
      <ThirdSection></ThirdSection>
    </div>
  );
};
