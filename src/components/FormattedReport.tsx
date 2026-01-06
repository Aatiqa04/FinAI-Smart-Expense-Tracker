import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { formatBold } from '../utils/formatters';

interface Props {
  content: string;
}

export const FormattedReport: React.FC<Props> = ({ content }) => {
  const lines = content.split('\n');

  return (
    <div className="space-y-4">
      {lines.map((line, idx) => {
        const cleanLine = line.trim();

        if (!cleanLine) return <div key={idx} className="h-2" />;

        // Handle Headers (# Section)
        if (cleanLine.startsWith('#')) {
          const text = cleanLine.replace(/^#+\s*/, '');
          return (
            <h3 key={idx} className="text-xl font-black text-emerald-400 mt-8 mb-4 border-l-4 border-emerald-500 pl-4 uppercase tracking-wider">
              {text}
            </h3>
          );
        }

        // Handle Bullet Points (* or -)
        if (cleanLine.startsWith('* ') || cleanLine.startsWith('- ')) {
          const text = cleanLine.replace(/^[*|-]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-3 ml-4 py-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
              <p
                className="text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatBold(text) }}
              />
            </div>
          );
        }

        // Handle Numbered Lists (1. )
        if (/^\d+\.\s/.test(cleanLine)) {
          const text = cleanLine.replace(/^\d+\.\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-3 ml-4 py-1">
              <span className="font-black text-emerald-500 shrink-0 mt-0.5">
                {cleanLine.match(/^\d+/)?.[0]}.
              </span>
              <p
                className="text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatBold(text) }}
              />
            </div>
          );
        }

        // Regular Paragraph with Bold formatting
        return (
          <p
            key={idx}
            className="text-slate-300 leading-relaxed text-lg"
            dangerouslySetInnerHTML={{ __html: formatBold(cleanLine) }}
          />
        );
      })}
    </div>
  );
};
