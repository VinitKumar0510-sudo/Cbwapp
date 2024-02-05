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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <form onSubmit={(e) => e.preventDefault()}>
        <label style={{ display: "block", marginBottom: "1rem" }}>
          GitHub Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "0.75rem", marginTop: "0.5rem", border: "2px solid var(--input-border)", borderRadius: "8px", fontSize: "1rem", transition: "border-color 0.2s", outline: "none", backgroundColor: "var(--input-bg)", color: "var(--text)" }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
            onBlur={(e) => e.target.style.borderColor = "var(--input-border)"}
            aria-required="true"
          />
        </label>
        <label style={{ display: "block", marginBottom: "1rem" }}>
          Personal Access Token:
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
            style={{ width: "100%", padding: "0.75rem", marginTop: "0.5rem", border: "2px solid var(--input-border)", borderRadius: "8px", fontSize: "1rem", transition: "border-color 0.2s", outline: "none", backgroundColor: "var(--input-bg)", color: "var(--text)" }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
            onBlur={(e) => e.target.style.borderColor = "var(--input-border)"}
            aria-required="true"
          />
        </label>
        <label style={{ display: "block", marginBottom: "1rem" }}>
          Owner (GitHub username or org):
          <input
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            style={{ width: "100%", padding: "0.75rem", marginTop: "0.5rem", border: "2px solid var(--input-border)", borderRadius: "8px", fontSize: "1rem", transition: "border-color 0.2s", outline: "none", backgroundColor: "var(--input-bg)", color: "var(--text)" }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
            onBlur={(e) => e.target.style.borderColor = "var(--input-border)"}
            aria-required="true"
          />
        </label>
        <label style={{ display: "block", marginBottom: "1rem" }}>
          Repository Name:
          <input
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            required
            style={{ width: "100%", padding: "0.75rem", marginTop: "0.5rem", border: "2px solid var(--input-border)", borderRadius: "8px", fontSize: "1rem", transition: "border-color 0.2s", outline: "none", backgroundColor: "var(--input-bg)", color: "var(--text)" }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
            onBlur={(e) => e.target.style.borderColor = "var(--input-border)"}
            aria-required="true"
          />
        </label>
        <button
          type="button"
          onClick={handleExecute}
          disabled={loading}
          style={{ padding: "0.75rem 2rem", marginTop: "1rem", background: loading ? "#ccc" : "#0070f3", color: "#fff", border: "none", borderRadius: "8px", fontSize: "1rem", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", transition: "background-color 0.2s" }}
          aria-label="Execute GitHub command"
        >
          {loading ? "Executing Git Commands..." : "Execute Git Commands"}
        </button>
      </form>
      {output && (
        <pre style={{ marginTop: "1rem", background: "var(--code-bg)", color: "var(--code-text)", padding: "1rem", borderRadius: "4px", overflowX: "auto" }}>
          {output}
        </pre>
      )}
      {error && <p style={{ color: "red", marginTop: "1rem" }}>Error: {error}</p>}
    </div>
  );
}