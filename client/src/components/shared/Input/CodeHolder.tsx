import { KeyboardEvent, useState } from "react";

type CodeHolder = {
  code: string[];
  codeChange: React.Dispatch<React.SetStateAction<string[]>>;
};

const CodeHolder = ({ code, codeChange }: CodeHolder) => {
  const [newCode, setNewCode] = useState<string[]>([]);
  const ClickHandler = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    const target = e.target as HTMLInputElement;
    const next = target.nextElementSibling as HTMLInputElement;
    const previous = target.previousElementSibling as HTMLInputElement;
    if (target.value.length > 1)
      target.value = target.value[target.value.length - 1];

    if (newCode.length < 6) {
      newCode[index] = target.value;
      setNewCode(newCode);
      codeChange;
      next.focus();
      console.log(newCode);
    }
    if (e.key === "Backspace") {
      const newVal = [...newCode];
      newVal.splice(index, 1);
      setNewCode(newVal);

      previous.focus();
      console.log(newCode);
    }
    if (e.key === "ArrowRight" && next) next.focus();
    if (e.key === "ArrowLeft" && previous) previous.focus();
    codeChange(newCode);
  };
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {code.map((item, index) => (
        <input
          type="number"
          name="codeNumber"
          min="0"
          max={9}
          key={index}
          onKeyUp={(event) => ClickHandler(event, index)}
          className="border border-solid border-placeholder_color rounded-lg h-[58px] w-[58px] text-2xl/9 text-main_color text-center focus:outline-none focus:ring-0 focus:border-main_color"
        />
      ))}
      <div></div>
    </div>
  );
};

export default CodeHolder;
