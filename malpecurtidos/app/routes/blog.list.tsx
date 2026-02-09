import type { Route } from "./+types/blog.list";
import { useLoaderData } from "react-router";
import { client } from "~/sanity/client";
import { POSTS_QUERY } from "~/sanity/queries";
import { PostCard } from "~/components/blog/PostCard";
import type { SanityDocument } from "@sanity/client";

export function meta() {
    return [
        { title: "Blog | Malpe Curtidos" },
        {
            name: "description",
            content: "Últimas noticias y artículos sobre curtidos y cuero de Malpe Curtidos.",
        },
        {
            property: "og:title",
            content: "Blog | Malpe Curtidos",
        },
        {
            property: "og:description",
            content: "Últimas noticias y artículos sobre curtidos y cuero de Malpe Curtidos.",
        },
    ];
}

export async function loader() {
    const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);
    return { posts };
}

export default function BlogList({ loaderData }: Route.ComponentProps) {
    const { posts } = loaderData;

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative selection:bg-[#D4AF37] selection:text-black">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-[#8B5A2B]/10 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <header className="mb-20 pt-10 text-center">
                    <span className="block text-[#D4AF37] text-sm font-bold tracking-[0.2em] uppercase mb-4">
                        Actualidad & Tendencias
                    </span>
                    <h1 className="text-5xl md:text-6xl font-sans font-bold text-white mb-6">
                        Nuestro <span className="text-[#D4AF37]">Blog</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Explora nuestros últimos artículos, noticias y actualizaciones del mundo del cuero y la curtiduría de excelencia.
                    </p>
                </header>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <PostCard key={post._id} post={post as any} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <p className="text-xl text-gray-400 font-light">No hay publicaciones disponibles en este momento.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
