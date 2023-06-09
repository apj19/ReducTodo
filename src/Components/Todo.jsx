import React, { useState } from "react";
import { input, Input } from "@material-tailwind/react";
import { Tooltip, Button } from "@material-tailwind/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "@reduxjs/toolkit";
import {
  increment,
  completeTask,
  editTask,
  restoreTask,
  CompleteAllTasks,
  deleteAllHistoryTask,
} from "../features/taskSlice";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import "animate.css";
import { Tab } from "@headlessui/react";

function Todo() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [selectedIndex, setSelectedIndex] = useState(0);
  const taskList = useSelector((state) => state.task.allTasks);
  const historyList = useSelector((state) => state.task.historyTask);
  const [showHistory, setShowHistory] = useState(false);
  const dispatch = useDispatch();
  const [edittasks, setEditTask] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // console.log(errors);
  const notify = () => toast("Task Added!");
  const notify1 = () => toast.success("Task Completed!");
  const notifyEdit = () => toast.info("Task Edited!");
  const notifyRestore = () => toast.info("Task Restored!");
  const AllTaskCompleted = () => toast.success("All Task Completed!");
  const AllTaskDeleted = () => toast.error("All Task Deleted!");

  const [editInput, SetEditInput] = useState({ show: false, value: "asfasd" });

  return (
    <div
      className="z-[10] mt-16 
     min-w-[250px] md:min-w-[400px]   "
    >
      <div className="bg-[#25273c] text-white rounded-lg mb-8 ">
        <div>
          <form
            className="flex justify-center items-center gap-4 px-4 py-4 mb-4 "
            onSubmit={handleSubmit((data) => {
              // console.log(data);
              reset();
              notify();
              setShowHistory(false);
              setSelectedIndex(0);

              dispatch(increment({ id: nanoid(), task: data.Task }));
            })}
          >
            <Input
              {...register("Task", { required: "Please add Task" })}
              variant="outlined"
              label="Add Task"
              className="text-white"
            />
            <div>
              <input className="p-2 cursor-pointer" type="submit" />
            </div>
          </form>
          <p className="text-red-500 text-center">{errors.Task?.message}</p>
        </div>
      </div>

      <div className="z-10 bg-[#25273c] text-[#cbcde5] rounded-lg">
        {!showHistory &&
          taskList.map((m, index) => (
            <div key={m.id} className=" py-2 ">
              {editInput.value == index && (
                <div className="flex justify-between items-center mx-6 gap-4 ">
                  {" "}
                  <Input
                    variant="outlined"
                    label="Add Task"
                    className="text-white"
                    defaultValue={m.task}
                    onChange={(e) => setEditTask(e.target.value)}
                  />
                  <Tooltip content="Submit">
                    <button
                      onClick={() => {
                        dispatch(editTask({ id: m.id, value: edittasks }));
                        SetEditInput({ show: false, value: "asfasd" });
                        notifyEdit();
                      }}
                      className="px-2"
                    >
                      <i className="fa-solid fa-check-double text-blue-500"></i>
                    </button>
                  </Tooltip>
                </div>
              )}
              {editInput.value != index && (
                <div className="flex justify-between items-center mx-4  animate__animated animate__fadeIn ease-in-out cursor-pointer">
                  <p className="px-4 py-2 rounded text-[1rem]  ">{m.task}</p>

                  <div className="flex gap-8 mr-4">
                    <Tooltip className="" content="Edit">
                      <svg
                        className="w-4 h-4 fill-red-500 cursor-pointer "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        onClick={() =>
                          SetEditInput({ show: false, value: index })
                        }
                      >
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                      </svg>
                    </Tooltip>

                    <Tooltip content="Complete">
                      <svg
                        className="w-4 h-4 fill-green-500 cursor-pointer "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        onClick={() => {
                          dispatch(completeTask({ id: m.id, value: m.task }));
                          notify1();
                        }}
                      >
                        <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                      </svg>
                    </Tooltip>
                  </div>
                </div>
              )}
            </div>
          ))}
        {showHistory &&
          historyList.map((m) => (
            <div
              key={m.id}
              className="flex justify-between items-center mx-4  animate__animated animate__fadeIn ease-in-out cursor-pointer py-2"
            >
              <p className="px-4 py-2 rounded text-[1rem] line-through  ">
                {m.value}
              </p>

              <div className="flex gap-8 mr-4">
                <Tooltip content="Restore">
                  <i
                    onClick={() => {
                      dispatch(restoreTask({ id: m.id, task: m.value }));
                      setShowHistory(false);
                      notifyRestore();
                      setSelectedIndex(0);
                    }}
                    className="fa-solid fa-rotate-right text-blue-500"
                  ></i>
                </Tooltip>
              </div>
            </div>
          ))}

        {(taskList.length > 0 || historyList.length > 0) && (
          <div
            className="px-8 py-2 flex flex-col md:flex-row  justify-between items-center text-[0.8rem]
           text-[#61627c]"
          >
            <div className="flex justify-between items-center w-full">
              <p>
                {showHistory ? historyList.length : taskList.length} Items Left
              </p>
              <Tab.Group
                className="hidden md:flex"
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
              >
                <Tab.List className=" flex justify-between items-center gap-2">
                  <Tab
                    onClick={() => setShowHistory(false)}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 ",
                        "",
                        selected ? "text-blue-500" : ""
                      )
                    }
                  >
                    Active
                  </Tab>
                  <Tab
                    onClick={() => setShowHistory(true)}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                        selected ? "text-blue-500" : ""
                      )
                    }
                  >
                    Completed
                  </Tab>
                </Tab.List>
              </Tab.Group>
              {!showHistory && (
                <button
                  onClick={() => {
                    dispatch(CompleteAllTasks());
                    setShowHistory(true);
                    setSelectedIndex(1);
                    AllTaskCompleted();
                  }}
                  className="cursor-pointer text-green-500"
                >
                  Complete All
                </button>
              )}
              {showHistory && (
                <button
                  onClick={() => {
                    dispatch(deleteAllHistoryTask());
                    setShowHistory(false);
                    setSelectedIndex(0);
                    AllTaskDeleted();
                  }}
                  className="cursor-pointer text-red-500"
                >
                  Delete All
                </button>
              )}
            </div>
            <div className="md:hidden">
              <Tab.Group
                className=""
                selectedIndex={selectedIndex}
                onChange={setSelectedIndex}
              >
                <Tab.List className=" flex justify-between items-center gap-2">
                  <Tab
                    onClick={() => setShowHistory(false)}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5 ",
                        "",
                        selected ? "text-blue-500" : ""
                      )
                    }
                  >
                    Active
                  </Tab>
                  <Tab
                    onClick={() => setShowHistory(true)}
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                        selected ? "text-blue-500" : ""
                      )
                    }
                  >
                    Completed
                  </Tab>
                </Tab.List>
              </Tab.Group>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
