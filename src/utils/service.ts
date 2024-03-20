import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'

interface CustomResponse<T> extends AxiosResponse<T> {}

class AxiosService {
  private instance: AxiosInstance
  public language: string = 'fa'
  constructor() {
    this.instance = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })

    this.requestInterceptor = this.requestInterceptor.bind(this)
    this.responseInterceptor = this.responseInterceptor.bind(this)

    this.instance.interceptors.request.use(this.requestInterceptor)
    this.instance.interceptors.response.use(this.responseInterceptor, this.errorInterceptor)
  }

  private requestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    config.headers['lang'] = this.language
    return config
  }

  private responseInterceptor<T>(response: AxiosResponse<T>): CustomResponse<T> {
    return response as CustomResponse<T>
  }

  private errorInterceptor(error: any): Promise<any> {
    console.log(error)
    if ((error.response.status as number) == 404) {
      return Promise.reject({
        message: 'ادرس مورد استفاده اشتباه میباشد'
      })
    }
    if ((error.response.status as number) == 400) {
      return Promise.reject({
        message: 'لطفا تمام ورودی ها را وارد کنید با تشکر :)'
      })
    }
    return Promise.reject(error)
  }
  async fetchData(endpoint: string): Promise<any> {
    const response = await this.instance.get<any>(`/api/v1/${endpoint}`)
    return response.data
  }

  async createData(endpoint: string, data: any): Promise<any> {
    const response = await this.instance.post<any>(`/api/v1/${endpoint}`, data)
    return response.data
  }

  async updateData(endpoint: string, id: string, data: Partial<any>): Promise<any> {
    const response = await this.instance.put<any>(`/api/v1/${endpoint}/${id}`, data)
    return response.data
  }

  async deleteData(endpoint: string, id: string): Promise<void> {
    await this.instance.delete(`/api/v1/${endpoint}/${id}}`)
  }

  getInstance(): AxiosInstance {
    return this.instance
  }
}

export const axiosService = new AxiosService()
