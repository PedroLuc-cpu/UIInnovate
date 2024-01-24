import { AxiosError } from 'axios'

/**
 * intercepta o erro antes de serem manipuladas pelo then ou catch
 * @param error
 * @returns
 */
export const erroInterceptor = (error: AxiosError) => {
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Ocorreu um erro de conexão!'))
  }
  if (error.response?.status === 401) {
    //
  }
  return Promise.reject(error)
}
