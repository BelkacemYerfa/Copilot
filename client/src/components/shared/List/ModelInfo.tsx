interface ModelInfoProps {
  Infos: string[];
  link: boolean;
}

export const ModelInfo = ({ Infos, link }: ModelInfoProps) => {
  return (
    <ul className="flex flex-col gap-y-2 pl-5">
      {Infos.map((info, index) => (
        <li
          key={index}
          className={`text-base text-white list-disc font-normal ${
            link ? "cursor-pointer hover:underline" : "cursor-text"
          }`}
        >
          {info}
        </li>
      ))}
    </ul>
  );
};
