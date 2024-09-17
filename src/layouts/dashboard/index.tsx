import { Navigate, Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useMyLocalStorage } from '../../contexts/LocalStorageProvider';

const DashboardLayout = () => {
	const { currentUser } = useMyLocalStorage();

	//if(!currentUser) return <Navigate to={'/auth/login'} />
	

	return (
			<div className="h-screen w-full overflow-hidden flex flex-col">
				<div className="w-full bg-slate-900">
					<NavBar />
				</div>
				<div className="h-screen min-h-full w-full overflow-auto ">
					<div className=" container mx-auto px-4 overflow-hidden pt-5 pb-24 ">
						<Outlet />
					</div>
				</div>
			</div>
	);
};

export default DashboardLayout;
