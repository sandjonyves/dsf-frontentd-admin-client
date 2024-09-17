import { IKey } from '../types';
import axios from '../utils/axios';
import { AxiosResponse } from 'axios';

export const AddKey = async (formData: Partial<IKey>) => {
	const { data } = (await axios.post('key', formData,{withCredentials:true})) as AxiosResponse;
	return data;
};


export const GetKeys = async () => {
	// console.log('fetch')
	const { data } = (await axios.get('key',{withCredentials:true})) as AxiosResponse;
	return data?.data as IKey[];
};
export const DeleteKey = async (formData: Partial<IKey> | Partial<IKey>[]) => {
	if (!Array.isArray(formData)) {
		const { data } = (await axios.delete(
			`key/${formData._id}/delete`
		,{withCredentials:true})) as AxiosResponse;
		return data;
	} else {
		if (formData.length === 1) {
			const { data } = (await axios.delete(
				`key/${formData[0]._id}/delete`
			,{withCredentials:true})) as AxiosResponse;
			return data;
		}
		const { data } = (await axios.delete(`key/many/delete`, {
			data: {data:formData.map(key=>key._id)},
			withCredentials:true
		})) as AxiosResponse;
		return data;
	}
};
