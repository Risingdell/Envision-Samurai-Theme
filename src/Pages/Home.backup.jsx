import Navbar from "../Components/Navbar";
import "../Styles/home.css";

export default function Home() {
  return (
    <div id="home">
      <Navbar />

      <section style={{ paddingTop: "120px", color: "white" }}>
        <h1>Welcome to Envision</h1>
      </section>
    </div>
  );
}
