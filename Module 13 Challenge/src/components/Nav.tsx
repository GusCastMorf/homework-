import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/savedcandidates" style={styles.link}>Potential Candidates</Link>
    </nav>
  );
};

const styles = {
  nav: { display: "flex", gap: "20px", padding: "10px", background: "#000", color: "#fff" },
  link: { textDecoration: "none", color: "#fff", fontSize: "18px" }
};

export default Nav;
