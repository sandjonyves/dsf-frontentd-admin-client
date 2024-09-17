import React from 'react';
import ReactDOM from 'react-dom/client';
import appRouter from './App.tsx';
//theme
import 'primereact/resources/themes/lara-light-indigo/theme.css';
//core
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastProvider } from './contexts/ToastContext';
import { LocalStorageProvider } from './contexts/LocalStorageProvider';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<ToastProvider>
					<LocalStorageProvider>
						<RouterProvider router={appRouter} />
					</LocalStorageProvider>
				</ToastProvider>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
	</React.StrictMode>
);
