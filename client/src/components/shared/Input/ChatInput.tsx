import { useState, useEffect } from "react";
import Audio from "../../../assets/icons/audio.svg";
import { UserPrompt } from "../../../validation/ChatInput";
import z from "zod";
import useSpeechToText from "react-hook-speech-to-text";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useMessageUser } from "../../../hooks/useMessageUser";

type UserPromptType = z.infer<typeof UserPrompt>;

export const ChatInput = () => {
  const [time, setTime] = useState<number>(0);
  const { userPrompt, setUserPrompt } = useMessageUser();
  const {
    error,
    interimResult,
    isRecording,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
    speechRecognitionProperties: { interimResults: true },
  });
  const timeOut = () => {
    if (interimResult === "") {
      stopSpeechToText();
      setTime(0);
    }
  };
  const EnableRecord = () => {
    setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    if (interimResult) {
      setUserPrompt({
        message: interimResult,
      });
    }
    if (time === 100) {
      stopSpeechToText();
      setTime(0);
    }
  };
  useEffect(() => {
    addEventListener("unload", () => {
      stopSpeechToText();
      setTime(0);
    });
  }, [time]);
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <>
      {!isRecording ? (
        <div className="">
          <img
            src={Audio}
            alt="audio Btn"
            onClick={() => {
              startSpeechToText();
              timeOut();
              EnableRecord();
            }}
          />
        </div>
      ) : (
        <div className="w-[80%]">
          <div className="flex w-full items-center justify-between rounded-lg bg-[#F9F9F9] border border-solid border-[#E7E7E7] py-3 px-4 ">
            <div className="flex w-full h-8 items-center gap-x-4">
              <div className="h-5 w-5">
                <CircularProgressbar
                  value={time}
                  styles={buildStyles({
                    pathColor: "#000",
                    backgroundColor: "#E7E7E7",
                  })}
                />
              </div>
              <div className="flex items-center gap-x-2">
                <div className="bg-red-500 h-2 w-2 rounded-full animate-ping"></div>
                <p>Generate message..</p>
              </div>
            </div>
            <button
              className="relative"
              onClick={() => {
                stopSpeechToText();
                setTime(0);
                console.log(time);
              }}
              disabled={interimResult ? true : false}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM8 7C7.73478 7 7.48043 7.10536 7.29289 7.29289C7.10536 7.48043 7 7.73478 7 8V12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H12C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7H8Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
