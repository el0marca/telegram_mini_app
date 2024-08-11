import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const url = new URL(window.location.href);
const mobileToken = url.searchParams.get("mobileToken");

localStorage.setItem("mobileToken", mobileToken!);

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
