import * as React from 'react'
import { CgDanger } from 'react-icons/cg'
import { RiVirusFill } from 'react-icons/ri'
import apiHandlerClass from './classes/apiHandlerClass'
import Button from './components/Button'
import Dropzone from './components/Dropzone'

const App: React.FC = () => {

  interface fileState {
    file: []
  }

  interface apiResponse {
    response: string
  }

  interface previewImageFile {
    preview: string
  }

  type covid19Diagnosis = string | undefined

  const [bodyFormData, setBodyFormData]:
    [fileState, (bodyFormData: fileState) => void] = React.useState<fileState>({ file: [] })

  const [previewImage, setPreviewImage]: [
    previewImageFile, (previewImage: previewImageFile) => void
  ] = React.useState<previewImageFile>({ preview: "" })

  const [diagnosis, setDiagnosis]: [covid19Diagnosis, (diagnosis: covid19Diagnosis) => void] = React.useState<covid19Diagnosis>()

  const [isLoading, setIsLoading]: [boolean, (isLoading: boolean) => void] = React.useState<boolean>(false)

  const sendDataHandler = async () => {
    const postData = new apiHandlerClass("post", "http://localhost:8000/v1/image", bodyFormData, "multipart/form-data", setIsLoading)
    const response: apiResponse = await postData.makeRequest()
    setDiagnosis(response.response)
  }

  const cleanerDataHandler = () => {
    setDiagnosis(undefined)
    setBodyFormData({ file: [] })
  }

  const checkCovidResponse = diagnosis && diagnosis === "covid19negative" ? "Negative" : "Positive"

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5 md:my-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center flex-col">
          <span className="text-4xl text-green-500 p-3 bg-green-100 rounded-lg mb-3"><RiVirusFill /></span>
          <h3>COVID-19</h3>
          <p className="font-medium">PA/AP Chest X-RAY Classifier</p>
        </div>

        {
          diagnosis ?
            <div className="md:flex-row flex flex-col space-y-3 md:space-y-0 md:space-x-3 p-5 shadow-lg border border-gray-200 rounded-lg my-5">
              <div className="w-full md:w-1/2 h-64" style={{
                backgroundImage: `url(${previewImage.preview})`,
                backgroundSize: 'cover',
                overflow: 'hidden',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
              }}>
                {/* <img src={previewImage.preview} className="h-64" /> */}
              </div>
              <div className="flex flex-col items-center justify-center md:w-1/2">
                <p className="font-semibold text-gray-500">The diagnosis for COVID-19 is:</p>
                <p className={`text-${checkCovidResponse === "Negative" ? "blue" : "red"}-500 font-semibold text-xl
              ${checkCovidResponse === "Negative" ? "my-3" : "mt-3"}`}>{checkCovidResponse}</p>
                {
                  checkCovidResponse === "Positive" && (
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xl text-red-500 p-1.5 bg-red-100 rounded-lg"><CgDanger /></span>
                      <span className="text-semibold text-red-500">Consult your doctor as soon as possible!</span>
                    </div>
                  )
                }
                <div className="mt-3 md:mt-0">
                  <Button label="Check another one!" color="blue" callback={cleanerDataHandler} />
                </div>
              </div>

            </div>
            :
            <>
              <p className="text-gray-500 mt-5">
                <span className="text-black font-bold mr-2">Instructions:</span>
                <span className="hidden md:block">Add or drag a chest x-ray image to the area inside the dotted border. Then click the button "Get diagnosis!" and wait for the A.I. predicted diagnosis</span>
                <span className="md:hidden">Add a PA or AP chest x-ray image. Then click the button "Get diagnosis!" and wait for the A.I. predicted diagnosis</span>
              </p>

              <div className="mb-4 mt-5">
                <Dropzone
                  name="file"
                  maxFileSize={10000000}
                  maxFilesNumber={1}
                  setBodyFormData={setBodyFormData}
                  setPreviewImage={setPreviewImage}
                />
              </div>

              {
                bodyFormData.file.length > 0 && (
                  <Button isLoading={isLoading} label="Get diagnosis!" color="red" callback={sendDataHandler} />
                )
              }
            </>
        }

        <div className="mb-5 mt-10 p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-500">
          <span className="mr-2">The dataset used to train this DL algorithm can be found here:</span>
          <a
            href="https://wiki.cancerimagingarchive.net/pages/viewpage.action?pageId=70230281"
            target="_blank"
            rel="noreferrer">
            MIDRC-RICORD-1c
          </a>
          <p className="text-sm mt-2">From Cancer Imaging Archive - Mar 05, 2021</p>
        </div>

        <p className="text-sm text-gray-400 flex justify-center space-x-1">
          <span>Developed by</span>
          <a href="https://www.linkedin.com/in/julioes/" target="_blank" rel="noreferrer">Jenri</a>
          <span>&</span>
          <a href="https://www.linkedin.com/in/gwgar/" target="_blank" rel="noreferrer">Walle</a></p>
      </div>
    </div>
  )
}

export default App;