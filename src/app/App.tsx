import { ReduxProvider, ThemeProvider } from "./providers";
import { AppRouter } from "./router";

function App() {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
