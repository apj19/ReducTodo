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
      <div className="fixed top-6 right-10">
        <a
          href="https://github.com/apj19/ReducTodo"
          target="_blank"
          className="cursor-pointer"
        >
          <i className="fa-brands fa-square-github z-10 text-[2rem] text-white"></i>
        </a>

        <a
          href="https://www.linkedin.com/in/akshay-jadhav-01737711b/"
          target="_blank"
          className="cursor-pointer ml-4"
        >
          <i className="fa-brands fa-linkedin z-10 text-[2rem] text-white"></i>
        </a>
      </div>
      <h2 className="z-10 text-white text-[2rem] tracking-[2rem]">TODO</h2>
      <Todo />
      <div>
        <ToastContainer autoClose={500} position="top-center" />
      </div>
    </div>
  );
}

export default App;
