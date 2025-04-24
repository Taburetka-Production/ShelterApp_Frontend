import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type HealthStatusProps = {
  healthCondition?: string | null;
};

export const HealthStatus: React.FC<HealthStatusProps> = ({
  healthCondition,
}) => {
  const cond = healthCondition?.trim() ?? "";
  const lower = cond.toLowerCase();

  const isHealthy =
    !cond || lower.includes("здоров") || lower.includes("здорова");

  return (
    <span className="health-item">
      {isHealthy ? (
        <FaCheckCircle className="icon-check" />
      ) : (
        <FaTimesCircle className="icon-cross" />
      )}
      <span className="health-text">{isHealthy ? "Здорова" : cond}</span>
    </span>
  );
};
