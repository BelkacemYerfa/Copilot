import LinkSwitcher from "../Link/LinkSwitcher";
import { Distination } from "../../../interfaces&types/Distination";

type AcceptTermsProps = {
  text: string;
  dist: Distination;
};

const AcceptTerms = ({ text, dist }: AcceptTermsProps) => {
  return (
    <div className="flex items-center gap-x-[11px]">
      <input
        type="checkbox"
        name="checkboxTerms"
        id="checkboxTerms"
        className="w-4 h-4 bg-main_color bg-placeholder_color border-gray-300 rounded focus:ring-0 outline-none  "
      />
      <label
        htmlFor="checkboxTerms"
        className="text-sm text-switcher_color font-normal"
      >
        {text} <LinkSwitcher to={dist.to} text={dist.text} />
      </label>
    </div>
  );
};

export default AcceptTerms;
