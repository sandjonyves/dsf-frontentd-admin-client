import { useState, useEffect } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { MenuItem } from 'primereact/menuitem';
import ClientsTable from '../sections/dashboard/client/ClientTable';
import KeysTable from '../sections/dashboard/key/KeyTable';
import { useQuery } from '@tanstack/react-query';
import { GetClients } from '../service/ClientService';
import { GetKeys } from '../service/KeyService';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useToast } from '../contexts/ToastContext';
import { useMyLocalStorage } from '../contexts/LocalStorageProvider';
import { IClient, IKey } from '../types';

const Dashboard = () => {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const { showToast } = useToast();
	const navigate = useNavigate();
	const { setCurrentUser } = useMyLocalStorage();
	const items: MenuItem[] = [
		{ label: 'Clients', icon: 'pi pi-fw pi-users' },
		{ label: "Clés d'activation", icon: 'pi pi-fw pi-key' },
	];

	const clientQuery = useQuery<IClient[]>(['clients', 'all'], GetClients, {
		staleTime: 60000,
	});
	const keyQuery = useQuery<IKey[]>(['keys', 'all'], GetKeys, {
		staleTime: 60000,
	});

	useEffect(() => {
    if (clientQuery.isError) {
      if (clientQuery.error instanceof AxiosError) {
        if (clientQuery.error.response?.status === 401) {
          handleSessionExpired();
        }
      }
    }
  }, [clientQuery.isError]);

  const handleSessionExpired = () => {
		setCurrentUser(null);
		showToast({
			severity: 'warn',
			summary: 'Attention',
			message: 'Votre session a expirée veuillez vous reconnecter',
			life: 3000,
		});
		navigate('/auth/login');
  };


	return (
		<>
			<TabMenu
				model={items}
				activeIndex={activeIndex}
				onTabChange={(e) => setActiveIndex(e.index)}
			/>
			<div className="mt-10">
				{activeIndex === 0 ? (
					<>
						<ClientsTable clientQuery={clientQuery} />
					</>
				) : (
					<>
						<KeysTable clientQuery={clientQuery} keyQuery={keyQuery} />
					</>
				)}
			</div>
		</>
	);
};

export default Dashboard;
