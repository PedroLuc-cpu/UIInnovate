import { AxiosResponse } from "axios";

/**
 * intercepta o response antes de serem manipuladas pelo then ou catch
 * @param response
 * @returns
 */
export const responseInterceptors = (response: AxiosResponse) => {
	return response;
};
