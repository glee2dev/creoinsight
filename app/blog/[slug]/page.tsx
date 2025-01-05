import { getBlogPostBySlug, getAllBlogPosts } from "@/utils/blog";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import "./prism-theme.css";

interface BlogPostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | CreoInsight Blog`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/blog"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <time dateTime={post.date} className="text-sm">{post.date}</time>
              <span>•</span>
              <span className="text-sm">{post.readTime}</span>
              <span>•</span>
              <span className="text-sm">{post.category}</span>
            </div>
          </header>

          <div className="glass-card rounded-xl p-8 animate-in">
            <div 
              className="prose prose-lg max-w-none dark:prose-invert
                prose-headings:text-foreground 
                prose-p:text-muted-foreground 
                prose-a:text-primary hover:prose-a:text-primary/80
                prose-strong:text-foreground
                prose-code:text-foreground
                prose-pre:bg-muted
                prose-pre:border prose-pre:border-border
                prose-blockquote:border-l-primary
                prose-blockquote:text-muted-foreground
                prose-blockquote:not-italic
                prose-hr:border-border
                prose-th:text-foreground
                prose-td:text-muted-foreground
                prose-li:text-muted-foreground
                prose-ul:space-y-2
                prose-ol:space-y-2
                [&_*]:transition-colors
                [&_pre]:!bg-muted
                [&_pre]:!p-4
                [&_pre]:!rounded-lg
                [&_pre]:!border
                [&_pre]:border-border
                [&_pre]:!my-6
                [&_code]:!text-foreground
                [&_code]:!bg-muted/50
                [&_code]:!px-1.5
                [&_code]:!py-0.5
                [&_code]:!rounded-md
                [&_code]:!border
                [&_code]:border-border
                [&_pre_code]:!bg-transparent
                [&_pre_code]:!p-0
                [&_pre_code]:!border-0
                [&_img]:!rounded-lg
                [&_img]:!border
                [&_img]:border-border
                [&_ul]:!list-disc
                [&_ol]:!list-decimal
                [&_ul_ul]:!mt-2
                [&_ol_ol]:!mt-2
                [&_li]:!marker:text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>
        </article>
      </div>
    </div>
  );
}
