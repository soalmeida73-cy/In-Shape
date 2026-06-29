import React, { useState } from 'react';
import { Copy, Download, CheckCircle, Database } from 'lucide-react';

interface JSONViewerProps {
  data: any;
  title: string;
  fileName: string;
}

export default function JSONViewer({ data, title, fileName }: JSONViewerProps) {
  const [copied, setCopied] = useState(false);

  const jsonString = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-ice-blue animate-pulse" />
          <div>
            <h4 className="text-sm font-semibold font-heading tracking-wide text-white">{title}</h4>
            <p className="text-xs text-slate-400">Pronto a ser integrado em Supabase, Firebase ou bases de dados locais.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg glass-button-primary"
            title="Copiar JSON"
          >
            {copied ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-ice-blue text-slate-950 hover:bg-sky-200 transition-colors"
            title="Descarregar ficheiro .json"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descarregar .json</span>
          </button>
        </div>
      </div>
      <div className="p-4 bg-slate-950/80 max-h-[350px] overflow-y-auto">
        <pre className="text-xs font-mono text-cyan-300 whitespace-pre-wrap break-all leading-relaxed">
          {jsonString}
        </pre>
      </div>
    </div>
  );
}
