import { Link } from "react-router-dom";
const container: React.CSSProperties = {
  textAlign: "center", color: "white", marginTop: "50px" 
};
const link: React.CSSProperties = {
  textDecoration: "none", color: "lightblue", fontSize: "18px"
};

const ErrorPage = () => {
  return (
    <div style={container}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! Looks like this page doesn't exist.</p>
      <Link to="/" style={link}>Go back home</Link>
    </div>
  );
};



export default ErrorPage;
