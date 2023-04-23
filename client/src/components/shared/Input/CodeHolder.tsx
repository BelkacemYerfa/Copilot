import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

type CodeHolder = {
  code: string[];
  codeChange: (newCode: string[]) => void;
};

const CodeHolder = ({ code, codeChange }: CodeHolder) => {
  const [newCode, setNewCode] = useState<string[]>([]);
  const Pass_To_Next_Element = (e: ChangeEvent, index: number) => {
    const target = e.target as HTMLInputElement;
    const next = target.nextElementSibling as HTMLInputElement;
    if (target.value.length > 1)
      target.value = target.value[target.value.length - 1];
    if (next !== null) next.focus();
    if (newCode.length < 6) {
      newCode[index] = target.value;
      setNewCode(newCode);
      console.log(newCode);
    }
  };
  const Pass_To_Previous_Element = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const target = e.target as HTMLInputElement;
    const next = target.nextElementSibling as HTMLInputElement;
    const previous = target.previousElementSibling as HTMLInputElement;
    if (target.value.length > 1)
      target.value = target.value[target.value.length - 1];

    if (newCode.length < 6) {
      newCode[index] = target.value;
      setNewCode(newCode);
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
  };
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {code.map((item, index) => (
        <input
          type="number"
          name="codeDegit"
          min="0"
          max={9}
          key={index}
          onKeyUp={(event) => Pass_To_Previous_Element(event, index)}
          className="border border-solid border-placeholder_color rounded-lg h-[58px] w-[58px] text-2xl/9 text-main_color text-center focus:outline-none focus:ring-0 focus:border-main_color"
        />
      ))}
      <div></div>
    </div>
  );
};

export default CodeHolder;
