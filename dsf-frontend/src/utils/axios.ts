import { BASE_URL } from '../config';
import axios, { AxiosInstance } from 'axios';

const axiosIinstance: AxiosInstance = axios.create({
	baseURL: BASE_URL,
});

axios.interceptors.response.use(
	(response) => response,
	(error) =>
		Promise.reject(
			(error.response && error.response.data) || 'Something went wrong'
		)
);

export default axiosIinstance;
