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
      .catch((err) => {
        setError("Failed to fetch team members");
        setLoading(false);
        console.error(err);
      });
  }, []);

  return (
    <Layout>
      <main className="page-container">
        <h1 className="page-title">Core Team</h1>

        {loading && <p>Loading team members...</p>}
        {error && <p className="error">{error}</p>}

        <div className="members-grid">
          {members.map((member) => (
            <div key={member.id} className="member-card">
              {member.image_url && (
                <img src={member.image_url} alt={member.name} className="member-image" />
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
