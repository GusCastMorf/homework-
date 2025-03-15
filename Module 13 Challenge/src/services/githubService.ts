export const fetchRandomCandidate = async () => {
    const response = await fetch(`https://api.github.com/users/octocat`, {
      headers: { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` },
    });
    return await response.json();
  };
  