import React, { useState } from "react";
import { SheltersApi } from "@/generated-client";
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

  const api = new SheltersApi(undefined, "", axiosInstance);

  const toggleForm = () => {
    setError(null);
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await api.apiSheltersSlugFeedbackPost(slug, {
        comment,
        rating,
      });
      setComment("");
      setRating(5);
      setIsOpen(false);
      onCreated?.();
    } catch (err: any) {
      console.error("Не вдалося відправити відгук:", err);
      setError(err.response?.data?.message || "Не вдалося відправити відгук");
    } finally {
      setIsLoading(false);
    }
  };

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
          {error && <p className="error">{error}</p>}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Відправка..." : "Відправити"}
          </Button>
        </form>
      )}
    </div>
  );
};
