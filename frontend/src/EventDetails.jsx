import {
  Box,
  Text,
  Image,
  Button,
  Flex,
  VStack,
  HStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isBooked, setIsBooked] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const fetchEvent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`);
      const eventData = await response.json();
      setEvent(eventData);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  const checkBookingStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const bookings = await response.json();
      const isEventBooked = bookings.some(
        (booking) => booking.event._id === id
      );
      setIsBooked(isEventBooked);
    } catch (error) {
      console.error("Error checking booking status:", error);
    }
  };

  useEffect(() => {
    fetchEvent();
    checkBookingStatus();
  }, [id]);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        title: "Authentication required",
        description: "Please login to book events",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId: id }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsBooked(true);
        toast({
          title: "Booking successful!",
          description: "You have successfully booked this event",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Booking failed",
          description: data.message || "Failed to book event",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while booking the event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!event) return <Text>Loading...</Text>;

  return (
    <Box maxW="700px" mx="auto" mt={6} p={4}>
      <Image
        src={`/images/${event.imageUrl}`}
        alt={event.name}
        borderRadius="lg"
        w="100%"
        h="250px"
        objectFit="cover"
        mb={4}
      />

      <Text fontSize="2xl" fontWeight="bold" mb={2}>
        {event.name}
      </Text>

      {event.category && (
        <Box
          display="inline-block"
          bg="gray.700"
          color="white"
          px={3}
          py={1}
          borderRadius="md"
          fontSize="sm"
          fontWeight="semibold"
          mb={4}
        >
          {event.category}
        </Box>
      )}

      <Flex align="center" mb={2}>
        <Text fontSize="md" color="gray.600" mr={2}>
          {new Date(event.date).toLocaleString()}
        </Text>
        {isBooked ? (
          <Text
            fontSize="sm"
            fontWeight="bold"
            color="green.500"
            bg="green.100"
            px={3}
            py={1}
            borderRadius="md"
            ml="auto"
          >
            Booked
          </Text>
        ) : (
          <Button colorScheme="yellow" ml="auto" onClick={handleBooking}>
            Book Now
          </Button>
        )}
      </Flex>

      <Text fontSize="md" color="gray.700" mb={2}>
        <b>Ticket Price:</b> ${event.price}
      </Text>

      <Divider my={4} />

      <Text fontWeight="bold" mb={1}>
        Location
      </Text>
      <Text mb={2}>{event.venue}</Text>

      <Divider my={4} />

      <Text fontWeight="bold" mb={1}>
        Event Description
      </Text>
      <Text mb={2}>{event.description}</Text>
    </Box>
  );
}
