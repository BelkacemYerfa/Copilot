interface TitleInfoProps {
  text: string;
}

export const TitleInfo = ({ text }: TitleInfoProps): JSX.Element => {
  return <h2 className="text-lg text-white uppercase font-normal">{text}</h2>;
};
