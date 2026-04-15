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

export interface ChangelogCommit {
  hash: string;
  message: string;
  type: 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'perf' | 'test' | 'chore' | 'other';
  description: string;
  date: string;
  author: string;
  url: string;
}

export async function getGithubChangelog(owner = 'IamThiago-IT', repo = 'me', limit = 50) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${limit}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 } // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch commits');
    }

    type CommitResponse = {
      sha: string;
      commit: {
        message: string;
        author: {
          name: string;
          date: string;
        };
      };
      html_url: string;
    };

    const commits = (await response.json()) as CommitResponse[];

    return commits.map((commit) => {
      const lines = commit.commit.message.split('\n');
      const firstLine = lines[0];
      const match = firstLine.match(/^(feat|fix|docs|style|refactor|perf|test|chore)(?:\(.+\))?:\s(.+)$/);

      let type: ChangelogCommit['type'] = 'other';
      let description = firstLine;

      if (match) {
        type = match[1] as ChangelogCommit['type'];
        description = match[2];
      }

      return {
        hash: commit.sha.slice(0, 7),
        message: firstLine,
        type,
        description,
        date: commit.commit.author.date,
        author: commit.commit.author.name,
        url: commit.html_url,
      };
    });
  } catch (error) {
    console.error('Error fetching changelog:', error);
    return [];
  }
}
