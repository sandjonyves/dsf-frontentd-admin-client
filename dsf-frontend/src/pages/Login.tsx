import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LoginUser } from '../service/UserService';
import { getErrorMessage, getSuccessMessage } from '../utils/getMessage';
import { useToast } from '../contexts/ToastContext';
import { useNavigate } from 'react-router-dom';
import { useMyLocalStorage } from '../contexts/LocalStorageProvider';
import { IUser } from '../types';

let emptyUser: IUser = {
	email: '',
	password: '',
};

const formSchema = z.object({
	password: z.string().min(1, {
		message: 'Obligatoire',
	}),
	email: z
		.string()
		.min(1, {
			message: 'Obligatoire',
		})
		.email('Adresse email invalide'),
});

function LoginForm() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { setCurrentUser } = useMyLocalStorage();


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
			const data = await LoginUser(formData);
			showToast({
				severity: 'success',
				summary: 'Succès',
				message: getSuccessMessage(data),
				life: 3000,
			});
      setCurrentUser(data.data as IUser)
			reset(emptyUser);
      navigate('/app')
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
			<h2 className='text-center font-semibold text-gray-700 text-lg'>Connexion</h2>
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
							label={'Se connecter'}
							onClick={() => handleSubmit(onSubmit)()}
							disabled={isLoading}
							loading={isLoading}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginForm;
