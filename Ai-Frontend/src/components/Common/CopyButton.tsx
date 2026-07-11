import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
   <button className="copy-btn" onClick={handleCopy}>
      {copied ? <Check className="check-icon" size={16} /> : <Copy size={16} />}
    </button>
  );
}