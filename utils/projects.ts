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

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  duration: string;
  role: string;
  category: string;
  technologies: string[];
  tasks: string[];
  content: string;
  images?: {
    src: string;
    alt: string;
  }[];
}

interface FrontMatter {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  duration: string;
  role: string;
  category: string;
  technologies: string[];
  tasks: string[];
  images?: {
    src: string;
    alt: string;
  }[];
}

const projectsDirectory = path.join(process.cwd(), "data/projects");

function validateFrontMatter(data: any): data is FrontMatter {
  const required = ['id', 'title', 'description', 'shortDescription', 'duration', 'role', 'category', 'technologies', 'tasks'];
  return required.every(field => {
    if (field === 'technologies' || field === 'tasks') {
      return Array.isArray(data[field]);
    }
    return typeof data[field] === 'string';
  });
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
  // Convert "Web Development" to "web-development"
  return category.toLowerCase().replace(/\s+/g, '-');
}

function normalizeCategoryName(category: string): string {
  // Convert directory name to display format
  // e.g., "web-development" to "Web Development"
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// 1. Fetch all projects
export async function getAllProjects(): Promise<Project[]> {
  if (!fs.existsSync(projectsDirectory)) {
    console.warn("Projects directory does not exist. Returning an empty list.");
    return [];
  }

  const categories = fs.readdirSync(projectsDirectory);
  const projects: Project[] = [];

  for (const categoryDir of categories) {
    const categoryPath = path.join(projectsDirectory, categoryDir);
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

          projects.push({
            ...data,
            content: processedContent,
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

  return projects;
}

// 2. Fetch a single project by ID
export async function getProjectById(id: string): Promise<Project | null> {
  if (!fs.existsSync(projectsDirectory)) {
    console.warn("Projects directory does not exist.");
    return null;
  }

  const categories = fs.readdirSync(projectsDirectory);

  for (const category of categories) {
    const categoryPath = path.join(projectsDirectory, category);
    if (!fs.lstatSync(categoryPath).isDirectory()) continue;

    try {
      const files = fs.readdirSync(categoryPath);
      const matchingFile = files.find(file => file.endsWith('.md'));

      if (matchingFile) {
        const filePath = path.join(categoryPath, matchingFile);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(fileContent);

        if (data.id === id) {
          if (!validateFrontMatter(data)) {
            console.warn(`Invalid frontmatter in ${filePath}`);
            return null;
          }

          const processedContent = await processMarkdown(content);

          return {
            ...data,
            content: processedContent,
          };
        }
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
  if (!fs.existsSync(projectsDirectory)) {
    console.warn("Projects directory does not exist. Returning an empty list.");
    return [];
  }

  try {
    const categories = fs.readdirSync(projectsDirectory)
      .filter(item => fs.lstatSync(path.join(projectsDirectory, item)).isDirectory());
    
    return categories.map(normalizeCategoryName);
  } catch (error) {
    console.error("Error reading categories:", error);
    return [];
  }
}
