import { createContext } from "react";
import { Header } from "./Components/Header"
import { Task } from "./Components/Task"
import TaskList from "./Components/TaskList"
export const ListContext = createContext();
import { useState } from "react";
import { useEffect } from "react";

function App() {
  
  const switcher = true;

  function useArray(initialData){
    const  [data, setData] = useState(initialData);
    

    function addItem(item) {
      let newArray = [...data,item];
      localStorage.setItem("storedTaskList", JSON.stringify(newArray));
      setData(newArray);
    };

    function removeItem(itemID) {
      let newArray = data.filter((x) => x.id !== itemID);
      localStorage.setItem("storedTaskList", JSON.stringify(newArray));
      setData(newArray);
    }

    function updateItem(itemID, itemData) {
      let newArray = [...data];      
      const index = newArray.findIndex(item => item.id === itemID);
      newArray[index] = itemData;
      console.log(itemData);
      localStorage.setItem("storedTaskList", JSON.stringify(newArray));
      setData(newArray);
    }


    return [data, setData, addItem,removeItem,updateItem];

  }

  const [tasks,setTasks,addTask,removeTask,updateTask] = useArray([]);
  


  useEffect(() => { 
    if (localStorage.getItem("storedTaskList") !== null && switcher) {
      const data = localStorage.getItem("storedTaskList");
    console.log(JSON.parse(data));
      setTasks(JSON.parse(data));
      console.log("Getting stored array. . .");
    }else{
      const starterTaskList =  ([
        {id:1, task: "Levantarse", desc: "Despertar el cuerpo.",checked:true},
        {id:2, task: "Comer", desc: "Llenarse de cosis", checked: false},
        {id:3, task: "Bailar", desc: "Mover el cuerpo", checked: false}]);
        updateTaskList(starterTaskList);
    }


  },[]);

    function updateTaskList(list){
      localStorage.setItem("storedTaskList", JSON.stringify(list));
      setTasks(list);      
    }


  return (
    <>
    <ListContext.Provider value={{tasks, updateTaskList, addTask,removeTask,updateTask}}>

      <div  className="d-flex flex-column align-items-center">
       <div className="container text-center">
         <Header name="React Task List" />
         <TaskList tasks={tasks} />
       </div>
      </div>
    </ListContext.Provider>
    </>
  )
}

export default App
