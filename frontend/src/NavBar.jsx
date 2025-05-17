import {
  Box,
  Flex,
  Button,
  HStack,
  Text,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavBar() {
  const navigate = useNavigate();
  const toast = useToast();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsAdmin(user?.role === "Admin");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast({
      title: "Logged out successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    navigate("/auth");
  };

  const handleCreateEvent = () => {
    navigate("/create-event");
  };

  return (
    <Box px={8} py={4} shadow="md" position="sticky" zIndex={10} bg="white">
      <Flex alignItems="center">
        <Text fontSize="xl" fontWeight="bold" color="purple.600">
          Eventify
        </Text>

        <Spacer />

        <HStack spacing={4}>
          {isAdmin && (
            <Button
              background="white"
              color="black"
              onClick={handleCreateEvent}
            >
              Create Event
            </Button>
          )}
          <Button
            background="black"
            color="white"
            _hover={{ background: "gray.700" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}
