interface TextErrorProps {
  error: string | undefined;
}

const TextError = ({ error }: TextErrorProps) => {
  return (
    <div className="flex justify-start w-fullp px-1">
      <p className="text-sm font-medium capitalize text-red-500">{error}</p>
    </div>
  );
};

export default TextError;
