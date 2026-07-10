import { useState } from 'react';
import { CopyBlock, dracula } from "react-code-blocks";
import Sidebar from './components/Sidebar';
import PromptInput from './components/PromptInput';

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
// export default function App(): React.JSX.Element {
//   const [prompt, setPrompt] = useState<string>('');
//   const [generatedFiles, setGeneratedFiles] = useState<FileItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');

//   const generateCode = async (): Promise<void> => {
//     if (prompt.trim().length === 0) {
//       setError('Please enter a prompt.');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setGeneratedFiles([]);

//     try {
//       const payload = {
//         prompt,
//       };

//       const response = await fetch('http://localhost:4200/api/generate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate code.');
//       }

//       const result: GenerateCodeResponse =
//         (await response.json()) as GenerateCodeResponse;

//       const parsed: GeneratedFiles = JSON.parse(result.code);
//       setGeneratedFiles(parsed.files);


//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('Unexpected error occurred.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   console.log(generatedFiles, 'generatedCode ===');

//   return (
//     <main
//       style={{
//         maxWidth: '900px',
//         margin: '40px auto',
//         padding: '20px',
//         fontFamily: 'Arial',
//       }}
//     >
//       <h1>AI Code Generator</h1>

//       <textarea
//         rows={8}
//         value={prompt}
//         placeholder="Example: Create a React login form using TypeScript..."
//         onChange={(event) => setPrompt(event.target.value)}
//         style={{
//           width: '100%',
//           padding: '10px',
//           marginTop: '20px',
//         }}
//       />

//       <button
//         onClick={generateCode}
//         disabled={loading}
//         style={{
//           marginTop: '20px',
//           padding: '12px 24px',
//           cursor: 'pointer',
//         }}
//       >
//         {loading ? 'Generating...' : 'Generate Code'}
//       </button>

//       {error.length > 0 && (
//         <p style={{ color: 'red', marginTop: '20px' }}>
//           {error}
//         </p>
//       )}
//       {generatedFiles.map((file) => (
//         <div
//           key={file.filename}
//           style={{
//             marginTop: 30,
//           }}
//         >
//           <h3>{file.filename}</h3>

//           <CopyBlock
//             text={file.content}
//             language={file.language}
//             theme={dracula}
//             showLineNumbers
//             wrapLongLines
//           />
//         </div>
//       ))}
//     </main>
//   );
// }
export default function App(): React.JSX.Element {
  return (<div className="app-layout">
    <Sidebar />

    <main className="main-content">
      <div className="prompt-wrapper">
        <PromptInput />
      </div>
    </main>
  </div>)
}