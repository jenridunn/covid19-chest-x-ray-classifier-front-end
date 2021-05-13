import { CgDanger } from "react-icons/cg";
import { PreviewImageFile } from "../hooks/useImageHandler";
import Button from "./Button";

export interface ShowDiagnosisProps {
    checkCovidResponse: string,
    cleanerDataHandler: Function,
    previewImage: PreviewImageFile
}

const ShowDiagnosis: React.FC<ShowDiagnosisProps> = ({
    checkCovidResponse,
    cleanerDataHandler,
    previewImage
}) => {
    return (
        <div className="md:flex-row flex flex-col space-y-3 md:space-y-0 md:space-x-3 p-5 shadow-lg border border-gray-200 rounded-lg my-5">
            <div className="w-full md:w-1/2 h-64" style={{
                backgroundImage: `url(${previewImage.preview})`,
                backgroundSize: 'cover',
                overflow: 'hidden',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
            }}>
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
    )
}

export default ShowDiagnosis