import Navbar from "./Navbar";
import "../Styles/pages.css";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
