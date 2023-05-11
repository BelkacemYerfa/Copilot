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
      className={`py-4 px-5 rounded-[1.5rem] space-y-2 w-[100%] md:w-[80%]`}
    >
      {children}
    </section>
  );
};

export default ModelInfoWrapper;
