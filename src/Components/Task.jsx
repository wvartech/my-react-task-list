import { useContext, useState } from "react";
import { ListContext } from "../App";
import { useEffect } from "react";
import { Flex, Box, Button, Checkbox, Input, Text } from "@chakra-ui/react";

export function Task(props){

   const [complete,setCompleted] = useState(props.checked);
   const {tasks,updateTaskList,removeTask,updateTask} = useContext(ListContext);
   const [content,setContent] = useState(tasks[tasks.findIndex(task => task.id === props.id)].desc);
   const [taskTitle,setTaskTitle] = useState(tasks[tasks.findIndex(task => task.id === props.id)].task);
   const [editing,setEditing] = useState(false);

   useEffect(() => {
    const index = tasks.findIndex(task => task.id === props.id);
    if (index !== -1) {
      const task = tasks[index];
      setCompleted(task.checked);
      setContent(task.desc);
      setTaskTitle(task.task);
    }
  }, [tasks, props.id]);
   

    function handleCheckBoxClicked(){
        let updatedTaskList = [...tasks];
        const index = updatedTaskList.findIndex(task => task.id === props.id);
        let editedElement = {...updatedTaskList[index]};
        editedElement.checked = !complete;
        updatedTaskList[index] = editedElement;

        updateTaskList(updatedTaskList);
        console.log(updatedTaskList);
        setCompleted(!complete);
    }

    function handleButtonDelete(){
        removeTask(props.id);
    }  
    
    function handleButtonEditDone(){        
        const index = tasks.findIndex(task => task.id === props.id);
        let editedElementData = {...tasks[index]};
        editedElementData.task = taskTitle;
        editedElementData.desc = content;
        updateTask(props.id, editedElementData);
        setEditing(false);
    }

    function renderElement() {
      return (
        <Flex
      direction="column"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      p="4"
      bg={complete ? "gray.100" : "white"}
      flex="1"
    >
      {editing ? (
        <Box>
          <Input
            mb="2"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <Input
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button colorScheme="teal" size="sm" onClick={handleButtonEditDone}>
            Done
          </Button>
        </Box>
      ) : (
        <Box>
          <Flex justify="space-between" align="center">
            <Checkbox
              isChecked={complete}
              onChange={handleCheckBoxClicked}
            >
              <Text isTruncated={true}>{taskTitle}</Text>
            </Checkbox>
            <Button colorScheme="red" size="sm" onClick={handleButtonDelete}>
              Delete
            </Button>
            <Button colorScheme="teal" size="sm" onClick={() => setEditing(true)}>
              Edit
            </Button>
          </Flex>
          <Box
            mt="2"
            textDecoration={complete ? "line-through" : "none"}
          >
            <Text isTruncated={true}>{content}</Text>
          </Box>
        </Box>
      )}
    </Flex>
  );
      }


    return (
        renderElement()
    )
};
