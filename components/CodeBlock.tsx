"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  lang?: string;
  filename?: string;
}

export default function CodeBlock({ code, lang = "typescript", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block my-5 group">
      <div className="code-header justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-70" />
          </div>
          {filename && (
            <span className="text-[#4b5f73] font-mono text-xs ml-2">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="lang">{lang}</span>
          <button
            onClick={copy}
            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-[#4b5f73] hover:text-[#fbbf24] cursor-pointer"
          >
            {copied ? (
              <><Check size={12} /><span>Copied</span></>
            ) : (
              <><Copy size={12} /><span>Copy</span></>
            )}
          </button>
        </div>
      </div>
      <pre><code>{code.trim()}</code></pre>
    </div>
  );
}

interface InlineCodeProps {
  children: React.ReactNode;
}

export function InlineCode({ children }: InlineCodeProps) {
  return <code className="inline-code">{children}</code>;
}

export function TerminalBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block my-5 group">
      <div className="code-header justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e] opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840] opacity-70" />
          </div>
          <span className="text-[#4b5f73] font-mono text-xs ml-2">terminal</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="lang">bash</span>
          <button
            onClick={copy}
            className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-[#4b5f73] hover:text-[#fbbf24] cursor-pointer"
          >
            {copied ? (
              <><Check size={12} /><span>Copied</span></>
            ) : (
              <><Copy size={12} /><span>Copy</span></>
            )}
          </button>
        </div>
      </div>
      <pre className="!py-4">
        <code>
          {code.trim().split('\n').map((line, i) => (
            <div key={i} className="flex gap-3">
              <span style={{ color: '#fbbf24', userSelect: 'none' }}>$</span>
              <span>{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
