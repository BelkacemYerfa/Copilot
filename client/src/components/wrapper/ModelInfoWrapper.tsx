import { ReactNode } from "react";

type ModelInfoWrapperProps = {
  children: ReactNode;
  shapeBg?: string;
};

const ModelInfoWrapper = ({ children, shapeBg }: ModelInfoWrapperProps) => {
  return (
    <section
      style={{
        backgroundColor: shapeBg,
      }}
      className={`py-4 px-10 rounded-[2rem] space-y-2 w-full`}
    >
      {children}
    </section>
  );
};

export default ModelInfoWrapper;
