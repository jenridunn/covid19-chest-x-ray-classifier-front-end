import { motion } from "framer-motion"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export interface LoadingSpinnerProps {
    customColor: string,
    size: number
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ customColor, size }) => {
    return (
        <>
            <motion.div
                style={{ color: customColor, fontSize: size, width: size, height: size }}
                animate={{ rotate: 360 }}
                transition={{
                    loop: Infinity,
                    ease: "linear",
                    duration: 0.5
                }}

            ><AiOutlineLoading3Quarters /></motion.div>

        </>

    );
}

export default LoadingSpinner