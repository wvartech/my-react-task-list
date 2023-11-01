import { useContext } from "react";
import { Task } from "./Task";
import { ListContext } from "../App";
import { useState } from "react";
import { useForm } from "react-hook-form"
import {Flex, Box, SimpleGrid,Input, Button, Text} from "@chakra-ui/react";

export default function TaskList(props){

    const { register, handleSubmit, formState: {errors},trigger} = useForm({
        task: "",
        description: "",
    });

    const {tasks} = useContext(ListContext);
    const {addTask} = useContext(ListContext);

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
          <Box p="4" borderWidth="1px" borderColor="gray.200" borderRadius="md" maxWidth="400px" mx="auto">
  <form onSubmit={handleSubmit((data) => createTask(data))}>
    <Flex direction="column" alignItems="center" spacing={4}>
      <Text fontSize="xl" mb="2">
        Create a New Task
      </Text>
      <Input
        type="text"
        placeholder="Task Name"
        {...register("task", {
          required: "Task name is required",
          minLength: {
            value: 3,
            message: "Task name must be longer than 3 characters",
          },
          onChange: () => trigger("task"),
        })}
        className={`form-control ${errors.task ? 'is-invalid' : ''}`}
      />
      {errors.task && (
        <Text color="red" fontSize="sm">
          {errors.task.message}
        </Text>
      )}
      <Input
        type="text"
        placeholder="Task Description"
        {...register("description")}
        className="form-control"
      />
      <Button colorScheme="blue" type="submit">
        Create Task
      </Button>
    </Flex>
  </form>
</Box>
          <div>
            <SimpleGrid columns={{sm:1,md:2,lg:3}} spacing={4}>
              {tasks.map((task, index) => (
                <Box className="mb-4" key={index}>
                  <Task
                    id={task.id}
                    task={task.task}
                    desc={task.desc}
                    checked={task.checked}
                  />
                </Box>
              ))}
            </SimpleGrid>
          </div>
        </>
      );

};