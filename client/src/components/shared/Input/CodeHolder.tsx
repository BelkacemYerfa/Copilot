import { ChangeEvent, KeyboardEvent } from "react";
import debounce from "lodash.debounce";

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
  const Pass_To_Next_Element = debounce((e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const next = target.nextElementSibling as HTMLInputElement;
    if (target.value.length > 1) {
      target.value = target.value[0];
      next?.focus();
    }
  }, 200);
  const Return_To_Previous_Element = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const previous = target.previousElementSibling as HTMLInputElement;
    if (target.value.length === 0) previous?.focus();
    const next = target.nextElementSibling as HTMLInputElement;
    if (e.key === "ArrowLeft") previous?.focus();
    if (e.key === "ArrowRight") next?.focus();
  };
  return (
    <input
      type="number"
      name="codeDegit"
      min="0"
      max={1}
      onChange={Pass_To_Next_Element}
      onKeyUp={Return_To_Previous_Element}
      className="border border-solid border-placeholder_color rounded-lg h-[58px] w-[58px] text-2xl/9 text-main_color text-center focus:outline-none focus:ring-0 focus:border-main_color"
    />
  );
};

export default CodeHolder;
