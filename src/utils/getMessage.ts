import { AxiosError } from "axios";



export const getErrorMessage = (params:any):any =>{
  if(params instanceof AxiosError){
    const data = params.response?.data

      if(data && data.message){
        if(data.message === 'ValidationError')
          return [Object.keys(data.errors)[0], Object.values(data.errors)[0]]
        
          return data.message
      }
      return "L'Opération a échouée"
    }
    return "L'Opération a échouée"
}

export const getSuccessMessage = (data:any)=>{
    return data?.message || 'Operation réussie'
}