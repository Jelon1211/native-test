import { useGlobalContext } from "../../context/GlobalProvider";
import Discover from "@/components/profile/Discover";
import LoggedUser from "@/components/profile/LoggedUser";

const Profile = () => {
  const { isLogged } = useGlobalContext();

  if (!isLogged) {
    return <Discover />;
  }

  return <LoggedUser />;
};

export default Profile;
