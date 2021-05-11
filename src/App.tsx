import * as React from 'react'
import { RiVirusFill } from 'react-icons/ri'
import Dropzone from './components/Dropzone'

const App: React.FC = () => {

  interface fileState {
    imageToBeDiagnosed: []
  }

  const [bodyFormData, setBodyFormData]:
    [fileState, (bodyFormData: fileState) => void] = React.useState<fileState>({ imageToBeDiagnosed: [] })

  const sendDataHandler = () => {
    console.log('Sending...')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto mt-5 md:mt-10">
        <div className="flex items-center flex-col">
          <span className="text-4xl text-green-500 p-3 bg-green-100 rounded-lg mb-3"><RiVirusFill /></span>
          <h3>COVID-19</h3>
          <p className="font-medium">PA/AP Chest X-RAY Classifier</p>
        </div>

        <p className="text-gray-500 mt-5">
          <span className="text-black font-bold mr-2">Instructions:</span>
          <span className="hidden md:block">Add or drag a chest x-ray image to the area inside the dotted border. Then click the button "Get diagnosis!" and wait for the A.I. predicted diagnosis</span>
          <span className="md:hidden">Add a PA or AP chest x-ray image. Then click the button "Get diagnosis!" and wait for the A.I. predicted diagnosis</span>
        </p>

        <div className="mb-4 mt-5">
          <Dropzone
            name="imageToBeDiagnosed"
            maxFileSize={10000000}
            maxFilesNumber={1}
            setBodyFormData={setBodyFormData}
          />
        </div>

        {
          bodyFormData.imageToBeDiagnosed.length > 0 && (
            <div className="flex justify-center md:justify-start">
              <div
                onClick={sendDataHandler}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer">Get diagnosis!</div>
            </div>
          )
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