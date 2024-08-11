import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const url = new URL(window.location.href);
const mobileToken = url.searchParams.get("mobileToken");
const companyId = url.searchParams.get("companyId");

alert(companyId);
alert(url)
localStorage.setItem("mobileToken", mobileToken!);
localStorage.setItem("companyId", companyId!);

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
