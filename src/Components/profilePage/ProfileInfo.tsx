import { useNavigate } from "react-router-dom";
import { Button } from "../Button";

export const ProfileInfo = (): JSX.Element => {
  const navigate = useNavigate();
  const handleCreateShelter = () => {
    navigate("/shelter-create");
  };

  return <Button onClick={handleCreateShelter}>Create shelter</Button>;
};
