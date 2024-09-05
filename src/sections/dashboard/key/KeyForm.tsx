import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import {  useQueryClient, useMutation } from '@tanstack/react-query';
import {
	AddKey,
} from '../../../service/KeyService';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useToast } from '../../../contexts/ToastContext';
import { getErrorMessage, getSuccessMessage } from '../../../utils/getMessage';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { IKey } from '../../../types';

type Props = {
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	isVisible: boolean;
	clientsValues:{
		label:string,
		value:string
	}[]
};

let emptyKey = {
	numberOfdays:30,
	clientId:'',
};

const formSchema = z.object({
	numberOfdays:z.coerce.number({
		required_error: 'Obligatoire',
	}),
	clientId: z.string().min(1, {
		message: 'Obligatoire',
	}),
	
});

const KeyForm = ({  isVisible, setIsVisible, clientsValues }: Props) => {
	
	const queryClient = useQueryClient();
	const { showToast } = useToast();
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues:emptyKey,
	});

	const { formState } = form;

	const addOrUpdateKeyMutation = useMutation({
		mutationFn: (data: Partial<IKey>) => {
			return AddKey({ ...data });
		},

		onSuccess: (data: any) => {
			showToast({
				severity: 'success',
				summary: 'Opération réussie',
				message: getSuccessMessage(data),
				life: 3000,
			});
			form.reset()
			setIsVisible(false)
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
			queryClient.invalidateQueries({ queryKey: ['keys', 'all'] });
		},
	});

	const hideDialog = () => {
		form.reset(emptyKey)
		setIsVisible(false);
	};

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
				disabled={addOrUpdateKeyMutation.isLoading}
				loading={addOrUpdateKeyMutation.isLoading}
			/>
		</React.Fragment>
	);
	const onSubmit = (data:Partial<IKey>) => {
		addOrUpdateKeyMutation.mutate(data);
	};
	return (
		<Dialog
			visible={isVisible}
			style={{ width: '32rem' }}
			breakpoints={{ '960px': '75vw', '641px': '90vw' }}
			header="Info sur la clé d'activation"
			modal
			className="p-fluid"
			footer={ClientDialogFooter}
			onHide={hideDialog}
		>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="field">
					<label htmlFor="clientName" className="font-bold">
						Client
					</label>
					<Controller
						name="clientId"
						control={form.control}
						defaultValue=""
						render={({ field, fieldState }) => (
							<Dropdown
									id={field.name} 
									placeholder="Selectionner le client"
									value={field.value}
									options={clientsValues}
									focusInputRef={field.ref}
									onChange={(e) => field.onChange(e.value)}
									className={classNames({ 'p-invalid': fieldState.error })}
									filter
							/>
					)}
					/>
					{formState.errors.clientId && (
						<small className="p-error">
							{formState.errors.clientId.message}
						</small>
					)}
				</div>
				<div className="field mt-4">
					<label htmlFor="fiscalId" className="font-bold">
						Nombre de jours de validité
					</label>
					<Controller
						name="numberOfdays"
						control={form.control}
						render={({ field, fieldState }) => (
							<>
									<InputNumber id={field.name} inputRef={field.ref} value={field.value} onBlur={field.onBlur} onValueChange={(e) => field.onChange(e)} useGrouping={false} inputClassName={classNames({ 'p-invalid': fieldState.error })}
										prefix="Expire dans " suffix=" jours" mode='decimal' showButtons decrementButtonClassName='bg-primary-color' incrementButtonClassName='bg-primary-color' min={30} max={365}
									/>
							</>
					)}
					/>
					{formState.errors.numberOfdays && (
						<small className="p-error">
							{formState.errors.numberOfdays.message}
						</small>
					)}
				</div>
			</form>
		</Dialog>
	);
};

export default KeyForm;
