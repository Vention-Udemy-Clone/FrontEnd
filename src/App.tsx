import { Toaster } from "sonner";
import { AppRoutes as Routes } from "./routes";
import { ThemeProvider } from "./theme-provider";

const App = () => {
  return (
    <ThemeProvider>
      <Routes />
      <Toaster richColors closeButton />
    </ThemeProvider>
  );
};

export default App;
