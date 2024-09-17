import { IClient } from '../types';
import axios from '../utils/axios';
import { AxiosResponse } from 'axios';

export const AddClient = async (formData: IClient) => {
	const { data } = (await axios.post('client', formData, {
		withCredentials: true,
	})) as AxiosResponse;
	return data;
};

export const UpdateClient = async (formData: IClient) => {
	const { data } = (await axios.patch(
		`client/${formData._id}/update`,
		formData,
		{ withCredentials: true }
	)) as AxiosResponse;
	return data;
};

export const GetClients = async () => {
	// console.log('fetch')
	const { data } = (await axios.get('client', {
		withCredentials: true,
	})) as AxiosResponse;
	return data?.data as IClient[];
};
export const DeleteClient = async (formData: IClient | IClient[]) => {
	if (!Array.isArray(formData)) {
		const { data } = (await axios.delete(`client/${formData._id}/delete`, {
			withCredentials: true,
		})) as AxiosResponse;
		return data;
	} else {
		if (formData.length === 1) {
			const { data } = (await axios.delete(`client/${formData[0]._id}/delete`, {
				withCredentials: true,
			})) as AxiosResponse;
			return data;
		}
		const { data } = (await axios.delete(`client/many/delete`, {
			data: { data: formData.map((client) => client._id) },
			withCredentials: true,
		})) as AxiosResponse;
		return data;
	}
};
