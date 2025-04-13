import { axiosInstance } from "@/App";
import { StatisticsApi } from "@/generated-client";
import "@/styles/components/mainPage/StatisticSection.css";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaHeartbeat, FaHome, FaPaw } from "react-icons/fa";
import { StatisticItem } from "./StatisticItem";

interface StatisticsData {
  totalshelters: number;
  totalanimals: number;
  totalusers: number;
  totalregions: number;
  totaladoptions: number;
  initiativeDays: number;
}

export const StatisticSection = (): JSX.Element => {
  const [data, setData] = useState<StatisticsData | null>(null);

  useEffect(() => {
    const fetchStatistic = async () => {
      try {
        const apiInstance = new StatisticsApi(undefined, "", axiosInstance);
        const response =
          (await apiInstance.apiStatisticsGet()) as unknown as AxiosResponse<StatisticsData>;
        setData(response.data);
      } catch (error: any) {
        console.error("Помилка:", error);
      }
    };
    fetchStatistic();
  }, []);

  const iconClass = "main-page__statistic-icon";

  return (
    <div className="main-page__statistic-section">
      <StatisticItem
        count={data?.totalshelters}
        label="Загальна кількість притулків, з якими ми співпрацюємо!"
        icon={<FaHome className={iconClass} />}
      />
      <StatisticItem
        count={data?.totalanimals}
        label="Загальна кількість тваринок, яких Ви можете забрати прямо зараз!"
        icon={<FaPaw className={iconClass} />}
      />
      <StatisticItem
        count={data?.totaladoptions}
        label="Кількість тваринок, які знайшли своїх власників"
        icon={<FaHeartbeat className={iconClass} />}
      />
      <StatisticItem
        count={data?.initiativeDays}
        label="Днів поспіль ми допомагаємо тваринкам"
        icon={<FaCalendarAlt className={iconClass} />}
      />
    </div>
  );
};
