import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import {
	DeleteClient,
} from '../../../service/ClientService';
import { useToast } from '../../../contexts/ToastContext';
import { getErrorMessage, getSuccessMessage } from '../../../utils/getMessage';
import { IClient } from '../../../types';

type Props = {
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setClient: React.Dispatch<React.SetStateAction<IClient | IClient[] | null>>;
	isVisible: boolean;
	client: IClient | IClient[] | null;
};

const DeleteClientDialog = ({
	isVisible,
	setIsVisible,
	client,
	setClient,
}: Props) => {
	const queryClient = useQueryClient();
	const { showToast } = useToast();

	const hideDeleteClientDialog = () => {
		setIsVisible(false);
	};
	const deleteClientDialogFooter = (
		<React.Fragment>
			<Button
				label="Non"
				icon="pi pi-times"
				outlined
				onClick={hideDeleteClientDialog}
			/>
			<Button
				label="Oui"
				icon="pi pi-check"
				severity="danger"
				onClick={() => deleteClientMutation.mutate(client as IClient | IClient[])}
			/>
		</React.Fragment>
	);

	const deleteClientMutation = useMutation({
		mutationFn: (data: IClient | IClient[]) => {
			return DeleteClient(data);
		},

		onSuccess: (data: any) => {
			setClient(null);
			showToast({
				severity: 'success',
				summary: 'Opération réussie',
				message: getSuccessMessage(data),
				life: 3000,
			});
		},
		// @ts-ignore
		onError: (error: AxiosError) => {
			const cleanedError = getErrorMessage(error);
			showToast({
				severity: 'error',
				summary: "L'opération a échouée",
				message: cleanedError,
				life: 3000,
			});
		},
		onSettled: () => {
			setIsVisible(false)
			queryClient.invalidateQueries({ queryKey: ['clients','all'] });
		},
	});

	// single item
	if (Array.isArray(client)) {
		return (
			<Dialog
				visible={isVisible}
				style={{ width: '32rem' }}
				breakpoints={{ '960px': '75vw', '641px': '90vw' }}
				header="Confirmez"
				modal
				footer={deleteClientDialogFooter}
				onHide={hideDeleteClientDialog}
			>
				<div className="confirmation-content">
					<i
						className="pi pi-exclamation-triangle mr-3"
						style={{ fontSize: '2rem' }}
					/>
					{client && (
						<span>
							Voulez-vous vraiment supprimer tous les clients selectionnés ?
						</span>
					)}
				</div>
			</Dialog>
		);
	} else if (client !== null) {
		return (
			<Dialog
				visible={isVisible}
				style={{ width: '32rem' }}
				breakpoints={{ '960px': '75vw', '641px': '90vw' }}
				header="Confirmez"
				modal
				footer={deleteClientDialogFooter}
				onHide={hideDeleteClientDialog}
			>
				<div className="confirmation-content">
					<i
						className="pi pi-exclamation-triangle mr-3"
						style={{ fontSize: '2rem' }}
					/>
					{client && (
						<span>
							Voulez-vous vraiment supprimer <b>{client.clientName}</b>?
						</span>
					)}
				</div>
			</Dialog>
		);
	}
	return <></>;
};

export default DeleteClientDialog;
