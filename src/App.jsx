import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Todo from "./Components/Todo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);
  const notify = () => toast("Wow so easy!");

  return (
    <div
      className="min-w-[375px] max-w-[1440px] min-h-[100vh] bg-cover bg-center flex justify-center items-start pt-16 overflow-x-hidden"
      style={{ backgroundImage: "url('./bg.jpg')" }}
    >
      <Todo />
      <div>
        <ToastContainer autoClose={500} position="bottom-left" />
      </div>
    </div>
  );
}

export default App;
