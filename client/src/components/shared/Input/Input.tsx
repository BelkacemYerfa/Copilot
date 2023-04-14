type InputProps = {
  placeholderType: string;
  placeholderCase?: string;
  checkLenght?: boolean;
  DataHolder?: string;
};

const Input = ({
  placeholderType,
  placeholderCase,
  checkLenght = false,
  DataHolder,
}: InputProps) => {
  return checkLenght ? (
    <div className="space-y-3">
      <div className="space-y-2">
        <input
          type={placeholderType.toLowerCase() || placeholderCase}
          placeholder={placeholderType}
          className="border border-solid border-btn_border_color rounded-lg p-main_input_padding w-full outline-none placeholder:text-placeholder_color"
        />
        <div className="flex items-center gap-x-2">
          <div className="rounded-lg bg-btn_border_color h-[2px] w-full "></div>
          <div className="rounded-lg bg-btn_border_color h-[2px] w-full "></div>
          <div className="rounded-lg bg-btn_border_color h-[2px] w-full "></div>
          <div className="rounded-lg bg-btn_border_color h-[2px] w-full "></div>
        </div>
      </div>
      <div className="flex justify-start">
        <p className="text-xs/[18px] text-switcher_color font-normal">
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </p>
      </div>
    </div>
  ) : (
    <input
      type={placeholderType.toLowerCase() || placeholderCase}
      placeholder={placeholderType}
      className="border border-solid border-btn_border_color rounded-lg p-main_input_padding w-full outline-none placeholder:text-placeholder_color"
    />
  );
};

export default Input;
