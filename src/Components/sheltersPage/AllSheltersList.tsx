import { useEffect, useState } from "react";
import "../../styles/components/sheltersPage/AllSheltersList.css";
import { ShelterCard } from "../shelterCard/ShelterCard";
import { SkeletonCard } from "./SkeletonCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchShelters } from "../../redux/slices/shelterSlice";
import { Shelter } from "../../redux/types";

export const AllSheltersList: React.FC = () => {
  const [visibleShelters, setVisibleShelters] = useState(4);
  const { searchQuery, sortOrder, regions } = useAppSelector(
    (state) => state.search,
  );
  const shelters = useAppSelector((state) => state.shelter.shelters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchShelters());
  }, [dispatch]);

  const pressButton = () => setVisibleShelters((prev) => prev + 8);
  const pressCloseButton = () => setVisibleShelters(4);

  const filteredShelters: Shelter[] = shelters
    .filter((shelter) => {
      const matchesQuery = shelter.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesRegion =
        regions.length === 0 || regions.includes(shelter.address?.city ?? "");
      return matchesQuery && matchesRegion;
    })
    .sort((a, b) =>
      sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating,
    );

  return (
    <div className="main-slider-container">
      <div className="main-shelters-div">
        {filteredShelters.length > 0
          ? filteredShelters.slice(0, visibleShelters).map((shelter) => (
              <div key={shelter.id} className="card-container animation-card">
                <ShelterCard
                  id={shelter.id ?? ""}
                  image={shelter.imageUrl}
                  title={shelter.name}
                  description={shelter.description}
                  rating={shelter.rating}
                  reviews={shelter.reviewsCount}
                  className={``}
                />
              </div>
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
      </div>
      <div className="view-more-shelters-button-container">
        <button onClick={pressButton} className="view-more-shelters-button">
          View more
        </button>
        <button onClick={pressCloseButton} className="close-shelters-button">
          Close
        </button>
      </div>
    </div>
  );
};
