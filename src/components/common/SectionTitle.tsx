import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  icon_src?: string;
  children?: ReactNode;
}

export default function SectionTitle({ title, subtitle, icon_src, children }: SectionTitleProps) {
  return (
    <div>
      <p className="text-neutral-900 text-2xl font-medium">{subtitle}</p>
      <div className="flex gap-4 items-center mt-2 mb-6">
        <p className="text-purple-700 text-6xl font-extrabold">{title}</p>
        {icon_src && <img src={icon_src} alt="icon" className="h-14" />}
      </div>
      {children}
    </div>
  );
}
