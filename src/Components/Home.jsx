import {Box, Heading, Text, Center } from "@chakra-ui/react";

export function Home(props) {
    return (
        <Center h="60vh">
      <Box p={4} textAlign="center">
        <Heading as="h1" size="xl">
          React Task List
        </Heading>
        <Text fontSize="lg" mt="4">Bienvenido a la aplicación de React Task List!</Text>
      </Box>
      </Center>
    );
  }