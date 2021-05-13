import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Button from "./Button"

test('renders button', () => {
    const buttonProps = {
        label: "Test Button",
        color: "green",
        callback: () => null
    }

    const component = render(<Button {...buttonProps} />)

    expect(component.container).toHaveTextContent(buttonProps.label)
})