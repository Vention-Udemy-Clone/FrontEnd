import { Toaster } from "sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import { AppRoutes as Routes } from "./routes";

const App = () => {
  return (
    <ThemeProvider>
      <Routes />
      <Toaster richColors closeButton />
    </ThemeProvider>
  );
};

export default App;
