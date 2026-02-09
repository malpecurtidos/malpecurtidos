import { Link } from "react-router";
import { urlFor } from "~/sanity/image";

interface PostCardProps {
    post: {
        title: string;
        slug: { current: string };
        publishedAt: string;
        mainImage: any;
        excerpt?: string;
        author: string;
        categories: string[];
    };
}

export function PostCard({ post }: PostCardProps) {
    return (
        <Link
            to={`/blog/${post.slug.current}`}
            className="group flex flex-col h-full bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500"
        >
            <div className="aspect-[16/9] w-full overflow-hidden bg-zinc-900 relative">
                {post.mainImage ? (
                    <>
                        <img
                            src={urlFor(post.mainImage).width(600).height(340).url()}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-500 bg-zinc-900">
                        <span className="italic font-serif text-zinc-600">Malpe Curtidos</span>
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow relative">
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.categories?.map((category) => (
                        <span key={category} className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                            {category}
                        </span>
                    ))}
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2 leading-snug">
                    {post.title}
                </h3>
                {post.excerpt && (
                    <p className="text-sm text-gray-400 line-clamp-2 mb-4 font-light">
                        {post.excerpt}
                    </p>
                )}
                <div className="mt-auto pt-4 flex items-center justify-between text-xs text-gray-500 border-t border-white/5 uppercase tracking-wider">
                    <span className="font-medium text-gray-400">{post.author}</span>
                    <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </time>
                </div>
            </div>
        </Link>
    );
}
