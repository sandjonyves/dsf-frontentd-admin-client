import { Navigate, createBrowserRouter } from 'react-router-dom';

import DashboardLayout from './layouts/dashboard';
import AuthLayout from './layouts/main';
import Page404 from './pages/404';
import {Dashboard, Register, Login} from './pages';
        

const router = createBrowserRouter([
	{
		path: '/',
		element: <DashboardLayout />,
		children: [
			{ element: <Navigate to={'/app'} replace />, index: true },
			{ path: '/app', element: <Dashboard /> },
		],
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{ path: 'login', element: <Login /> },
			{ path: 'register', element: <Register /> },
		],
	},
	{ path: '404', element: <Page404 /> },
	{ path: '*', element: <Navigate to="/404" replace /> },

]);

export default router;
