// components/GitHubForm.tsx
"use client";
import { useState } from "react";

export default function GitHubForm() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateCommand = () => {
    return `git config --global user.name "${username}"\n` +
           `// Example workflow for ${repo}:\n` +
           `// git clone https://github.com/${owner}/${repo}.git\n` +
           `// cd ${repo}\n` +
           `// echo "Updated by ${username}" >> README.md\n` +
           `// git add README.md\n` +
           `// git commit -m "Update README via app"\n` +
           `// git push`;
  };

  const handleExecute = async () => {
    setLoading(true);
    setError("");
    setOutput(generateCommand());

    try {
      const response = await fetch("/api/update-readme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, token, owner, repo }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update README");
      setOutput(`${output}\nSuccess: README updated! Commit SHA: ${data.commit.sha}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <form onSubmit={(e) => e.preventDefault()}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          GitHub Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.2rem" }}
            aria-required="true"
          />
        </label>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Personal Access Token:
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.2rem" }}
            aria-required="true"
          />
        </label>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Owner (GitHub username or org):
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.2rem" }}
            aria-required="true"
          />
        </label>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Repository Name:
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.2rem" }}
            aria-required="true"
          />
        </label>
        <button
          type="button"
          onClick={handleExecute}
          disabled={loading}
          style={{ padding: "0.5rem 1rem", marginTop: "1rem", background: "#0070f3", color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer" }}
          aria-label="Execute GitHub command"
        >
          {loading ? "Executing..." : "Execute"}
        </button>
      </form>
      {output && (
        <pre style={{ marginTop: "1rem", background: "#f0f0f0", padding: "1rem", borderRadius: "4px", overflowX: "auto" }}>
          {output}
        </pre>
      )}
      {error && <p style={{ color: "red", marginTop: "1rem" }}>Error: {error}</p>}
    </div>
  );
}