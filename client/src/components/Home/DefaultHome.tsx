import { ModelInfo } from "../shared/List/ModelInfo";
import { TitleInfo } from "../shared/Text/TitleInfo";
import ModelInfoWrapper from "../wrapper/ModelInfoWrapper";
import {
  Examples,
  Capabilities,
  Limitations,
} from "../../interfaces&types&static/Infos";

const DefaultHome = () => {
  return (
    <section className="basis-[80%] flex items-center justify-center">
      <section className="max-w-[80%] flex flex-col items-center gap-y-7">
        <ModelInfoWrapper shapeBg="#364E9F">
          <TitleInfo text="examples" />
          <ModelInfo Infos={Examples} link={true} />
        </ModelInfoWrapper>
        <ModelInfoWrapper shapeBg="#364E9F">
          <TitleInfo text="Capabilities" />
          <ModelInfo Infos={Capabilities} link={false} />
        </ModelInfoWrapper>
        <ModelInfoWrapper shapeBg="#364E9F">
          <TitleInfo text="Limitations" />
          <ModelInfo Infos={Limitations} link={false} />
        </ModelInfoWrapper>
      </section>
    </section>
  );
};

export default DefaultHome;
