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
    <div className="min-w-[375px] max-w-[1440px] min-h-[100vh]  flex flex-col items-center  pt-16 overflow-x-hidden bg-[#181824]">
      <div
        className=" w-full h-[50%] absolute top-0 left-0 bg-cover bg-center"
        style={{ backgroundImage: "url('./bg-desktop-dark.jpg')" }}
      ></div>
      <h2 className="z-10 text-white text-[2rem] tracking-[2rem]">TODO</h2>
      <Todo />
      <div>
        <ToastContainer autoClose={500} position="bottom-left" />
      </div>
    </div>
  );
}

export default App;
