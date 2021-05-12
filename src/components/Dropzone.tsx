import { useDropzone, FileWithPath } from "react-dropzone"
import React from 'react'
import { AiFillFileExclamation } from "react-icons/ai"
import { IoAddCircleOutline } from "react-icons/io5"
import { ImFilesEmpty } from "react-icons/im"
import { fileTypes } from '../other/fileTypes'
import { CgSync } from "react-icons/cg"


export interface DropzoneProps {
    name: string,
    maxFileSize: number,
    maxFilesNumber: number,
    setBodyFormData: Function
    setPreviewImage: Function
}

const Dropzone: React.FC<DropzoneProps> = (
    {
        name,
        maxFileSize = 1000000,
        maxFilesNumber = 1,
        setBodyFormData,
        setPreviewImage
    }
) => {

    const processMaxFileSize: string = maxFileSize >= 1000000 ? `${maxFileSize / 1000000} MB` : `${maxFileSize / 1000} KB`
    const fileErrorsText: { code: string, label: string }[] = [
        { code: "file-too-large", label: `Tamaño máximo excedido (${processMaxFileSize}), será ignorado` }
    ]

    const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps
    } = useDropzone({
        maxFiles: maxFilesNumber,
        accept: fileTypes.map(file => file.type).join(','),
        maxSize: maxFileSize,
        onDrop: acceptedFiles => {
            setBodyFormData((prev: object) => ({ ...prev, [name]: acceptedFiles }))
            setPreviewImage({
                preview: URL.createObjectURL(acceptedFiles[0])
            })

        }
    })

    const tooManyFilesError = fileRejections.filter(item => item.errors.filter(error => error.code === "too-many-files").length > 0).length > 0


    const acceptedFileItems = acceptedFiles.map((file: FileWithPath) => {
        return (
            <li key={file.path} className="text-sm">
                <div className="flex items-center p-1">
                    <span className={`text-3xl mr-2 ${fileTypes.filter(item => item.type === file.type)[0].inactiveColor}`}>
                        {fileTypes.filter(item => item.type === file.type)[0].icon}</span>
                    <p className="text-gray-500">
                        {file.path && (file.path.length > 25 ?
                            `${file.path.slice(0, 25)}...` : file.path)} - {`${file.size / 1000 >= 1000 ?
                                Math.round(file.size / 1000000) : Math.round(file.size / 1000)}
                                ${file.size / 1000 >= 1000 ?
                                    "MB" : "KB"}`
                        }
                    </p>
                </div>
            </li>
        )
    })

    interface FileRejected {
        file: FileWithPath
        errors: any
    }

    const fileRejectionItems = fileRejections?.map(({ file, errors }: FileRejected) => {
        return (
            <li key={file.path} className="text-sm">
                <div className="flex justify-start items-center p-1">
                    <span className="text-3xl mr-2 text-red-600">
                        {<AiFillFileExclamation />}</span>
                    <div>
                        <p className="text-gray-500">{file.path && (file.path.length > 25 ? `${file.path.slice(0, 25)}...` : file.path)} - {`${file.size / 1000 >= 1000 ?
                            Math.round(file.size / 1000000) : Math.round(file.size / 1000)}
                     ${file.size / 1000 >= 1000 ? "MB" : "KB"}`}</p>
                        <ul className="text-red-600">
                            {errors.map((e: { code: string }) => <li key={e.code}>{fileErrorsText.filter(item => item.code === e.code)[0]?.label}</li>)}
                        </ul>
                    </div>
                </div>
            </li>

        )
    })


    const labelHandler = () => {
        if ([...acceptedFiles, ...fileRejections].length > 0) {
            return "Change the added image"
        } else {
            return "Add an image"
        }
    }

    const iconHandler = () => {
        if ([...acceptedFiles, ...fileRejections].length > 0) {
            return <CgSync />
        } else {
            return <IoAddCircleOutline />
        }
    }

    return (
        <>
            <section>
                <aside>
                    <ul>{acceptedFileItems}</ul>
                </aside>
                {
                    tooManyFilesError ?
                        <aside className="text-sm">
                            <div className="flex justify-start items-center p-1">
                                <span className="text-3xl mr-2 text-red-600">
                                    {<ImFilesEmpty />}</span>

                                <p className="text-red-600">Exceeded number of items. Only one image can be added.</p>
                            </div>

                        </aside>
                        :
                        <aside>
                            <ul>{fileRejectionItems}</ul>
                        </aside>
                }


                <div {...getRootProps({
                    className: `dropzone p-3 bg-green-500 text-white lg:text-black lg:bg-white lg:border-2 border-gray-300 medika-color-black rounded-lg mt-2 
        lg:border-dashed lg:border-black cursor-pointer hover:text-green-500 outline-none focus:border-green-500 hover:border-green-500 hover:bg-green-50` })}>
                    <input {...getInputProps()} />
                    <p className="flex items-center"><span className="mr-2 text-3xl">{iconHandler()}</span>
                        {labelHandler()}</p>
                </div>

            </section>
            <div className="my-2">
                <p className="text-sm text-gray-400">Accepted image formats: jpeg, png, jpg</p>
                <p className="text-sm text-gray-400">Maximum image size:{processMaxFileSize}</p>
            </div>

        </>
    )

}

export default Dropzone