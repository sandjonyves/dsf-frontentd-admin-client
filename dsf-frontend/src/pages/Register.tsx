import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import {  RegisterUser } from '../service/UserService';
import { getErrorMessage, getSuccessMessage } from '../utils/getMessage';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../types';

let emptyUser: IUser = {
	email: '',
	password: '',
  name:''
};

const formSchema = z.object({
	password: z.string().min(1, {
		message: 'Obligatoire',
	}),
	name: z.string().min(3, {
		message: 'Le nom doit contenir au moins 3 caractères',
	}),
	email: z
		.string()
		.min(1, {
			message: 'Obligatoire',
		})
		.email('Adresse email invalide'),
});

function RegisterForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false);


	const { showToast } = useToast();
  const navigate = useNavigate()
	const {
		handleSubmit,
		control,
		setError,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: emptyUser,
	});

	const onSubmit = async (formData: IUser) => {
		setIsLoading(true);
		try {
			const data = await RegisterUser(formData);
			showToast({
				severity: 'success',
				summary: 'Succès',
				message: getSuccessMessage(data),
				life: 3000,
			});
			reset(emptyUser);
      navigate('/auth/login')
		} catch (error) {
			const cleanedError = getErrorMessage(error);
			if (cleanedError instanceof Array) {
				setError(cleanedError[0], {
					message: cleanedError[1],
				});
				showToast({
					severity: 'error',
					summary: 'Echec',
					message: '',
					life: 3000,
				});
			} else {
				showToast({
					severity: 'error',
					summary: 'Echec',
					message: cleanedError,
					life: 3000,
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full min-h-screen flex flex-col justify-center items-center gap-8 container mx-auto">
			<h1 className="text-gray-700 font-semibold text-2xl">DSF-ADMIN</h1>
			<div className="bg-white px-6 py-10 rounded-md shadow-sm w-full sm:w-[50%] lg:w-[35%]">
        <h2 className='text-center font-semibold text-gray-700 text-lg'>Nouvel Utilisateur</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="p-fluid flex flex-col gap-6">
						<div className="p-field">
							<label htmlFor="email">Adresse email</label>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<InputText
										id={field.name}
										{...field}
										className={errors.email ? 'p-invalid' : ''}
									/>
								)}
							/>
							<small className="p-error">{errors.email?.message}</small>
						</div>
						<div className="p-field">
							<label htmlFor="name">Nom</label>
							<Controller
								name="name"
								control={control}
								render={({ field }) => (
									<InputText
										id={field.name}
										{...field}
										className={errors.name ? 'p-invalid' : ''}
									/>
								)}
							/>
							<small className="p-error">{errors.name?.message}</small>
						</div>

						<div className="p-field">
							<label htmlFor="password">Mot de passe</label>
							<Controller
								name="password"
								control={control}
								render={({ field }) => (
									<Password
										id={field.name}
                    feedback={false}
										{...field}
										toggleMask
										className={errors.password ? 'p-invalid' : ''}
									/>
								)}
							/>
							<small className="p-error">{errors.password?.message}</small>
						</div>
						<Button
							label={'Créer un compte'}
							onClick={() => handleSubmit(onSubmit)()}
							disabled={isLoading}
							loading={isLoading}
						/>
					</div>
				</form>
				<div className='mt-3 text-md'>Vous avez déjà un compte? <a href="/auth/login" className=' underline font-medium' style={{
					color:"var(--primary-color)"
				}} onClick={(e)=>{
					e.preventDefault()
					navigate('/auth/login')
				}}>Connectez vous</a></div>
			</div>
		</div>
	);
}

export default RegisterForm;
