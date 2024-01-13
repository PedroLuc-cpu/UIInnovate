import axios from "axios";
import { Environments } from "../../env";
import { erroInterceptor, responseInterceptors } from "./interceptos";

export const API = axios.create({
	baseURL: Environments.URL_BASE,
	responseType: "json",
});

API.interceptors.response.use(
	(response) => responseInterceptors(response),
	(erro) => erroInterceptor(erro)
);
