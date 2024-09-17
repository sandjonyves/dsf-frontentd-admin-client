import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import {
	DeleteKey,
} from '../../../service/KeyService';
import { useToast } from '../../../contexts/ToastContext';
import { getErrorMessage, getSuccessMessage } from '../../../utils/getMessage';
import { IKey } from '../../../types';

type Props = {
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectedKey: React.Dispatch<React.SetStateAction<Partial<IKey> | Partial<IKey>[] | null>>;
	isVisible: boolean;
	selectedKey: Partial<IKey> | Partial<IKey>[] | null;
};

const DeleteKeyDialog = ({
	isVisible,
	setIsVisible,
	selectedKey,
	setSelectedKey,
}: Props) => {
	const queryClient = useQueryClient();
	const { showToast } = useToast();

	const hideDeleteKeyDialog = () => {
		setIsVisible(false);
	};
	const deleteKeyDialogFooter = (
		<React.Fragment>
			<Button
				label="Non"
				icon="pi pi-times"
				outlined
				onClick={hideDeleteKeyDialog}
			/>
			<Button
				label="Oui"
				icon="pi pi-check"
				severity="danger"
				onClick={() => deleteKeyMutation.mutate(selectedKey as Partial<IKey> | Partial<IKey>[])}
			/>
		</React.Fragment>
	);

	const deleteKeyMutation = useMutation({
		mutationFn: (data: Partial<IKey> | Partial<IKey>[]) => {
			return DeleteKey(data);
		},

		onSuccess: (data: any) => {
			setSelectedKey(null);
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
			queryClient.invalidateQueries({ queryKey: ['keys', 'all'] });
		},
	});

	// single item
	if (Array.isArray(selectedKey)) {
		return (
			<Dialog
				visible={isVisible}
				style={{ width: '32rem' }}
				breakpoints={{ '960px': '75vw', '641px': '90vw' }}
				header="Confirmez"
				modal
				footer={deleteKeyDialogFooter}
				onHide={hideDeleteKeyDialog}
			>
				<div className="confirmation-content">
					<i
						className="pi pi-exclamation-triangle mr-3"
						style={{ fontSize: '2rem' }}
					/>
					{selectedKey && (
						<span>
							Voulez-vous vraiment supprimer toutes les clés selectionnées ?
						</span>
					)}
				</div>
			</Dialog>
		);
	} else if (selectedKey !== null) {
		return (
			<Dialog
				visible={isVisible}
				style={{ width: '32rem' }}
				breakpoints={{ '960px': '75vw', '641px': '90vw' }}
				header="Confirmez"
				modal
				footer={deleteKeyDialogFooter}
				onHide={hideDeleteKeyDialog}
			>
				<div className="confirmation-content">
					<i
						className="pi pi-exclamation-triangle mr-3"
						style={{ fontSize: '2rem' }}
					/>
					{selectedKey && (
						<span>
							Voulez-vous vraiment supprimer la clé d'activation de <b>{selectedKey.clientName}</b>?
						</span>
					)}
				</div>
			</Dialog>
		);
	}
	return <></>;
};

export default DeleteKeyDialog;
