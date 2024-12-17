import dynamic from "next/dynamic";
import { useState } from "react";
import { uploadAudio as uploadAudioAPI } from "./api/uploadAudio";
import { playTranslation as playTranslationAPI } from "./api/playTranslation";
// Dynamically import ReactMic to prevent SSR issues
const ReactMediaRecorder = dynamic(
  () => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder),
  { ssr: false }
);

export default function Home() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState("");
  const [translation, setTranslation] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const startRecording = () => {
    setRecording(true);
  };

  const stopRecording = () => {
    setRecording(false);
  };

  const onStop = (blobUrl:string, blob:Blob) => {
    setAudioBlob(blob);
  };

  const uploadAudio = async () => {
    if (!audioBlob) {
      alert("No audio recorded!");
      return;
    }

    try {
      const { transcription, translation } = await uploadAudioAPI(
        audioBlob,
        selectedLanguage
      );
      setTranscription(transcription || "");
      setTranslation(translation || "");
    } catch (error) {
      alert("Error uploading audio. Please try again.");
    }
  };

  const playTranslation = async () => {
    if (!translation) {
      alert("No translation available to play!");
      return;
    }

    try {
      const response = await playTranslationAPI(translation);
      const { data } = response;
      const audioBlob = new Blob([new Uint8Array(data)], { type: "audio/mp3" });

      // Create a URL for the Blob and play it
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      alert("Error playing translation. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 space-y-6">
      <h1 className="text-2xl font-bold">Record Your Audio</h1>

      <ReactMediaRecorder
        audio
        onStop={onStop}
        render={({ startRecording, stopRecording, mediaBlobUrl }) => (
          <>
            <audio src={mediaBlobUrl} controls className="w-full mt-4" />
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setRecording(true);
                  startRecording();
                }}
                disabled={recording}
                className={`px-4 py-2 text-white rounded ${
                  recording
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                Start Recording
              </button>
              <button
                onClick={() => {
                  setRecording(false);
                  stopRecording();
                }}
                disabled={!recording}
                className={`px-4 py-2 text-white rounded ${
                  !recording
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Stop Recording
              </button>
              <button
                onClick={uploadAudio}
                disabled={!audioBlob}
                className={`px-4 py-2 text-white rounded ${
                  !audioBlob
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                Upload Audio
              </button>
            </div>
          </>
        )}
      />

      <div className="w-full max-w-2xl space-y-4 mt-6">
        <div>
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-700"
          >
            Select Language for Translation
          </label>
          <select
            id="language"
            className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Chinese">Chinese</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="transcription"
            className="block text-sm font-medium text-gray-700"
          >
            Transcription
          </label>
          <textarea
            id="transcription"
            className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            value={transcription}
            readOnly
          />
        </div>

        <div>
          <label
            htmlFor="translation"
            className="block text-sm font-medium text-gray-700"
          >
            Translation
          </label>
          <textarea
            id="translation"
            className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-green-500 focus:border-green-500"
            rows={4}
            value={translation}
            readOnly
          />
        </div>

        <button
          onClick={playTranslation}
          disabled={!translation}
          className={`px-4 py-2 w-full text-white rounded ${
            !translation
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600"
          }`}
        >
          Play Translation
        </button>
      </div>
    </div>
  );
}
