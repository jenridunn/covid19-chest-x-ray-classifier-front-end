import {useState} from 'react'
import apiHandlerClass from '../classes/apiHandlerClass'


export  interface FileState {
    file: []
}

export  interface PreviewImageFile {
  preview: string
}


const useImageHandler = () => {
    
      interface diagnosisResponse {
        response: string
      }
      
      type covid19Diagnosis = string | undefined
    
      const [bodyFormData, setBodyFormData]:
        [FileState, (bodyFormData: FileState) => void] = useState<FileState>({ file: [] })
    
      const [previewImage, setPreviewImage]: [
        PreviewImageFile, (previewImage: PreviewImageFile) => void
      ] = useState<PreviewImageFile>({ preview: "" })
    
      const [diagnosis, setDiagnosis]: [covid19Diagnosis, (diagnosis: covid19Diagnosis) => void] = useState<covid19Diagnosis>()
    
      const [isLoading, setIsLoading]: [boolean, (isLoading: boolean) => void] = useState<boolean>(false)
    
      const sendDataHandler = async () => {
        const postData = new apiHandlerClass("post", "http://18.116.97.140/v1/image", bodyFormData, "multipart/form-data", setIsLoading)
        const response: diagnosisResponse = await postData.makeRequest()
        setDiagnosis(response.response)
      }
    
      const cleanerDataHandler = () => {
        setDiagnosis(undefined)
        setBodyFormData({ file: [] })
      }

      const toolbox = {
        functions:{
            sendDataHandler: sendDataHandler,
            cleanerDataHandler: cleanerDataHandler,
        },
        states:{
            diagnosis:diagnosis,
            isLoading:isLoading,
            bodyFormData:bodyFormData,
            previewImage:previewImage,

        },
        setStates:{
            setPreviewImage:setPreviewImage,
            setBodyFormData:setBodyFormData,
        }
      }

    return toolbox
}
 
export default useImageHandler