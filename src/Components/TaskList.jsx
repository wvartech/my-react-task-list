import { useContext } from "react";
import { Task } from "./Task";
import { ListContext } from "../App";
import { useState } from "react";
import { useForm } from "react-hook-form"

export default function TaskList(props){

    const { register, handleSubmit, formState: {errors},trigger} = useForm({
        task: "",
        description: "",
    });

    const tasks = props.tasks;
    const {addTask} = useContext(ListContext)

    const [task,setTask] = useState("");
    const [description,setDescription] = useState("");
    const d = new Date();
    let time = d.getTime();

    function createTask(data){
        const inputData = {id:time, task:data.task, desc:data.description, checked:false};
    //    console.log(inputData);
        addTask(inputData);

    }

    return (
        <>
        <div>
            <form onSubmit={handleSubmit((data) => {
                createTask(data);
            })  }>
                <label> Task:
                    <input type="text" placeholder="Task Name" {...register(
                        "task",
                        {required: "Task name is required",
                        minLength: {value:3, message: "Task name must be longer than 3 characters"},                        
                        onChange: () => trigger("task")
                        }                        
                    )} />
                </label>  
                <span className="error" role="alert" > {errors.task?.message}  </span>              
                <label> Description:
                    <input type="text" placeholder="Task Description" {...register("description")} />
                </label>
                <input type="submit" value="Create Task" />
            </form>
        </div>
        <div>
           { tasks.map((task,index) => (
              <Task key={index} id={task.id} task={task.task} desc={task.desc} checked={task.checked}/>
            )
            )
            }
        </div>

        </>
    );

};