interface AuthErrorProps {
  message: string;
}

export const AuthError = ({ message }: AuthErrorProps) => {
  return <p className="text-lg/6 text-[#CC525F] font-medium">{message}</p>;
};
