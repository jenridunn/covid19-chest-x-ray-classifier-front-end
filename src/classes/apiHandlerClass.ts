import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
declare module 'axios' {
    interface AxiosResponse<T = any> extends Promise<T> {}
  }

export type methodTypes = "post"|"patch"|"put"|"delete"|"get"
  
class apiHandlerClass{
        private readonly method:methodTypes
        private readonly url:string
        private readonly payload:any
        private readonly typeOfData:any
        private readonly dataHandler:Function
        private readonly errorHandler:Function
        private readonly instance: AxiosInstance

        constructor(
            method:methodTypes,
            url:string,
            payload:any,
            typeOfData:any,
            dataHandler=(data:AxiosResponse)=>data,
            errorHandler=(err:any)=>console.log(err)
            ) {
            this.method = method
            this.url = url
            this.payload = payload
            this.typeOfData = typeOfData
            this.dataHandler = dataHandler
            this.errorHandler =errorHandler
            this.instance = axios.create({
                url,
              })
            this._initializeInterceptors()
        }

        private _initializeInterceptors = () => {
            this.instance.interceptors.response.use(
              this._handleResponse,
              this._handleError,
            )
            this.instance.interceptors.request.use(
                this._handleRequest,
                this._handleError,
            )
          }
     
        private _handleResponse = ({ data }: AxiosResponse) => this.dataHandler(data)

        private _handleError = (error: any) => {
            Promise.reject(error)
            this.errorHandler(error)
        }

        private _handleRequest = (config: AxiosRequestConfig) => {
            if (this.method!=="get"){
            if(this.payload && !this.typeOfData){
                config.headers["Content-Type"] = "application/json"
            }else if(this.payload && this.typeOfData){
                config.headers["Content-Type"] = this.typeOfData
            }
        }
            return config;
          }

        private _handleDataByType = (payload:any):object =>{
            if(this.typeOfData==="multipart/form-data"){
                let formData = new FormData()
                    for (let key in payload) {
                        if (key.toString() === "file") {
                            for (const file of payload[key]) {
                                formData.append(key.toString(), file)
                            }
                    }else{
                        formData.append(key.toString(), payload[key])
                    }
                }
                return formData
            }else{
                return payload
            }
        }

        public makeRequest = async () =>{
            if (this.method!=="get"){
                //Use return await ... to return a value in the data / error handler (you should also return something in these functions)
                if(!this.payload){
                    throw new Error("Payload needed")
                }else{
                    if(this.method==="post"){
                        return await this.instance.post(this.url, this._handleDataByType(this.payload))
                    }else if(this.method==="put"){
                        return await this.instance.put(this.url, this._handleDataByType(this.payload))
                    }else if(this.method==="patch"){
                        return await this.instance.patch(this.url,this._handleDataByType(this.payload))
                    }else if(this.method==="delete"){
                        return await this.instance.delete(this.url, this._handleDataByType(this.payload))
                    }
                }
            }else{
                return await this.instance.get(this.url)
            }
        }

    }


 
export default apiHandlerClass;