import { ROUTES } from "@/routes/routes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "@/App";
import { SheltersApi } from "@/generated-client";
import { CreateShelterDto } from "@/generated-client/api";
import "./ShelterCreate.css";

export const ShelterCreate: React.FC = () => {
  const navigate = useNavigate();
  const [shelter, setShelter] = useState<CreateShelterDto>({
    name: "",
    description: "",
    imageUrl: "",
    country: "",
    region: "",
    district: "",
    city: "",
    street: "",
    apartments: "",
    lng: 0,
    lat: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setShelter((prev) => ({
      ...prev,
      [name]: name === "lng" || name === "lat" ? Number(value) : value,
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShelter((prev) => ({
      ...prev,
      [name]: name === "lng" || name === "lat" ? +value : value,
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
    if (
      !shelter.name.trim() ||
      !shelter.country.trim() ||
      !shelter.city.trim()
    ) {
      alert("Заповніть всі поля");
      return;
    }
    try {
      const apiInstance = new SheltersApi(undefined, "", axiosInstance);
      await apiInstance.apiSheltersPost(shelter, {
        headers: { "Content-Type": "application/json" },
      });
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
        value={shelter.country}
        onChange={handleAddressChange}
      />
      <input
        type="text"
        name="city"
        placeholder="City/Village"
        className="shelter-create__input"
        value={shelter.city}
        onChange={handleAddressChange}
      />
      <input
        type="text"
        name="street"
        placeholder="Street"
        className="shelter-create__input"
        value={shelter.street}
        onChange={handleAddressChange}
      />
      <input
        type="text"
        name="apartments"
        placeholder="Apartments"
        className="shelter-create__input"
        value={shelter.apartments}
        onChange={handleAddressChange}
      />
      <button onClick={handleSubmit} className="shelter-create__button">
        Create
      </button>
    </div>
  );
};
