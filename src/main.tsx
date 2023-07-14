import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/styles/index.css";
import { FormContextProvider } from "./api/context.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <FormContextProvider>
      <App />
    </FormContextProvider>
  </BrowserRouter>
);
