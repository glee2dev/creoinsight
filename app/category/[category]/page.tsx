import { getAllBlogPosts, getAllCategories } from "@/utils/blog";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: { category: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  return {
    title: `${decodeURIComponent(params.category)} Posts | CreoInsight Blog`,
    description: `Browse all articles in the ${decodeURIComponent(params.category)} category.`,
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const posts = await getAllBlogPosts();
  const categoryPosts = posts.filter(
    (post) => post.category.toLowerCase() === decodeURIComponent(params.category).toLowerCase()
  );

  if (categoryPosts.length === 0) {
    return notFound();
  }

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/blog"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>

        <header className="mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {decodeURIComponent(params.category)}
          </h1>
          <p className="text-xl text-muted-foreground">
            Browse all articles in this category
          </p>
        </header>

        <div className="grid gap-8">
          {categoryPosts.map((post, i) => (
            <article 
              key={post.slug}
              className="project-card animate-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="glass-card rounded-xl p-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl font-semibold text-foreground">
                        {post.title}
                      </h2>
                      <span className="text-sm text-primary">{post.date}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-primary">{post.readTime}</span>
                      <span>•</span>
                      <span>{post.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
