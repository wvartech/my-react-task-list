import {Box, Heading, Text, Center} from "@chakra-ui/react";

export function About(props) {
    return (
      <Center h="60vh">
        <Box p={4} textAlign="center" maxW="650px">
          <Heading as="h1" size="xl">
            React Task List
          </Heading>
          <Text fontSize="lg" mt="4">
            React Task List es una sencilla aplicación web desarrollada utilizando React y otras librerías para darle dinamismo e interactividad. Puedes crear tareas, agregarlas y editarlas, todo esto sin tener que recargar la página.
          </Text>
        </Box>
      </Center>
    );
  }