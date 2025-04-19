import { Shelter } from "@/redux/types";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
// import { SheltersApi } from "@/generated-client";
// import { axiosInstance } from "@/App";

export const ShelterCreate: React.FC = () => {
  const navigate = useNavigate();
  const [shelter, setShelter] = useState<Shelter>({
    id: null,
    name: "",
    rating: 0,
    reviewsCount: 0,
    animalsCount: 0,
    description: "",
    imageUrl: "",
    addressId: null,
    slug: "",
    address: {
      id: null,
      country: "",
      city: "",
      street: "",
      apartments: "",
      region: "string",
      district: "string",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setShelter((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShelter((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setShelter((prev) => ({
          ...prev,
          imageUrl: e.target?.result as string,
        }));
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const { id, addressId, address, ...shelterData } = shelter;
    const { id: addressInternalId, ...addressData } = address;

    const formattedShelter = {
      ...shelterData,
      address: addressData,
    };

    try {
      // const apiInstance = new SheltersApi(undefined, "", axiosInstance);
      // await apiInstance.apiSheltersPost(formattedShelter);
      await axios.post(
        "https://localhost:7118/api/Shelters",
        formattedShelter,
        { headers: { "Content-Type": "application/json" } },
      );
      navigate(ROUTES.PROFILE);
    } catch (error) {
      console.log("Помилка:", error);
    }
  };

  return (
    <div className="shelter-page__all-page">
      <h2 className="shelter-page__shelter-name">Create shelter</h2>
      <div className="">
        {shelter.imageUrl ? (
          <img
            src={shelter.imageUrl}
            alt="Shelter"
            className="shelter-page__shelter-image"
          />
        ) : (
          <label className="shelter-create__placeholder">
            <span>Add photo</span>
            <input
              type="file"
              className="shelter-create__file-input"
              onChange={handleImageUpload}
            />
          </label>
        )}
      </div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="shelter-create__input"
        value={shelter.name}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        className="shelter-create__input"
        value={shelter.description}
        onChange={handleChange}
      ></textarea>
      <input
        type="text"
        name="country"
        placeholder="Country"
        className="shelter-create__input"
        value={shelter.address.country}
        onChange={handleAddressChange}
      />
      <input
        type="text"
        name="city"
        placeholder="City/Village"
        className="shelter-create__input"
        value={shelter.address.city}
        onChange={handleAddressChange}
      />
      <input
        type="text"
        name="street"
        placeholder="Street"
        className="shelter-create__input"
        value={shelter.address.street}
        onChange={handleAddressChange}
      />
      <input
        type="text"
        name="apartments"
        placeholder="Apartments"
        className="shelter-create__input"
        value={shelter.address.apartments}
        onChange={handleAddressChange}
      />
      <button onClick={handleSubmit} className="shelter-create__button">
        Create
      </button>
    </div>
  );
};
