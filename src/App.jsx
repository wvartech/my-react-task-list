import { createContext } from "react";
import { Header } from "./Components/Header"
import { Task } from "./Components/Task"
import TaskList from "./Components/TaskList"
export const ListContext = createContext();
import { useState } from "react";
import { useEffect } from "react";

function App() {

  const  [tasks, setTasks] = useState([]);


  useEffect(() => { 
    if (localStorage.getItem("storedTaskList") !== null) {
      const data = localStorage.getItem("storedTaskList");
      setTasks(JSON.parse(data));
    }else{
      setTasks = ([
        {id:1, task: "Levantarse", desc: "Despertar el cuerpo.",checked:true},
        {id:2, task: "Comer", desc: "Llenarse de cosis"},
        {id:3, task: "Bailar", desc: "Mover el cuerpo"}]);
        updateTaskList(tasks);
    }

  },[]);

    function updateTaskList(list){
      localStorage.setItem("storedTaskList", JSON.stringify(list));
      setTasks(list);      
    }

  return (
    <>
    <ListContext.Provider value={{tasks, updateTaskList}}>

      <div>
        <Header name="El Titulo" />
        <TaskList tasks={tasks} />
      </div>
    </ListContext.Provider>
    </>
  )
}

export default App
