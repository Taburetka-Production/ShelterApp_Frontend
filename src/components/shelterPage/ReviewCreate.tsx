import React, { useState, useCallback, useMemo } from "react";
import { useAppSelector } from "@/redux/hooks";
import { SheltersApi, CreateShelterFeedbackDto } from "@/generated-client/api";
import { axiosInstance } from "@/App";
import { Button } from "../button/Button";
import "./ReviewCreate.css";

interface ReviewCreateProps {
  slug: string;
  onCreated?: () => void;
}

export const ReviewCreate: React.FC<ReviewCreateProps> = ({
  slug,
  onCreated,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAppSelector((state) => state.auth);
  const api = useMemo(() => new SheltersApi(undefined, "", axiosInstance), []);

  const toggleForm = useCallback(() => {
    setError(null);
    setIsOpen((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setIsLoading(true);
      const payload: CreateShelterFeedbackDto = { comment, rating };
      try {
        await api.apiSheltersSlugFeedbackPost(slug, payload, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setComment("");
        setRating(5);
        setIsOpen(false);

        if (onCreated) {
          onCreated();
        } else {
          window.location.reload();
        }
      } catch (err: any) {
        console.error("Не вдалося відправити відгук:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Помилка відправки відгуку",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [slug, comment, rating, api, accessToken, onCreated],
  );

  return (
    <div className="review-create__container">
      <Button onClick={toggleForm}>
        {isOpen ? "Відмінити" : "Залишити відгук"}
      </Button>

      {isOpen && (
        <form className="review-create__form" onSubmit={handleSubmit}>
          <textarea
            placeholder="Ваш відгук"
            className="review-create__textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={4}
          />
          <label className="review-create__rating">
            Оцінка:
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          {error && <div className="error">{error}</div>}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Відправка..." : "Відправити"}
          </Button>
        </form>
      )}
    </div>
  );
};
