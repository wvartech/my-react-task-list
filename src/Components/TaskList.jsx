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
          <div className="container">
            <form onSubmit={handleSubmit((data) => {
              createTask(data);
            })}>
              <div className="form-group">
                <label>Task:</label>
                <input
                  type="text"
                  placeholder="Task Name"
                  {...register("task", {
                    required: "Task name is required",
                    minLength: {
                      value: 3,
                      message: "Task name must be longer than 3 characters"
                    },
                    onChange: () => trigger("task")
                  })}
                  className={`form-control ${errors.task ? 'is-invalid' : ''}`}
                />
                {errors.task && (
                  <span className="invalid-feedback" role="alert">
                    {errors.task.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input
                  type="text"
                  placeholder="Task Description"
                  {...register("description")}
                  className="form-control"
                />
              </div>
              <input type="submit" value="Create Task" className="btn btn-primary" />
            </form>
          </div>
          <div>
            <div className="d-flex flex-column align-items-center">
              {tasks.map((task, index) => (
                <div className="mb-4" key={index}>
                  <Task
                    id={task.id}
                    task={task.task}
                    desc={task.desc}
                    checked={task.checked}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      );

};