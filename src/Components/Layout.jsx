import KatanaNavbar from "./KatanaNavbar";
import "../Styles/pages.css";
export default function Layout({ children }) {
  return (
    <>
      <KatanaNavbar />
      {children}
    </>
  );
}
