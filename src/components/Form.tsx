import { FileState } from "../hooks/useImageHandler";
import Button from "./Button";
import Dropzone from "./Dropzone";

export interface FormProps {
    bodyFormData: FileState
    isLoading: boolean
    setBodyFormData: Function
    setPreviewImage: Function
    sendDataHandler: Function
}

const Form: React.FC<FormProps> = ({
    bodyFormData,
    isLoading,
    setBodyFormData,
    setPreviewImage,
    sendDataHandler
}) => {
    return (
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
                    <Button isLoading={isLoading}
                        label="Get diagnosis!"
                        color="red"
                        callback={sendDataHandler} />
                )
            }
        </>
    )
}

export default Form;