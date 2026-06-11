import { createClient } from "@sanity/client";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID ?? "ndqivyq6";
const dataset = import.meta.env.VITE_SANITY_DATASET ?? "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? "2026-06-11";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  tag: string;
  excerpt: string;
  author: string;
  date: string;
  read: string;
  featured?: boolean;
};

const blogPostsQuery = `*[_type == "post"] | order(featured desc, publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  "tag": category,
  excerpt,
  "author": coalesce(author, "NuruTrace Editorial"),
  "date": coalesce(publishedAt, _createdAt),
  "read": coalesce(readTime, "5 min"),
  featured
}`;

const monthFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

function formatPostDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return monthFormatter.format(date);
}

export async function getBlogPosts() {
  const posts = await sanityClient.fetch<BlogPost[]>(blogPostsQuery);
  return posts.map((post) => ({
    ...post,
    date: formatPostDate(post.date),
  }));
}
