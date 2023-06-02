import { Header } from "./Components/Header"
import { Task } from "./Components/Task"
import TaskList from "./Components/TaskList"

function App() {

  const tasks = [
    {id:1, task: "Levantarse"},
    {id:2, task: "Comer"},
    {id:3, task: "Bailar"}];

//  tasks.map(task => console.log(task.task));

  return (
    <>
      <div>
        <Header name="El Titulo" />
        <TaskList tasks={tasks} />
      </div>
    </>
  )
}

export default App
