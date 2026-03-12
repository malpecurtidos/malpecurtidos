import { Link } from "react-router";

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}

export function LegalPageLayout({ eyebrow, title, updatedAt, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <div className="mx-auto max-w-4xl px-6 pb-20 pt-28 md:px-8 md:pt-36">
        <nav className="mb-8">
          <Link to="/" className="text-sm text-gray-400 transition-colors hover:text-white">
            Inicio
          </Link>
        </nav>

        <header className="mb-10 border-b border-white/10 pb-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#967D59]">
            {eyebrow}
          </p>
          <h1 className="mb-4 text-4xl font-semibold leading-tight md:text-5xl">{title}</h1>
          <p className="text-sm text-gray-400">Ultima actualizacion: {updatedAt}</p>
        </header>

        <article className="space-y-8 text-base leading-8 text-gray-300 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </article>
      </div>
    </div>
  );
}
