type TextProps = {
  text: string;
};

const Text = ({ text }: TextProps) => (
  <p className="text-sm text-switcher_color font-normal">{text}</p>
);
export default Text;
