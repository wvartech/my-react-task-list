import { createContext } from "react";
import { Header } from "./Components/Header"
import { Task } from "./Components/Task"
import TaskList from "./Components/TaskList"
export const ListContext = createContext();
import { useState } from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./Components/Home";
import { About } from "./Components/About";
import { Tareas } from "./Components/Tareas";
import { ChakraProvider, Link as ChakraLink, Box, Flex } from '@chakra-ui/react'


export function Menu() {
  return (
    <Flex as="nav" align="center" justify="center" p={4} bg="teal.500" color="white">
      <Box>
        <ChakraLink as={Link} to="/" mx={2}>
          Home
        </ChakraLink>
        <ChakraLink as={Link} to="/about" mx={2}>
          About
        </ChakraLink>
        <ChakraLink as={Link} to="/App" mx={2}>
          App
        </ChakraLink>
      </Box>
    </Flex>
  );
}

export function AppRouter(){
  return (
    <>
      <Menu />
      <Routes>
        <Route path="App" element={<> <Tareas /> </>} />
         <Route path="about" element={<About />} />
         <Route path="/" element={ <Home/> } />

      </Routes>
    </>
  )
}

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
    <ChakraProvider>
    <ListContext.Provider value={{tasks, updateTaskList, addTask,removeTask,updateTask}}>

      <div  className="d-flex flex-column align-items-center">
       <div className="container text-center">
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
        
       </div>
      </div>
    </ListContext.Provider>
    </ChakraProvider>
  )
}

export default App
