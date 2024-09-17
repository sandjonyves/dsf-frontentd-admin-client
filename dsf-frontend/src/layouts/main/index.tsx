import { Navigate, Outlet } from "react-router-dom";
import { useMyLocalStorage } from "../../contexts/LocalStorageProvider";

const MainLayout = () => {
	const { currentUser } = useMyLocalStorage();
	if(currentUser) return <Navigate to={'/app'} />

  return (
    
    <div className="bg-[#f4f4f4] ">
      <Outlet />
    </div>
    
  );
};

export default MainLayout;
