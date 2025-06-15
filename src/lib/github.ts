export async function getGithubProjects(page = 1, perPage = 10) {
  const response = await fetch(`https://api.github.com/users/IamThiago-IT/repos?page=${page}&per_page=${perPage}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
    next: { revalidate: 3600 } // Revalidate every hour
  });

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  const repos = await response.json();
  
  type Repo = {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    language: string | null;
    fork: boolean;
  };

  return (repos as Repo[])
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
    }))
    .sort((a, b) => b.stars - a.stars);
}
