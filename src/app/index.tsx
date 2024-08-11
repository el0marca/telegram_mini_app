import ReactDOM from "react-dom/client";
import App from "./App.tsx";
console.log(window.location.href);
localStorage.setItem("token", "0a551067-569c-4b1a-857e-d24c1c0dc9d3");

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
