import React, { useEffect, useState } from "react";
import { AnimalsApi } from "@/generated-client";
import { axiosInstance } from "@/App";
import { useAppSelector } from "@/redux/hooks";
import { AccountApi } from "@/generated-client";

export const Favorites: React.FC = () => {
  // const { accessToken } = useAppSelector((state) => state.auth.accessToken);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const api = new AnimalsApi(undefined, "", axiosInstance);
  //   api
  //     .apiAnimalsGet()
  //     .then((all) => {
  //       setFavorites(all.filter((a) => a.isSaved));
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setError("Не вдалося завантажити улюблені тварини");
  //     })
  //     .finally(() => setLoading(false));
  // }, [accessToken]);

  // if (loading) return <p>Завантаження улюблених…</p>;
  // if (error) return <p className="error">{error}</p>;
  // if (favorites.length === 0) return <p>У вас поки немає улюблених тварин.</p>;

  return (
    // <div className="favorites-grid">
    //   {favorites.map((a) => (
    //     <div key={a.id} className="animal-card">
    //       {a.photos?.[0]?.photoUrl && (
    //         <img src={a.photos![0].photoUrl} alt={a.name} />
    //       )}
    //       <h3>{a.name}</h3>
    //       <p>Вік: {a.age}</p>
    //     </div>
    //   ))}
    // </div>
    <div>your favorites</div>
  );
};
