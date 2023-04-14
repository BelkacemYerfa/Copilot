type TextProps = {
  text?: string;
};

const CryptoText = ({ text }: TextProps) => (
  <p className="text-[18 px]/7 text-main_color font-semibold">{text}</p>
);

export default CryptoText;
