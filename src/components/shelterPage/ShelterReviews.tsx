import { ShelterFeedbackDto } from "@/generated-client";
import "./ShelterReviews.css";
interface ShelterReviewsProps {
  feedbacks: ShelterFeedbackDto[];
}

export const ShelterReviews: React.FC<ShelterReviewsProps> = ({
  feedbacks,
}) => {
  return (
    <div>
      {feedbacks.map((feedback) => (
        <div key={feedback.createdAtUtc} className="shelter-review">
          <p className="shelter-review__author">
            {feedback?.user?.avatarUrl && (
              <img src={feedback?.user?.avatarUrl || ""} alt="user avatar" />
            )}
            {feedback?.user?.username}
          </p>
          <p className="shelter-review__text">{feedback.comment}</p>
          <p className="shelter-review__date">
            {new Date(feedback.createdAtUtc!).toLocaleString("uk-UA", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>
        </div>
      ))}
      {feedbacks.length === 0 && (
        <p className="shelter-review__no-feedback">Відгуків немає</p>
      )}
    </div>
  );
};
