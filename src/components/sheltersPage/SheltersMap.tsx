import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchShelters } from "@/redux/slices/shelterSlice";
import { useEffect } from "react";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { ShelterMap } from "../map/SheltersMap";

export const SheltersMap = () => {
  const allShelters = useAppSelector((state) => state.shelter.shelters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (allShelters.length === 0) {
      dispatch(fetchShelters());
    }
  }, [dispatch, allShelters.length]);

  return (
    <div>
      <Header></Header>
      <ShelterMap shelters={allShelters}></ShelterMap>
      <Footer></Footer>
    </div>
  );
};
