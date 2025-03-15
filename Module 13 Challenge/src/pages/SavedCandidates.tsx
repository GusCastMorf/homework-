import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const containerStyle: React.CSSProperties = { textAlign: "center", background: "linear-gradient(to bottom, #001f4d, #000)", color: "#fff", padding: "20px", minHeight: "100vh" };
const tableStyle: React.CSSProperties = { width: "80%", margin: "auto", background: "#fff", color: "#000", borderCollapse: "collapse" };
const thTdStyle: React.CSSProperties = { border: "1px solid black", padding: "10px" };
const headerStyle: React.CSSProperties = { background: "#333", color: "#fff", padding: "10px" };

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem("savedCandidates") || "[]");
    setSavedCandidates(storedCandidates);
  }, []);

  const removeCandidate = (login: string) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.login !== login);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div style={containerStyle}>
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates.</p>
      ) : (
        <table style={tableStyle}>
          <thead style={headerStyle}>
            <tr>
              <th style={thTdStyle}>Image</th>
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Location</th>
              <th style={thTdStyle}>Email</th>
              <th style={thTdStyle}>Company</th>
              <th style={thTdStyle}>Bio</th>
              <th style={thTdStyle}>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.login}>
                <td style={thTdStyle}><img src={candidate.avatar_url} alt={candidate.login} width="50" /></td>
                <td style={thTdStyle}><strong>{candidate.login}</strong></td>
                <td style={thTdStyle}>{candidate.location || "Unknown"}</td>
                <td style={thTdStyle}>{candidate.email || "N/A"}</td>
                <td style={thTdStyle}>{candidate.company || "N/A"}</td>
                <td style={thTdStyle}>{candidate.bio || "No bio available"}</td>
                <td style={thTdStyle}>
                  <button onClick={() => removeCandidate(candidate.login)} style={{ background: "red", color: "white", border: "none", borderRadius: "50%", width: "30px", height: "30px", cursor: "pointer", alignContent: "center" }}></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;
