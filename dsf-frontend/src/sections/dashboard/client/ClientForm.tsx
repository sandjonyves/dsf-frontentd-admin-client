import React, { useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { AddClient, UpdateClient } from '../../../service/ClientService';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '../../../contexts/ToastContext';
import { getErrorMessage, getSuccessMessage } from '../../../utils/getMessage';
import { IClient } from '../../../types';

type Props = {
	client: IClient;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	isVisible: boolean;
};

let emptyClient: IClient = {
	fiscalId: '',
	email: '',
	clientName: '',
	tel: '',
	dbUrl: '',
};

const formSchema = z.object({
	clientName: z.string().min(1, {
		message: 'Obligatoire',
	}),
	fiscalId: z.string().min(1, {
		message: 'Obligatoire',
	}),
	tel: z.string().min(1, {
		message: 'Obligatoire',
	}),
	email: z.custom(
		(value: any) => {
			if (value === null || /^\s*$/.test(value)) {
				return true;
			}
			return z.string().email().safeParse(value).success;
		},
		{
			message: 'Veuillez entrer une adresse valide',
		}
	),
	dbUrl: z.string().min(1, {
		message: 'Obligatoire',
	}).transform((val)=>{
		return val.trim()
	})
});

const ClientForm = ({ client, isVisible, setIsVisible }: Props) => {
	const { _id: clientId, ...clientItem } = client;
	const queryClient = useQueryClient();
	const { showToast } = useToast();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: clientItem,
	});

	const { formState } = form;

	const addOrUpdateClientMutation = useMutation({
		mutationFn: (data: IClient) => {
			if (clientId) return UpdateClient({ ...data, _id: clientId });

			return AddClient({ ...data });
		},

		onSuccess: (data: any) => {
			showToast({
				severity: 'success',
				summary: 'Opération réussie',
				message: getSuccessMessage(data),
				life: 3000,
			});
			form.reset();
			setIsVisible(false);
		},
		// @ts-ignore
		onError: (error: AxiosError) => {
			const cleanedError = getErrorMessage(error);
			if (cleanedError instanceof Array) {
				form.setError(cleanedError[0], {
					message: cleanedError[1],
				});
				showToast({
					severity: 'error',
					summary: "L'opération a échouée",
					message: '',
					life: 3000,
				});
			} else {
				showToast({
					severity: 'error',
					summary: "L'opération a échouée",
					message: cleanedError,
					life: 3000,
				});
			}
		},
		// Always refetch after error or success:
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['clients', 'all'] });
		},
	});

	const hideDialog = () => {
		form.reset(emptyClient);
		setIsVisible(false);
	};

	useEffect(() => {
		if (clientId) {
			form.reset(clientItem);
		}
	}, [clientId, client]);

	const ClientDialogFooter = (
		<React.Fragment>
			<Button
				label="Annuler"
				icon="pi pi-times"
				outlined
				onClick={() => {
					form.reset();
					hideDialog();
				}}
			/>
			<Button
				label="Enregistrer"
				icon="pi pi-check"
				onClick={() => form.handleSubmit(onSubmit)()}
				disabled={addOrUpdateClientMutation.isLoading}
				loading={addOrUpdateClientMutation.isLoading}
			/>
		</React.Fragment>
	);
	const onSubmit = (data: IClient) => {
		addOrUpdateClientMutation.mutate(data);
	};
	return (
		<Dialog
			visible={isVisible}
			style={{ width: '40rem' }}
			breakpoints={{ '960px': '75vw', '641px': '90vw' }}
			header="Info sur le client"
			modal
			className="p-fluid"
			footer={ClientDialogFooter}
			onHide={hideDialog}
		>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex flex-col gap-2">
					<div className="field">
						<label htmlFor="clientName" className="font-bold">
							Nom
						</label>
						<Controller
							name="clientName"
							control={form.control}
							defaultValue=""
							render={({ field }) => <InputText id="clientName" {...field} />}
						/>
						{formState.errors.clientName && (
							<small className="p-error">
								{formState.errors.clientName.message}
							</small>
						)}
					</div>
					<div className="field">
						<label htmlFor="fiscalId" className="font-bold">
							Id Fiscal
						</label>
						<Controller
							name="fiscalId"
							control={form.control}
							defaultValue=""
							render={({ field }) => (
								<InputMask
									id="fiscalId"
									mask="a 9999 9999 9999 a"
									placeholder="A 0067 8098 4578 K"
									{...field}
								/>
							)}
						/>
						{formState.errors.fiscalId && (
							<small className="p-error">
								{formState.errors.fiscalId.message}
							</small>
						)}
					</div>
					<div className="flex gap-2">
						<div className="field flex-1">
							<label htmlFor="tel" className="font-bold">
								Numéro de Téléphone
							</label>
							<Controller
								name="tel"
								control={form.control}
								defaultValue=""
								render={({ field }) => <InputText id="tel" {...field} />}
							/>
							{formState.errors.tel && (
								<small className="p-error">
									{formState.errors.tel.message}
								</small>
							)}
						</div>
						<div className="field flex-1">
							<label htmlFor="email" className="font-bold">
								Adresse email
							</label>
							<Controller
								name="email"
								control={form.control}
								defaultValue=""
								render={({ field }) => <InputText id="email" {...field} />}
							/>
							{formState.errors.email && (
								<small className="p-error">
									{formState.errors.email.message}
								</small>
							)}
						</div>
					</div>
					<div className="field">
					<label htmlFor="email" className="font-bold">
						Adresse de la base de donnée distante
					</label>
					<Controller
						name="dbUrl"
						control={form.control}
						defaultValue=""
						render={({ field }) => <InputText id="dbUrl" {...field} />}
					/>
					{formState.errors.dbUrl && (
						<small className="p-error">{formState.errors.dbUrl.message}</small>
					)}
				</div>
				</div>
			</form>
		</Dialog>
	);
};

export default ClientForm;
