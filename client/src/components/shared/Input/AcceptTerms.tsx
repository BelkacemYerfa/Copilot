import LinkSwitcher from "../Link/LinkSwitcher";

const AcceptTerms = () => {
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
        I Accept the <LinkSwitcher to="/" text="Terms" />
      </label>
    </div>
  );
};

export default AcceptTerms;
