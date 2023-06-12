import Audio from "../../../assets/icons/audio.svg";
import picture from "../../../assets/icons/picture.svg";
import { motion } from "framer-motion";
import useSpeechToText, { ResultType } from "react-hook-speech-to-text";

export const AudioFile = () => {
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      {!isRecording ? (
        <>
          <div className="">
            <img src={Audio} alt="audio Btn" onClick={startSpeechToText} />
          </div>
        </>
      ) : (
        <div>
          <p>Recording</p>
          <button onClick={stopSpeechToText}>stop</button>
          <ul>
            {results.map((result) => (
              <li key={(result as ResultType).timestamp}>
                {(result as ResultType).transcript}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
