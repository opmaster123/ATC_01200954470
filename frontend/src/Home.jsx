import { Box, Text, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import EventCards from "./EventCards.jsx";
import NavBar from "./NavBar.jsx";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Box
      bg="white"
      w="full"
      minH="100vh"
      py={10}
      px={{ base: 5, md: 10, lg: 16 }}
    >
      <NavBar />
      <Text
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        mt={6}
        mb={6}
        color="gray.800"
      >
        Popular Events Taking Place Right Now
      </Text>

      {loading && <Text>Loading events...</Text>}
      {error && <Text color="red.500">Error: {error}</Text>}
      {!loading && !error && <EventCards events={events} />}
    </Box>
  );
}
