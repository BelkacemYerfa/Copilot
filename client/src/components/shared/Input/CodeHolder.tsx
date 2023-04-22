import { ChangeEvent, KeyboardEvent, useState } from "react";
import debounce from "lodash.debounce";

type CodeHolder = {
  code: string[];
  setCount: () => void;
};

type UserCode = string[];

interface NewCode {
  newCode: string[];
  codeChange: (newCode: string[]) => void;
}

const CodeHolder = ({ code, setCount }: CodeHolder) => {
  const [newCode, setNewCode] = useState<UserCode>([]);
  if (code === newCode) {
    //here make the state of the new password updates to display the new content
  }

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap  ">
      {code.map((item) => (
        <Input
          key={crypto.randomUUID() + item}
          newCode={newCode}
          codeChange={setNewCode}
        />
      ))}
    </div>
  );
};

const Input = ({ newCode, codeChange }: NewCode) => {
  const Pass_To_Next_Element = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const next = target.nextElementSibling as HTMLInputElement;
    const previous = target.previousElementSibling as HTMLInputElement;
    if (target.value.length > 1) target.value = target.value[0];
    if (next !== null) next.focus();
    newCode[newCode.length] = target.value;
    if (e.key === "Backspace") {
      newCode = newCode.filter(function (item) {
        return item !== newCode.pop();
      });
      previous.focus();
      previous.value = "";
    }
    if (e.key === "leftArrow") next.focus();
    if (e.key === "rightArrow") previous.focus();
  };

  return (
    <input
      type="number"
      name="codeDegit"
      min="0"
      max={9}
      maxLength={1}
      onKeyUp={Pass_To_Next_Element}
      className="border border-solid border-placeholder_color rounded-lg h-[58px] w-[58px] text-2xl/9 text-main_color text-center focus:outline-none focus:ring-0 focus:border-main_color"
    />
  );
};

export default CodeHolder;
