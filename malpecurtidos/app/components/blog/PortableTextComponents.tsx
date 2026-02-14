import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "~/sanity/image";

export const components: PortableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset?._ref) {
                return null;
            }
            return (
                <img
                    className="w-full h-auto rounded-lg my-8"
                    src={urlFor(value).width(800).fit("max").auto("format").url()}
                    alt={value.alt || "Blog image"}
                    loading="lazy"
                />
            );
        },
    },
    block: {
        h1: ({ children }: any) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-100">{children}</h1>
        ),
        h2: ({ children }: any) => (
            <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-100">{children}</h2>
        ),
        h3: ({ children }: any) => (
            <h3 className="text-xl font-bold mt-6 mb-3 text-gray-100">{children}</h3>
        ),
        h4: ({ children }: any) => (
            <h4 className="text-lg font-bold mt-6 mb-3 text-gray-100">{children}</h4>
        ),
        normal: ({ children }: any) => (
            <p className="mt-4 mb-4 leading-relaxed text-gray-300">{children}</p>
        ),
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-400 my-6">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }: any) => (
            <ul className="list-disc pl-5 mt-4 mb-4 text-gray-300 space-y-2">{children}</ul>
        ),
        number: ({ children }: any) => (
            <ol className="list-decimal pl-5 mt-4 mb-4 text-gray-300 space-y-2">{children}</ol>
        ),
    },
    marks: {
        link: ({ children, value }: any) => {
            const rel = !value.href.startsWith("/")
                ? "noreferrer noopener"
                : undefined;
            return (
                <a
                    href={value.href}
                    rel={rel}
                    className="text-indigo-400 hover:text-indigo-300 underline transition-colors"
                >
                    {children}
                </a>
            );
        },
    },
};

