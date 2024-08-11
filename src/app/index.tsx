import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const url = new URL(window.location.href);
const mobileToken = url.searchParams.get("mobileToken");

mobileToken && localStorage.setItem("token", mobileToken);
alert(localStorage.getItem("token"))
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
