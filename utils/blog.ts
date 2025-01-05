import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism";
import rehypeStringify from "rehype-stringify";

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string;
  slug: string;
}

interface FrontMatter {
  id: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
}

const blogDirectory = path.join(process.cwd(), "data/blog");

function validateFrontMatter(data: any): data is FrontMatter {
  const required = ['id', 'title', 'date', 'readTime', 'category', 'excerpt'];
  return required.every(field => typeof data[field] === 'string');
}

async function processMarkdown(content: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(content);

  return result.toString();
}

function formatCategoryName(category: string): string {
  // Convert "Artificial Intelligence" to "artificial-intelligence"
  return category.toLowerCase().replace(/\s+/g, '-');
}

function normalizeCategoryName(category: string): string {
  // Convert directory name to display format
  // e.g., "artificial-intelligence" to "Artificial Intelligence"
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// 1. Fetch all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(blogDirectory)) {
    console.warn("Blog directory does not exist. Returning an empty list.");
    return [];
  }

  const categories = fs.readdirSync(blogDirectory);
  const posts: BlogPost[] = [];

  for (const categoryDir of categories) {
    const categoryPath = path.join(blogDirectory, categoryDir);
    if (!fs.lstatSync(categoryPath).isDirectory()) continue;

    try {
      const files = fs.readdirSync(categoryPath);
      
      for (const fileName of files) {
        if (!fileName.endsWith('.md')) continue;

        try {
          const filePath = path.join(categoryPath, fileName);
          const fileContent = fs.readFileSync(filePath, "utf-8");
          const { data, content } = matter(fileContent);

          if (!validateFrontMatter(data)) {
            console.warn(`Invalid frontmatter in ${filePath}. Skipping file.`);
            continue;
          }

          // Ensure category in frontmatter matches directory structure
          const expectedDirName = formatCategoryName(data.category);
          if (categoryDir !== expectedDirName) {
            console.warn(
              `Category mismatch in ${filePath}. Expected directory "${expectedDirName}" but found "${categoryDir}"`
            );
          }

          const processedContent = await processMarkdown(content);

          posts.push({
            id: data.id,
            title: data.title,
            date: data.date,
            readTime: data.readTime,
            category: data.category,
            excerpt: data.excerpt,
            content: processedContent,
            slug: fileName.replace(/\.md$/, ""),
          });
        } catch (error) {
          console.error(`Error processing ${fileName}:`, error);
          continue;
        }
      }
    } catch (error) {
      console.error(`Error reading category ${categoryDir}:`, error);
      continue;
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 2. Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!fs.existsSync(blogDirectory)) {
    console.warn("Blog directory does not exist.");
    return null;
  }

  const categories = fs.readdirSync(blogDirectory);

  for (const category of categories) {
    const categoryPath = path.join(blogDirectory, category);
    if (!fs.lstatSync(categoryPath).isDirectory()) continue;

    try {
      const files = fs.readdirSync(categoryPath);
      const matchingFile = files.find(file => file === `${slug}.md`);

      if (matchingFile) {
        const filePath = path.join(categoryPath, matchingFile);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        if (!validateFrontMatter(data)) {
          console.warn(`Invalid frontmatter in ${filePath}`);
          return null;
        }

        const processedContent = await processMarkdown(content);

        return {
          id: data.id,
          title: data.title,
          date: data.date,
          readTime: data.readTime,
          category: data.category,
          excerpt: data.excerpt,
          content: processedContent,
          slug,
        };
      }
    } catch (error) {
      console.error(`Error processing category ${category}:`, error);
      continue;
    }
  }

  return null;
}

// 3. Fetch all categories
export async function getAllCategories(): Promise<string[]> {
  if (!fs.existsSync(blogDirectory)) {
    console.warn("Blog directory does not exist. Returning an empty list.");
    return [];
  }

  try {
    const categories = fs.readdirSync(blogDirectory)
      .filter(item => fs.lstatSync(path.join(blogDirectory, item)).isDirectory());
    
    return categories.map(normalizeCategoryName);
  } catch (error) {
    console.error("Error reading categories:", error);
    return [];
  }
}
