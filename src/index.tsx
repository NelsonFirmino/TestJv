import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./globalStyle/styles";
import { ThemeProvider } from "styled-components";
import theme from "./globalStyle/theme";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { UseSharedState } from "./context/SharedContext";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <UseSharedState>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Toaster />
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </UseSharedState>
);
reportWebVitals();
