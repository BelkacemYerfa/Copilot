type CodeHolder = {
  code: string[];
};

const CodeHolder = ({ code }: CodeHolder) => {
  return (
    <div className="flex items-center gap-x-2">
      {code.map((item, index) => (
        <Input key={index} />
      ))}
    </div>
  );
};

const Input = () => {
  return (
    <input
      type="number"
      min={0}
      maxLength={1}
      className="border border-solid border-placeholder_color rounded-lg h-[58px] w-[58px] text-2xl/9 text-main_color text-center focus:outline-none focus:ring-0 focus:border-main_color"
    />
  );
};

export default CodeHolder;
