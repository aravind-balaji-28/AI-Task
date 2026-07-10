import { useEffect, useRef, useState } from "react";
import { FiPlus, FiMic, FiArrowUp } from "react-icons/fi";
import { CopyBlock, dracula } from "react-code-blocks";
import "../../assets/scss/prompt-input.scss";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
interface FileItem {
  filename: string;
  language: string;
  content: string;
}
interface GeneratedFiles {
  files: FileItem[];
}
interface GenerateCodeResponse {
  code: string;
}
export default function PromptInput() {
  const [prompt, setPrompt] = useState<string>("");
  const [generatedFiles, setGeneratedFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSpeech, setIsSpeech] = useState<boolean>(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  console.log("listening: ", listening);
  useEffect(() => {
    if (isSpeech) {
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
      });
    } else {
      setPrompt("");
      resetTranscript();
      SpeechRecognition.stopListening();
    }
    return () => {
      SpeechRecognition.stopListening();
    };
  }, [isSpeech]);
  useEffect(() => {
    setPrompt(transcript);
  }, [transcript]);
  console.log("transcript: ", transcript);
  const generateCode = async (prompt: string): Promise<void> => {
    if (prompt.trim().length === 0) {
      setError("Please enter a prompt.");
      return;
    }
    setLoading(true);
    setError("");
    setGeneratedFiles([]);
    try {
      const payload = {
        prompt,
      };
      const response = await fetch("http://localhost:4200/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Failed to generate code.");
      }
      const result: GenerateCodeResponse =
        (await response.json()) as GenerateCodeResponse;
      const parsed: GeneratedFiles = JSON.parse(result.code);
      setGeneratedFiles(parsed.files);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleInput = (): void => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const maxHeight = 200;
    if (el.scrollHeight > maxHeight) {
      el.style.height = `${maxHeight}px`;
      el.style.overflowY = "auto";
    } else {
      el.style.height = `${el.scrollHeight}px`;
      el.style.overflowY = "hidden";
    }
  };
  const handleKeyDown = async (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ): Promise<void> => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const prompt = e.currentTarget.value.trim();
      if (!prompt) return;
      console.log("Send", prompt);
      await generateCode(prompt);
      e.currentTarget.value = "";
      handleInput();
    }
  };
  const handleSend = async () => {
    console.log(prompt, ">inputValue");
    await generateCode(prompt);
  };
  const toggleSpeech = async () => {
    setIsSpeech((prev) => !prev);
  };
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <>
      <div className="prompt-comp">
        <div className="prompt-header">
          <div className="prompt-header-title">
            Ready to crush today's goals?
          </div>
        </div>
        <div className="prompt-input">
          <button className="icon-btn" disabled={loading}>
            <FiPlus />
          </button>
          <textarea
            ref={textareaRef}
            value={prompt}
            rows={1}
            placeholder="Ask anything"
            onInput={handleInput}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <div className="actions">
            <button
              className="icon-btn"
              onClick={toggleSpeech}
              disabled={loading}
            >
              <FiMic />
            </button>
            <button
              className="send-btn"
              onClick={handleSend}
              disabled={loading}
            >
              <FiArrowUp />
            </button>
          </div>
        </div>
      </div>
      {error.length > 0 && (
        <p style={{ color: "red", marginTop: "20px" }}>{error}</p>
      )}
      {generatedFiles.map((file) => (
        <div
          key={file.filename}
          style={{
            marginTop: 30,
          }}
        >
          <h3>{file.filename}</h3>
          <CopyBlock
            text={file.content}
            language={file.language}
            theme={dracula}
            showLineNumbers
            wrapLongLines
          />
        </div>
      ))}
    </>
  );
}
