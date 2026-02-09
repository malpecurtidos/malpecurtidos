import groq from "groq";

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "author": author->name,
  "categories": categories[]->title
}`;

export const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  body,
  "author": author->{name, image, bio},
  "categories": categories[]->title
}`;
