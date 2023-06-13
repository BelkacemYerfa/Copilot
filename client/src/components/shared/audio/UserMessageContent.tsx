interface UserMessageContentProps {
  text: string;
}

export const UserMessageContent = ({ text }: UserMessageContentProps) => {
  return (
    <div className="max-h-1/3 overflow-y-auto w-1/3 rounded-lg p-1">
      <p className="text-main_color">{text}</p>
    </div>
  );
};
