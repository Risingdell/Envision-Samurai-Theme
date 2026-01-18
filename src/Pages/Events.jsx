import { useEffect, useState } from "react";
import Layout from "../Components/Layout";

export default function Events() {
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <p className="page-subtitle">Loading events...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="page-container">
        <h1 className="page-title">Events</h1>
        <p className="page-subtitle">
          Test your skill. Prove your discipline.
        </p>

        {Object.entries(events).map(([department, data]) => (
          <section key={department} className="content-section">
            <h2 className="department-title">{department}</h2>

            {/* Technical */}
            {data.technical.length > 0 && (
              <>
                <h3 className="event-type">Technical Events</h3>
                <ul className="event-list">
                  {data.technical.map((event, index) => (
                    <li key={index}>{event}</li>
                  ))}
                </ul>
              </>
            )}

            {/* Non-Technical */}
            {data.nonTechnical.length > 0 && (
              <>
                <h3 className="event-type">Non-Technical Events</h3>
                <ul className="event-list">
                  {data.nonTechnical.map((event, index) => (
                    <li key={index}>{event}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        ))}
      </main>
    </Layout>
  );
}
