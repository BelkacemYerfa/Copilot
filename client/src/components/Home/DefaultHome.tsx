import { ModelInfo } from "../shared/List/ModelInfo";
import { TitleInfo } from "../shared/Text/TitleInfo";
import ModelInfoWrapper from "../wrapper/ModelInfoWrapper";
import {
  Examples,
  Capabilities,
  Limitations,
} from "../../interfaces&types&static/Infos";
import { ChatInput } from "../shared/Input/ChatInput";

const DefaultHome = () => {
  return (
    <section className="basis-[80%] flex flex-col gap-y-7 items-center justify-center">
      <section className="relative m-auto w-[90%] flex flex-col gap-y-3 ">
        <section className="m-auto w-[90%] p-5 flex-1 flex  flex-col items-center gap-y-7">
          <ModelInfoWrapper shapeBg="#364E9F">
            <TitleInfo text="examples" />
            <ModelInfo Infos={Examples} link={true} />
          </ModelInfoWrapper>
          <ModelInfoWrapper shapeBg="#1C1C1C">
            <TitleInfo text="Capabilities" />
            <ModelInfo Infos={Capabilities} link={false} />
          </ModelInfoWrapper>
          <ModelInfoWrapper shapeBg="#F9A708">
            <TitleInfo text="Limitations" />
            <ModelInfo Infos={Limitations} link={false} />
          </ModelInfoWrapper>
          <ModelInfoWrapper shapeBg="#F9A708">
            <TitleInfo text="Limitations" />
            <ModelInfo Infos={Limitations} link={false} />
          </ModelInfoWrapper>
          <ModelInfoWrapper shapeBg="#F9A708">
            <TitleInfo text="Limitations" />
            <ModelInfo Infos={Limitations} link={false} />
          </ModelInfoWrapper>
          <ModelInfoWrapper shapeBg="#F9A708">
            <TitleInfo text="Limitations" />
            <ModelInfo Infos={Limitations} link={false} />
          </ModelInfoWrapper>
          <ModelInfoWrapper shapeBg="#F9A708">
            <TitleInfo text="Limitations" />
            <ModelInfo Infos={Limitations} link={false} />
          </ModelInfoWrapper>
          <ModelInfoWrapper shapeBg="#F9A708">
            <TitleInfo text="Limitations" />
            <ModelInfo Infos={Limitations} link={false} />
          </ModelInfoWrapper>
        </section>
        <section className="sticky bottom-0 bg-white p-5 rounded-md">
          <ChatInput />
        </section>
      </section>
    </section>
  );
};

export default DefaultHome;
