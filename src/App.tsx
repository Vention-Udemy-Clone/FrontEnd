import { Toaster } from 'sonner';
import { AppRoutes as Routes } from "./routes";

const App = () => {
  return (
    <>
      <Routes />
      <Toaster richColors closeButton />
    </>
  );
};

export default App;
