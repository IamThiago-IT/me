import axios from "axios";

const TABNEWS_API_URL = "https://www.tabnews.com.br";
const TABNEWS_API_BASE_URL = "https://www.tabnews.com.br/api/v1";

export interface TabNewsArticle {
  id: string
  owner_username: string
  slug: string
  title: string
  body: string
  status: string
  source_url?: string
  created_at: string
  updated_at: string
  published_at: string
  deleted_at?: string
  tabcoins: number
  owner_id: string
  parent_id?: string
  children_deep_count: number
}

export interface BlogArticle {
  id: string
  title: {
    pt: string
    en: string
  }
  excerpt: {
    pt: string
    en: string
  }
  content: {
    pt: string
    en: string
  }
  date: string
  author: {
    pt: string
    en: string
  }
  coverImage: string
  tags: {
    pt: string[]
    en: string[]
  }
  tabcoins: number
  slug: string
}

export async function getTabNewsArticles(): Promise<TabNewsArticle[]> {
  try {
    const response = await fetch("https://www.tabnews.com.br/api/v1/contents?username=IamThiagoIT&strategy=relevant", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch TabNews articles")
    }

    const articles: TabNewsArticle[] = await response.json()

    // Filter only published articles and sort by date
    return articles
      .filter((article) => article.status === "published" && !article.parent_id)
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
  } catch (error) {
    console.error("Error fetching TabNews articles:", error)
    return []
  }
}

/* Update getTabNewsArticleBySlug to use the provided model: GET {{BaseUrl}}/contents/{user}/{slug} */
export async function getTabNewsArticleBySlug(slug: string): Promise<TabNewsArticle | null> {
  try {
    const url = `${TABNEWS_API_BASE_URL}/contents/IamThiagoIT/${slug}`;
    console.log("Obter conteúdo e dados de uma publicação GET", url);
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching TabNews article:", error);
    return null;
  }
}

function generateExcerpt(content: string, maxLength = 200): string {
  // Remove markdown formatting for excerpt
  const plainText = content
    .replace(/#{1,6}\s+/g, "") // Remove headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.*?)\*/g, "$1") // Remove italic
    .replace(/`(.*?)`/g, "$1") // Remove inline code
    .replace(/\[([^\]]+)\]$$[^)]+$$/g, "$1") // Remove links, keep text
    .replace(/\n+/g, " ") // Replace line breaks with spaces
    .trim()

  return plainText.length > maxLength ? plainText.substring(0, maxLength) + "..." : plainText
}

function extractTags(content: string): string[] {
  // Extract hashtags from content
  const hashtagRegex = /#(\w+)/g
  const matches = content.match(hashtagRegex)

  if (!matches) return ["Desenvolvimento", "Programação"]

  return matches.map((tag) => tag.substring(1)) // Remove # symbol
}

export function convertTabNewsToBlogs(articles: TabNewsArticle[]): BlogArticle[] {
  return articles.map((article) => ({
    id: article.slug,
    title: {
      pt: article.title,
      en: article.title, // Keep same title for both languages
    },
    excerpt: {
      pt: generateExcerpt(article.body),
      en: generateExcerpt(article.body),
    },
    content: {
      pt: article.body,
      en: article.body, // Keep same content for both languages
    },
    date: article.published_at,
    author: {
      pt: "Thiago Desenvolvedor",
      en: "Thiago Developer",
    },
    coverImage: "/placeholder.svg?height=400&width=800",
    tags: {
      pt: extractTags(article.body),
      en: extractTags(article.body),
    },
    tabcoins: article.tabcoins,
    slug: article.slug,
  }))
}

/**
 * Fetches articles from the TabNews API for a specific user using the contents endpoint.
 * Endpoint: https://www.tabnews.com.br/api/v1/contents/{username}?page={page}&per_page={perPage}&strategy={strategy}
 * @param username The username to fetch articles for.
 * @param page The page number to fetch (default is 1).
 * @param perPage The number of articles per page (default is 10).
 * @param strategy The strategy for sorting articles (default is "relevant").
 * @returns A promise resolving to an array of transformed articles.
 */
export async function fetchTabNewsArticles(
  username: string,
  page: number = 1,
  perPage: number = 10,
  strategy: string = "relevant"
) {
  try {
    // Updated URL to use the 'contents' path segment
    const url = `${TABNEWS_API_BASE_URL}/contents/${username}?page=${page}&per_page=${perPage}&strategy=${strategy}`;
    console.log("Fetching TabNews articles from:", url);

    const response = await axios.get(url);
    console.log("Raw response data:", response.data);

    // Ensure the response is an array
    if (!Array.isArray(response.data)) {
      throw new Error("Invalid data format: Expected an array of articles.");
    }

    // Filter only root contents (posts without parent_id)
    const filteredArticles = response.data.filter((article: any) => article.parent_id === null);
    console.log("Filtered articles:", filteredArticles);

    // Transform articles into a consistent format
    const transformedArticles = filteredArticles.map((article: any) => {
      return {
        id: article.slug, // using slug as unique identifier
        title: article.title || "Sem título",
        slug: article.slug,
        date: article.created_at || article.date,
        author: article.user && article.user.username ? article.user.username : "Desconhecido",
        excerpt: article.body ? (article.body.length > 200 ? article.body.substring(0, 200) + "..." : article.body) : "",
        tabcoins: article.tabcoins || 0,
        tags: article.tags || [],
        coverImage: article.coverImage || "/placeholder.svg"
      };
    });

    console.log("Transformed articles:", transformedArticles);
    return transformedArticles;
  } catch (error) {
    console.error("Error fetching TabNews articles:", error);
    throw new Error("Failed to fetch TabNews articles.");
  }
}

/**
 * Fetches user contents from the TabNews API using the endpoint: /contents/{username}
 * This returns all contents for the specified user.
 * @param username The username to fetch contents for.
 * @returns A promise resolving to an array of articles (posts) filtered to only include root contents (where parent_id is null).
 */
export async function fetchUserContents(username: string) {
  try {
    const url = `${TABNEWS_API_BASE_URL}/contents/${username}`;
    console.log("Fetching user contents from:", url);

    const response = await axios.get(url);
    console.log("Raw response data:", response.data);

    // Ensure the response is an array
    if (!Array.isArray(response.data)) {
      throw new Error("Invalid data format: Expected an array of contents.");
    }

    // Filter only root contents (posts without parent_id)
    const filteredArticles = response.data.filter((article: any) => article.parent_id === null);
    console.log("Filtered user contents:", filteredArticles);

    // Transform contents into a consistent format
    const transformedArticles = filteredArticles.map((article: any) => {
      return {
        id: article.slug, // using slug as unique identifier
        title: article.title || "Sem título",
        slug: article.slug,
        date: article.created_at || article.date,
        author: article.user && article.user.username ? article.user.username : "Desconhecido",
        excerpt: article.body ? (article.body.length > 200 ? article.body.substring(0, 200) + "..." : article.body) : "",
        tabcoins: article.tabcoins || 0,
        tags: article.tags || [],
        coverImage: article.coverImage || "/placeholder.svg"
      };
    });

    console.log("Transformed user contents:", transformedArticles);
    return transformedArticles;
  } catch (error) {
    console.error("Error fetching user contents:", error);
    throw new Error("Failed to fetch user contents.");
  }
}
