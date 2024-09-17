import { useNavigate } from 'react-router-dom';
import { LogoutUser } from '../service/UserService';
import { getErrorMessage, getSuccessMessage } from '../utils/getMessage';
import { useToast } from '../contexts/ToastContext';
import { useMyLocalStorage } from '../contexts/LocalStorageProvider';

const NavBar = () => {
	const navigate = useNavigate();
	const { showToast } = useToast();
	const { setCurrentUser } = useMyLocalStorage();

	const handleLogout = async () => {
		try {
			const data = await LogoutUser();
			showToast({
				severity: 'success',
				summary: 'Succès',
				message: getSuccessMessage(data),
				life: 3000,
			});
			setCurrentUser(null);
			navigate('/auth/login');
		} catch (error) {
			const cleanedError = getErrorMessage(error);
			showToast({
				severity: 'error',
				summary: 'Echec',
				message: cleanedError,
				life: 3000,
			});
		}
	};

	return (
		<div className="w-full h-[68px]  flex container  mx-auto px-4  items-center justify-between ">
			<h1 className="logo text-3xl font-extrabold text-primary">DSF-ADMIN</h1>
			<div onClick={() => handleLogout()} className="flex items-center gap-2 text-red-500 text-lg font-semibold  cursor-pointer">
				<span >Logout</span>
				<i className="pi pi-sign-out pi-pi-sign-out text-[13px]"></i>
			</div>
		</div>
	);
};

export default NavBar;
