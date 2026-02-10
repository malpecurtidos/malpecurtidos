import type { Route } from "./+types/blog.post";
import { useLoaderData } from "react-router";
import { PortableText } from "@portabletext/react";
import { client } from "~/sanity/client";
import { POST_QUERY } from "~/sanity/queries";
import { urlFor } from "~/sanity/image";
import { components } from "~/components/blog/PortableTextComponents";
import type { SanityDocument } from "@sanity/client";

export function meta({ data }: Route.MetaArgs) {
    if (!data?.post) {
        return [{ title: "Post no encontrado | Malpe Curtidos" }];
    }
    return [
        { title: `${data.post.title} | Malpe Curtidos` },
        {
            name: "description",
            content: data.post.excerpt || `Lee sobre ${data.post.title} en el blog de Malpe Curtidos.`,
        },
        {
            property: "og:title",
            content: data.post.title,
        },
        {
            property: "og:image",
            content: data.post.mainImage ? urlFor(data.post.mainImage).width(1200).height(630).url() : "",
        },
    ];
}

export async function loader({ params }: Route.LoaderArgs) {
    const post = await client.fetch<SanityDocument>(POST_QUERY, {
        slug: params.slug,
    });

    if (!post) {
        throw new Response("Post Not Found", { status: 404 });
    }

    return { post };
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
    const { post } = loaderData;

    return (
        <article className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 selection:bg-[#D4AF37] selection:text-black">
            {/* Background elements */}
            <div className="fixed top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#8B5A2B]/10 to-transparent pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10">
                <header className="mb-12 text-center">
                    <div className="flex justify-center flex-wrap gap-2 mb-8">
                        {post.categories?.map((category: string) => (
                            <span key={category} className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                                {category}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white mb-8 leading-tight">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-4 text-gray-400 border-y border-white/5 py-6 w-full max-w-lg mx-auto">
                        {post.author?.image && (
                            <img
                                src={urlFor(post.author.image).width(60).height(60).fit("crop").url()}
                                alt={post.author.name}
                                className="w-12 h-12 rounded-full object-cover border border-[#D4AF37]/30"
                            />
                        )}
                        <div className="flex flex-col items-start text-xs uppercase tracking-wider">
                            <span className="font-bold text-white mb-1">{post.author?.name || "Autor desconocido"}</span>
                            <time dateTime={post.publishedAt} className="text-gray-500">
                                {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </time>
                        </div>
                    </div>
                </header>

                {post.mainImage && (
                    <div className="mb-16 rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                        <img
                            src={urlFor(post.mainImage).width(1200).height(675).fit("max").url()}
                            alt={post.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                <div className="prose prose-invert prose-lg max-w-none mx-auto text-gray-300 prose-headings:font-sans prose-headings:text-white prose-a:text-[#D4AF37] prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-blockquote:border-l-[#D4AF37] prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic">
                    {post.body ? <PortableText value={post.body} components={components} /> : null}
                </div>
            </div>
        </article>
    );
}
