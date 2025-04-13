import React from "react";

interface StatisticItemProps {
  count: number | null | undefined;
  label: string;
  icon: React.ReactNode;
}

export const StatisticItem = ({
  count,
  label,
  icon,
}: StatisticItemProps): JSX.Element => {
  const displayCount = count ?? 0;

  return (
    <div className="main-page__statistic-card-alt">
      <div className="main-page__statistic-card-alt__icon-wrapper">{icon}</div>
      <div className="main-page__statistic-card-alt__content">
        <span className="main-page__statistic-card-alt__count">
          {displayCount}
        </span>
        <p className="main-page__statistic-card-alt__label">{label}</p>
      </div>
    </div>
  );
};
