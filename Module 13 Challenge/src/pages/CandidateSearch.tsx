import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const containerStyle: React.CSSProperties = { textAlign: "center", background: "linear-gradient(to bottom, #001f4d, #000)", color: "#fff", padding: "20px" };
const cardStyle: React.CSSProperties = { background: "#fff", color: "#000", padding: "20px", borderRadius: "10px", display: "inline-block", textAlign: "left" };
const avatarStyle: React.CSSProperties = { width: "100px", borderRadius: "50%" };
const buttonContainerStyle: React.CSSProperties = { display: "flex", justifyContent: "center", gap: "20px", marginTop: "15px" };
const buttonStyle = (color: string) => ({ background: color, color: "white", padding: "10px", cursor: "pointer", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" });

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string>("");

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    setLoading(true);
    try {
      const randomId = Math.floor(Math.random() * 1000000) + 1;
      const response = await fetch(`https://api.github.com/users?since=${randomId}`, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` },
      });

      if (!response.ok) throw new Error(`GitHub API Error: ${response.status}`);

      const users = await response.json();
      if (users.length === 0) throw new Error("No users found, try again.");

      const candidateData = await fetch(users[0].url, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}` },
      });

      if (!candidateData.ok) throw new Error(`GitHub API Error: ${candidateData.status}`);

      const candidate = await candidateData.json();
      setCandidate(candidate);
    } catch (error) {
      console.error("Error fetching candidate:", error);
    }
    setLoading(false);
  };

  const saveCandidate = () => {
    if (!candidate) return;

    const savedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    savedCandidates.push(candidate);
    localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));

    fetchCandidate();
  };

  return (
    <div style={containerStyle}>
      <h1>Candidate Search</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : candidate ? (
        <div style={cardStyle}>
          <img src={candidate.avatar_url} alt={candidate.login} style={avatarStyle} />
          <h2>{candidate.login}</h2>
          <p><strong>Location:</strong> {candidate.location || "Unknown"}</p>
          <p><strong>Email:</strong> {candidate.email || "N/A"}</p>
          <p><strong>Company:</strong> {candidate.company || "N/A"}</p>
          <p><strong>Bio:</strong> {candidate.bio || "No bio available"}</p>

          <div style={buttonContainerStyle}>
            <button onClick={fetchCandidate} style={buttonStyle("red")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button onClick={saveCandidate} style={buttonStyle("green")}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <p>No candidate found.</p>
      )}
    </div>
  );
};

export default CandidateSearch;
