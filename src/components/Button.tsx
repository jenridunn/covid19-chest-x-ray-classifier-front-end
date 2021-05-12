export interface ButtonProps {
    callback: Function,
    label: string,
    color: string,
}

const Button: React.FC<ButtonProps> = ({ label, color, callback }) => {
    return (
        <div className="flex justify-center md:justify-start">
            <div
                onClick={() => callback()}
                className={`px-3 py-2 bg-${color}-500 text-white rounded-lg hover:bg-${color}-600 cursor-pointer`}>{label}</div>
        </div>
    )
}

export default Button