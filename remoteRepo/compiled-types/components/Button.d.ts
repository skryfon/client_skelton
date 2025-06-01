interface ButtonProps {
    label: string;
    onClick: () => void;
}
declare const Button: ({ label, onClick }: ButtonProps) => import("react").JSX.Element;
export default Button;
