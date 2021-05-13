import React from 'react'
import { RiVirusFill } from 'react-icons/ri'
import Form from './components/Form'
import ShowDiagnosis from './components/ShowDiagnosis'
import useImageHandler from './hooks/useImageHandler'

const App: React.FC = () => {

  const toolbox = useImageHandler()

  const checkCovidResponse = toolbox.states.diagnosis && toolbox.states.diagnosis === "covid19negative" ? "Negative" : "Positive"

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5 md:my-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center flex-col">
          <span className="text-4xl text-green-500 p-3 bg-green-100 rounded-lg mb-3"><RiVirusFill /></span>
          <h3>COVID-19</h3>
          <p className="font-medium">PA/AP Chest X-RAY Classifier</p>
        </div>

        {
          toolbox.states.diagnosis ?
            <ShowDiagnosis
              checkCovidResponse={checkCovidResponse}
              cleanerDataHandler={toolbox.functions.cleanerDataHandler}
              previewImage={toolbox.states.previewImage}
            />
            :
            <Form
              bodyFormData={toolbox.states.bodyFormData}
              isLoading={toolbox.states.isLoading}
              setBodyFormData={toolbox.setStates.setBodyFormData}
              setPreviewImage={toolbox.setStates.setPreviewImage}
              sendDataHandler={toolbox.functions.sendDataHandler}
            />

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

export default App