export interface SignInProps {
    onSignIn: (data: {
        email: string;
        password: string;
    }) => void;
    error: string;
    isLoading: boolean;
    isSignUpEnabled: boolean;
    isPasswordResetEnabled: boolean;
    logo?: string;
    AuthImage?: string;
}
declare const Signin: ({ onSignIn, isSignUpEnabled, isPasswordResetEnabled, AuthImage, isLoading, error, logo, }: SignInProps) => import("react").JSX.Element;
export default Signin;
