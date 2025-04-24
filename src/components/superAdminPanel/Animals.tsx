import { axiosInstance } from "@/App";
import { Animal, AnimalsApi } from "@/generated-client";
import { useAppSelector } from "@/redux/hooks";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export const Animals: React.FC = () => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      const api = new AnimalsApi(undefined, "", axiosInstance);
      try {
        const response = (await api.apiAnimalsGet({
          headers: { Authorization: `Bearer ${accessToken}` },
        })) as AxiosResponse<Animal[]>;
        setAnimals(response.data);
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };
    fetchAnimals();
  }, [accessToken]);

  return (
    <div>
      <div className="panel super-admin-header">
        <h2>Список тваринок</h2>
        <div className="panel super-admin-controls">
          <div className="panel super-admin-search-filter">
            <input type="text" placeholder="Search" />
            <select>
              <option>Фільтри</option>
            </select>
          </div>
        </div>
      </div>
      <table className="panel super-admin-users-table">
        <thead>
          <tr>
            <th>Назва</th>
            <th>Вид</th>
            <th>Порода</th>
            <th>Стать</th>
            <th>Вік</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => {
            console.log(animal);
            return (
              <tr key={animal.id}>
                <td>{animal.name}</td>
                <td>{animal.species}</td>
                <td>{animal.breed}</td>
                <td>{animal.sex}</td>
                <td>{animal.age}</td>
                <td>
                  <button className="panel super-admin-action-btn">
                    Delete
                  </button>
                  <button className="panel super-admin-action-btn delete">
                    Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
