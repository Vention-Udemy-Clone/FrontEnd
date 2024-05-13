import { Button } from "./components/ui/button";

const App = () => {
  return (
    <div>
      <Button variant={"destructive"}>Click</Button>
      <Button variant={"default"}>Click</Button>
      <Button variant={"secondary"}>Click</Button>
      <Button variant={"ghost"}>Click</Button>
      <Button variant={"link"}>Click</Button>
      <div className="text-red-500">Hello</div>
    </div>
  );
};

export default App;
