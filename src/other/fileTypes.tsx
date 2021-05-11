import { AiOutlineFileImage } from "react-icons/ai"
import { ReactElement } from 'react';

interface fileType {
    type: string,
    icon: ReactElement,
    inactiveColor: string,
    activeColor: string,
    actions: string[]
}

export const fileTypes: fileType[] = [
    {
        type: "image/jpeg",
        icon: <AiOutlineFileImage />,
        inactiveColor: "text-green-400",
        activeColor: "text-green-500",
        actions: ["download", "show"]
    },
    {
        type: "image/jpg",
        icon: <AiOutlineFileImage />,
        inactiveColor: "text-green-400",
        activeColor: "text-green-500",
        actions: ["download", "show"]
    },
    {
        type: "image/png",
        icon: <AiOutlineFileImage />,
        inactiveColor: "text-green-400",
        activeColor: "text-green-500",
        actions: ["download", "show"]
    }
]