import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import "../Styles/pages.css";

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/team")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch team members");
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <main className="page-container team-page">
        {/* 🍁 FLOATING MAPLE LEAVES (ONLY TEAM PAGE) */}
        <div className="leaves-layer">
          {Array.from({ length: 22 }).map((_, i) => (
            <span
              key={i}
              className="leaf"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${10 + Math.random() * 12}s`,
                animationDelay: `${Math.random() * 6}s`,
                transform: `scale(${0.6 + Math.random()})`,
              }}
            />
          ))}
        </div>

        <h1 className="page-title">Core Team</h1>

        {loading && <p>Loading team members...</p>}
        {error && <p className="error">{error}</p>}

        <div className="members-grid">
          {members.map((member) => (
            <div key={member.id} className="member-card">
              {member.image_url && (
                <img
                  src={member.image_url}
                  alt={member.name}
                  className="member-image"
                />
              )}
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <span className="team-badge">{member.team_name}</span>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
