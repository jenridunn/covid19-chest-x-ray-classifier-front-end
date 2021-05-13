import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export interface ButtonProps {
    callback: Function,
    label: string,
    color: string,
    isLoading?: boolean,
}

const Button: React.FC<ButtonProps> = ({
    label,
    color,
    callback,
    isLoading = false
}) => {

    const divBtnRef = useRef<HTMLDivElement>(null)
    const [buttonWidth, setButtonWidth]: [string, (buttonWidth: string) => void] = useState<string>("auto")

    useLayoutEffect(() => {
        if (divBtnRef !== undefined) {
            if (divBtnRef.current) {
                setButtonWidth(window.getComputedStyle(divBtnRef.current).width)
            }
        }
    }, [divBtnRef])

    return (
        <div className="flex justify-center md:justify-start">
            <div ref={divBtnRef}>
                <motion.div whileTap={{ scale: 0.95 }} style={{ width: buttonWidth }}
                    onClick={() => callback()}
                    className={`px-3 py-2 bg-${color}-500 text-white rounded-lg hover:bg-${color}-600 cursor-pointer flex justify-center`}>
                    {isLoading ? <LoadingSpinner customColor="white" size={25} /> : label}
                </motion.div>
            </div>
        </div>
    )
}

export default Button