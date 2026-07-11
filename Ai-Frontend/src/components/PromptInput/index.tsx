import { useEffect, useRef, useState } from "react";
import { FiPlus, FiMic, FiArrowUp } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../../assets/scss/prompt-input.scss";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useNavigate, useParams } from "react-router-dom";
import CopyButton from "../Common/CopyButton";
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
const promptReponse = {
  "code": "{\n  \"files\": [\n    {\n      \"filename\": \"LoginForm.tsx\",\n      \"language\": \"tsx\",\n      \"content\": \"import React, { useState, ChangeEvent, FormEvent, FocusEvent } from 'react';\\nimport './LoginForm.css';\\n\\ninterface ValidationErrors {\\n  email?: string;\\n  password?: string;\\n}\\n\\nexport const LoginForm: React.FC = () => {\\n  const [email, setEmail] = useState('');\\n  const [password, setPassword] = useState('');\\n  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});\\n  const [errors, setErrors] = useState<ValidationErrors>({});\\n  const [showPassword, setShowPassword] = useState(false);\\n  const [isSubmitting, setIsSubmitting] = useState(false);\\n  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');\\n  const [rememberMe, setRememberMe] = useState(false);\\n\\n  const validateEmail = (value: string): string => {\\n    if (!value) {\\n      return 'Email address is required';\\n    }\\n    const emailRegex = /^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$/;\\n    if (!emailRegex.test(value)) {\\n      return 'Please enter a valid email address';\\n    }\\n    return '';\\n  };\\n\\n  const validatePassword = (value: string): string => {\\n    if (!value) {\\n      return 'Password is required';\\n    }\\n    if (value.length < 8) {\\n      return 'Password must be at least 8 characters long';\\n    }\\n    return '';\\n  };\\n\\n  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {\\n    const value = e.target.value;\\n    setEmail(value);\\n    if (touched.email) {\\n      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));\\n    }\\n  };\\n\\n  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {\\n    const value = e.target.value;\\n    setPassword(value);\\n    if (touched.password) {\\n      setErrors((prev) => ({ ...prev, password: validatePassword(value) }));\\n    }\\n  };\\n\\n  const handleBlur = (field: 'email' | 'password') => {\\n    setTouched((prev) => ({ ...prev, [field]: true }));\\n    if (field === 'email') {\\n      setErrors((prev) => ({ ...prev, email: validateEmail(email) }));\\n    } else {\\n      setErrors((prev) => ({ ...prev, password: validatePassword(password) }));\\n    }\\n  };\\n\\n  const togglePasswordVisibility = () => {\\n    setShowPassword((prev) => !prev);\\n  };\\n\\n  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {\\n    e.preventDefault();\\n\\n    const emailError = validateEmail(email);\\n    const passwordError = validatePassword(password);\\n\\n    setTouched({ email: true, password: true });\\n    setErrors({\\n      email: emailError,\\n      password: passwordError,\\n    });\\n\\n    if (emailError || passwordError) {\\n      return;\\n    }\\n\\n    setIsSubmitting(true);\\n    setSubmitStatus('idle');\\n\\n    try {\\n      await new Promise((resolve) => setTimeout(resolve, 2000));\\n      setSubmitStatus('success');\\n      setEmail('');\\n      setPassword('');\\n      setTouched({});\\n    } catch (error) {\\n      setSubmitStatus('error');\\n    } finally {\\n      setIsSubmitting(false);\\n    }\\n  };\\n\\n  return (\\n    <div className=\\\"login-container\\\">\\n      <div className=\\\"login-card\\\">\\n        <div className=\\\"login-header\\\">\\n          <h2 className=\\\"login-title\\\">Welcome back</h2>\\n          <p className=\\\"login-subtitle\\\">Please enter your details to sign in</p>\\n        </div>\\n\\n        {submitStatus === 'success' && (\\n          <div className=\\\"alert alert-success\\\" role=\\\"alert\\\">\\n            Successfully logged in! Redirecting...\\n          </div>\\n        )}\\n\\n        {submitStatus === 'error' && (\\n          <div className=\\\"alert alert-error\\\" role=\\\"alert\\\">\\n            An unexpected error occurred. Please try again.\\n          </div>\\n        )}\\n\\n        <form onSubmit={handleSubmit} noValidate className=\\\"login-form\\\">\\n          <div className=\\\"form-group\\\">\\n            <label htmlFor=\\\"email-input\\\" className=\\\"form-label\\\">\\n              Email address\\n            </label>\\n            <div className=\\\"input-wrapper\\\">\\n              <input\\n                id=\\\"email-input\\\"\\n                type=\\\"email\\\"\\n                className={`form-input ${touched.email && errors.email ? 'input-invalid' : ''}`}\\n                placeholder=\\\"you@example.com\\\"\\n                value={email}\\n                onChange={handleEmailChange}\\n                onBlur={() => handleBlur('email')}\\n                aria-invalid={touched.email && !!errors.email}\\n                aria-describedby={touched.email && errors.email ? 'email-error' : undefined}\\n                disabled={isSubmitting}\\n                required\\n              />\\n            </div>\\n            {touched.email && errors.email && (\\n              <span id=\\\"email-error\\\" className=\\\"field-error\\\" role=\\\"alert\\\">\\n                {errors.email}\\n              </span>\\n            )}\\n          </div>\\n\\n          <div className=\\\"form-group\\\">\\n            <div className=\\\"password-label-row\\\">\\n              <label htmlFor=\\\"password-input\\\" className=\\\"form-label\\\">\\n                Password\\n              </label>\\n              <a href=\\\"#\\\" className=\\\"forgot-password-link\\\" tabIndex={0}>\\n                Forgot password?\\n              </a>\\n            </div>\\n            <div className=\\\"input-wrapper\\\">\\n              <input\\n                id=\\\"password-input\\\"\\n                type={showPassword ? 'text' : 'password'}\\n                className={`form-input ${touched.password && errors.password ? 'input-invalid' : ''}`}\\n                placeholder=\\\"••••••••\\\"\\n                value={password}\\n                onChange={handlePasswordChange}\\n                onBlur={() => handleBlur('password')}\\n                aria-invalid={touched.password && !!errors.password}\\n                aria-describedby={touched.password && errors.password ? 'password-error' : undefined}\\n                disabled={isSubmitting}\\n                required\\n              />\\n              <button\\n                type=\\\"button\\\"\\n                className=\\\"password-toggle-btn\\\"\\n                onClick={togglePasswordVisibility}\\n                aria-label={showPassword ? 'Hide password' : 'Show password'}\\n                disabled={isSubmitting}\\n              >\\n                {showPassword ? (\\n                  <svg\\n                    className=\\\"eye-icon\\\"\\n                    xmlns=\\\"http://www.w3.org/2000/svg\\\"\\n                    fill=\\\"none\\\"\\n                    viewBox=\\\"0 0 24 24\\\"\\n                    stroke=\\\"currentColor\\\"\\n                  >\\n                    <path\\n                      strokeLinecap=\\\"round\\\"\\n                      strokeLinejoin=\\\"round\\\"\\n                      strokeWidth={2}\\n                      d=\\\"M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21\\\"\\n                    />\\n                  </svg>\\n                ) : (\\n                  <svg\\n                    className=\\\"eye-icon\\\"\\n                    xmlns=\\\"http://www.w3.org/2000/svg\\\"\\n                    fill=\\\"none\\\"\\n                    viewBox=\\\"0 0 24 24\\\"\\n                    stroke=\\\"currentColor\\\"\\n                  >\\n                    <path\\n                      strokeLinecap=\\\"round\\\"\\n                      strokeLinejoin=\\\"round\\\"\\n                      strokeWidth={2}\\n                      d=\\\"M15 12a3 3 0 11-6 0 3 3 0 016 0z\\\"\\n                    />\\n                    <path\\n                      strokeLinecap=\\\"round\\\"\\n                      strokeLinejoin=\\\"round\\\"\\n                      strokeWidth={2}\\n                      d=\\\"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z\\\"\\n                    />\\n                  </svg>\\n                )}\\n              </button>\\n            </div>\\n            {touched.password && errors.password && (\\n              <span id=\\\"password-error\\\" className=\\\"field-error\\\" role=\\\"alert\\\">\\n                {errors.password}\\n              </span>\\n            )}\\n          </div>\\n\\n          <div className=\\\"remember-me-container\\\">\\n            <label className=\\\"checkbox-label\\\">\\n              <input\\n                type=\\\"checkbox\\\"\\n                checked={rememberMe}\\n                onChange={(e) => setRememberMe(e.target.checked)}\\n                disabled={isSubmitting}\\n                className=\\\"checkbox-input\\\"\\n              />\\n              <span className=\\\"checkbox-custom\\\"></span>\\n              Remember me for 30 days\\n            </label>\\n          </div>\\n\\n          <button\\n            type=\\\"submit\\\"\\n            className=\\\"submit-btn\\\"\\n            disabled={isSubmitting}\\n            aria-live=\\\"polite\\\"\\n          >\\n            {isSubmitting ? (\\n              <span className=\\\"spinner-container\\\">\\n                <span className=\\\"spinner\\\"></span>\\n                Signing in...\\n              </span>\\n            ) : (\\n              'Sign in'\\n            )}\\n          </button>\\n        </form>\\n\\n        <div className=\\\"login-footer\\\">\\n          <p className=\\\"footer-text\\\">\\n            Don't have an account?{' '}\\n            <a href=\\\"#\\\" className=\\\"signup-link\\\">\\n              Sign up for free\\n            </a>\\n          </p>\\n        </div>\\n      </div>\\n    </div>\\n  );\\n};\\n\"\n    },\n    {\n      \"filename\": \"LoginForm.css\",\n      \"language\": \"css\",\n      \"content\": \":root {\\n  --primary-color: #4f46e5;\\n  --primary-hover: #4338ca;\\n  --primary-focus: rgba(79, 70, 229, 0.15);\\n  --background-card: #ffffff;\\n  --border-color: #d1d5db;\\n  --border-hover: #9ca3af;\\n  --error-color: #ef4444;\\n  --error-bg: #fef2f2;\\n  --error-border: #fca5a5;\\n  --success-color: #10b981;\\n  --success-bg: #ecfdf5;\\n  --success-border: #a7f3d0;\\n  --text-primary: #111827;\\n  --text-secondary: #4b5563;\\n  --text-muted: #9ca3af;\\n  --font-family: -apple-system, BlinkMacSystemFont, \\\"Segoe UI\\\", Roboto, Helvetica, Arial, sans-serif;\\n}\\n\\n.login-container {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n  min-height: 100vh;\\n  background-color: #f3f4f6;\\n  font-family: var(--font-family);\\n  padding: 1rem;\\n  box-sizing: border-box;\\n}\\n\\n.login-card {\\n  background-color: var(--background-card);\\n  border-radius: 1rem;\\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\\n  width: 100%;\\n  max-width: 440px;\\n  padding: 2.5rem;\\n  box-sizing: border-box;\\n}\\n\\n.login-header {\\n  text-align: center;\\n  margin-bottom: 2rem;\\n}\\n\\n.login-title {\\n  font-size: 1.75rem;\\n  font-weight: 700;\\n  color: var(--text-primary);\\n  margin: 0 0 0.5rem 0;\\n  letter-spacing: -0.025em;\\n}\\n\\n.login-subtitle {\\n  font-size: 0.875rem;\\n  color: var(--text-secondary);\\n  margin: 0;\\n}\\n\\n.alert {\\n  padding: 0.75rem 1rem;\\n  border-radius: 0.5rem;\\n  font-size: 0.875rem;\\n  margin-bottom: 1.5rem;\\n  border: 1px solid transparent;\\n}\\n\\n.alert-success {\\n  background-color: var(--success-bg);\\n  color: var(--success-color);\\n  border-color: var(--success-border);\\n}\\n\\n.alert-error {\\n  background-color: var(--error-bg);\\n  color: var(--error-color);\\n  border-color: var(--error-border);\\n}\\n\\n.login-form {\\n  display: flex;\\n  flex-direction: column;\\n  gap: 1.25rem;\\n}\\n\\n.form-group {\\n  display: flex;\\n  flex-direction: column;\\n  gap: 0.375rem;\\n}\\n\\n.form-label {\\n  font-size: 0.875rem;\\n  font-weight: 500;\\n  color: var(--text-primary);\\n}\\n\\n.password-label-row {\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n}\\n\\n.forgot-password-link {\\n  font-size: 0.825rem;\\n  color: var(--primary-color);\\n  text-decoration: none;\\n  font-weight: 500;\\n}\\n\\n.forgot-password-link:hover {\\n  text-decoration: underline;\\n}\\n\\n.input-wrapper {\\n  position: relative;\\n  display: flex;\\n  align-items: center;\\n}\\n\\n.form-input {\\n  width: 100%;\\n  padding: 0.75rem 1rem;\\n  font-size: 0.95rem;\\n  border: 1px solid var(--border-color);\\n  border-radius: 0.5rem;\\n  color: var(--text-primary);\\n  background-color: #ffffff;\\n  outline: none;\\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\\n  box-sizing: border-box;\\n}\\n\\n.form-input::placeholder {\\n  color: var(--text-muted);\\n}\\n\\n.form-input:hover:not(:disabled) {\\n  border-color: var(--border-hover);\\n}\\n\\n.form-input:focus:not(:disabled) {\\n  border-color: var(--primary-color);\\n  box-shadow: 0 0 0 4px var(--primary-focus);\\n}\\n\\n.form-input:disabled {\\n  background-color: #f9fafb;\\n  color: var(--text-muted);\\n  cursor: not-allowed;\\n}\\n\\n.form-input.input-invalid {\\n  border-color: var(--error-color);\\n}\\n\\n.form-input.input-invalid:focus {\\n  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.15);\\n}\\n\\n.password-toggle-btn {\\n  position: absolute;\\n  right: 0.75rem;\\n  background: none;\\n  border: none;\\n  padding: 0.25rem;\\n  cursor: pointer;\\n  color: var(--text-secondary);\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  border-radius: 0.25rem;\\n}\\n\\n.password-toggle-btn:focus {\\n  outline: 2px solid var(--primary-color);\\n}\\n\\n.eye-icon {\\n  width: 1.25rem;\\n  height: 1.25rem;\\n}\\n\\n.field-error {\\n  font-size: 0.8rem;\\n  color: var(--error-color);\\n  margin-top: 0.125rem;\\n}\\n\\n.remember-me-container {\\n  display: flex;\\n  align-items: center;\\n}\\n\\n.checkbox-label {\\n  display: flex;\\n  align-items: center;\\n  position: relative;\\n  padding-left: 1.75rem;\\n  cursor: pointer;\\n  font-size: 0.875rem;\\n  color: var(--text-secondary);\\n  user-select: none;\\n}\\n\\n.checkbox-input {\\n  position: absolute;\\n  opacity: 0;\\n  cursor: pointer;\\n  height: 0;\\n  width: 0;\\n}\\n\\n.checkbox-custom {\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  height: 1.125rem;\\n  width: 1.125rem;\\n  background-color: #fff;\\n  border: 1px solid var(--border-color);\\n  border-radius: 0.25rem;\\n  transition: all 0.15s ease-in-out;\\n}\\n\\n.checkbox-label:hover .checkbox-input ~ .checkbox-custom {\\n  border-color: var(--border-hover);\\n}\\n\\n.checkbox-input:checked ~ .checkbox-custom {\\n  background-color: var(--primary-color);\\n  border-color: var(--primary-color);\\n}\\n\\n.checkbox-custom:after {\\n  content: \\\"\\\";\\n  position: absolute;\\n  display: none;\\n}\\n\\n.checkbox-input:checked ~ .checkbox-custom:after {\\n  display: block;\\n}\\n\\n.checkbox-label .checkbox-custom:after {\\n  left: 6px;\\n  top: 2px;\\n  width: 4px;\\n  height: 8px;\\n  border: solid white;\\n  border-width: 0 2px 2px 0;\\n  transform: rotate(45deg);\\n}\\n\\n.checkbox-input:focus ~ .checkbox-custom {\\n  box-shadow: 0 0 0 4px var(--primary-focus);\\n  border-color: var(--primary-color);\\n}\\n\\n.submit-btn {\\n  width: 100%;\\n  padding: 0.75rem 1rem;\\n  background-color: var(--primary-color);\\n  color: #ffffff;\\n  border: none;\\n  border-radius: 0.5rem;\\n  font-size: 0.95rem;\\n  font-weight: 600;\\n  cursor: pointer;\\n  transition: background-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n}\\n\\n.submit-btn:hover:not(:disabled) {\\n  background-color: var(--primary-hover);\\n}\\n\\n.submit-btn:focus {\\n  outline: none;\\n  box-shadow: 0 0 0 4px var(--primary-focus);\\n}\\n\\n.submit-btn:disabled {\\n  opacity: 0.7;\\n  cursor: not-allowed;\\n}\\n\\n.spinner-container {\\n  display: flex;\\n  align-items: center;\\n  gap: 0.5rem;\\n}\\n\\n.spinner {\\n  width: 1.125rem;\\n  height: 1.125rem;\\n  border: 2px solid rgba(255, 255, 255, 0.3);\\n  border-radius: 50%;\\n  border-top-color: #ffffff;\\n  animation: spin 0.8s linear infinite;\\n}\\n\\n@keyframes spin {\\n  to {\\n    transform: rotate(360deg);\\n  }\\n}\\n\\n.login-footer {\\n  margin-top: 2rem;\\n  text-align: center;\\n}\\n\\n.footer-text {\\n  font-size: 0.875rem;\\n  color: var(--text-secondary);\\n  margin: 0;\\n}\\n\\n.signup-link {\\n  color: var(--primary-color);\\n  text-decoration: none;\\n  font-weight: 600;\\n}\\n\\n.signup-link:hover {\\n  text-decoration: underline;\\n}\\n\"\n    }\n  ]\n}"
}
const parsedTest: GeneratedFiles = JSON.parse(promptReponse.code);
export default function PromptInput() {
  const [prompt, setPrompt] = useState<string>("");
  // const [generatedFiles, setGeneratedFiles] = useState<FileItem[]>([]);
  const [generatedFiles, setGeneratedFiles] = useState<FileItem[]>(parsedTest.files);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSpeech, setIsSpeech] = useState<boolean>(false);
  const navigate = useNavigate()
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { id } = useParams();
  console.log("id: ", id);
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

  const generateCode = async (prompt: string): Promise<void> => {
    setLoading(true)
    navigate('/467913346999799')
    setTimeout(() => {
      // setLoading(false)
    }, 5000);
    return
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
  if (error.length > 0) {
    return <p style={{ color: "red", marginTop: "20px" }}>{error}</p>
  }



  return (
    <>
      <div className="prompt-comp">
        {id &&
          <div className="generated-files">
            {generatedFiles.map((file) => (
              <div
                className="generated-files-block"
                key={file.filename}
              >
                <span className="generated-files-block-text">
                  {file.filename}
                </span>
                <CopyButton text={file.content} />
                <SyntaxHighlighter
                  language={file.language}
                  style={oneLight}
                  showLineNumbers
                  wrapLongLines
                  customStyle={{
                    margin: 0,
                    borderRadius: "15px",
                    padding: "18px",
                    fontSize: "14px",
                    background: "#fff",
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily:
                        "'Fira Code', Consolas, Monaco, monospace",
                    },
                  }}
                >
                  {file.content}
                </SyntaxHighlighter>
              </div>
            ))}
          </div>
        }


        <div className={`prompt-wrapper`}>
          <div className={`prompt-block ${id ?"":"new-prompt"}`}>
            {!id && <div className="prompt-header">
              <div className="prompt-header-title">
                Ready to crush today's goals?
              </div>
            </div>}
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
          {loading && <div className="typing-loader">
            <span></span>
            <span></span>
            <span></span>
          </div>}
        </div>
      </div>

    </>
  );
}
