import { IUser } from '../types';
import axios from '../utils/axios';
import { AxiosResponse } from 'axios';

export const RegisterUser = async (formData: IUser) => {
	const { data } = (await axios.post('user', formData, {
		withCredentials: true,
	})) as AxiosResponse;
	return data;
};

export const LoginUser = async (formData: IUser) => {
	const { data } = (await axios.post('user/auth', formData, {
		withCredentials: true,
	})) as AxiosResponse;
	return data;
};

export const LogoutUser = async () => {
	const { data } = (await axios.post('user/logout',{},{withCredentials:true})) as AxiosResponse;
	return data;
};
