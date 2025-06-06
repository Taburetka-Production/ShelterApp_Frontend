import { ROUTES } from "@/routes/routes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchShelters } from "@/redux/slices/shelterSlice";

export const Shelters = () => {
  // const [shelters, setShelters] = useState<Shelter[]>([]);
  const shelters = useAppSelector((state) => state.shelter.shelters);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchShelters());
  }, [dispatch]);

  return (
    <div>
      <div className="panel super-admin-header">
        <h2>Список притулків</h2>
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
            <th>Лого</th>
            <th>Назва</th>
            <th>Рейтинг</th>
            <th>Кількість відгуків</th>
            <th>Кількість тваринок</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {shelters.map((shelter) => (
            <tr key={shelter.id}>
              <td>
                <img src={shelter.imageUrl} alt="shelter img" />
              </td>
              <td>{shelter.name}</td>
              <td>{Math.round(shelter.rating * 10) / 10}</td>
              <td>{shelter.reviewsCount}</td>
              <td>{shelter.animalsCount}</td>
              <td>
                <button
                  className="panel super-admin-action-btn"
                  // onClick={() => handleDelete(shelter.id)}
                >
                  Delete
                </button>
                <button
                  className="panel super-admin-action-btn delete"
                  onClick={() => navigate(`${ROUTES.SHELTER}/${shelter.slug}`)}
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
