import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from './types';

const contentDirectory = path.join(process.cwd(), 'src/content/blog');

export function getPostSlugs() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory).filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx?$/, '');
    const fullPath = path.join(contentDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse the frontmatter and the body
    const { data, content } = matter(fileContents);

    return {
      postSlug: realSlug,
      title: data.title || 'Untitled Post',
      excerpt: data.excerpt || '',
      publishedAt: data.publishedAt || 'Unknown Date',
      author: data.author || 'Editorial Team',
      htmlContent: content, // in this case, htmlContent holds raw markdown
    };
  } catch (error) {
    console.error(`Error reading markdown file for slug ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    // sort posts by date in descending order
    .sort((post1, post2) => ((post1.publishedAt || '') > (post2.publishedAt || '') ? -1 : 1));

  return posts;
}
