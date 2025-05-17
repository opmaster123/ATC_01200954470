// components/EventCards.jsx
import {
  Box,
  Flex,
  Text,
  Image,
  Grid,
  Button,
  VStack,
  HStack,
  Icon,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { FaTicketAlt, FaEdit, FaTrash } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { AiFillCalendar } from "react-icons/ai";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function EventCards({ events = [], onEventUpdate, onEventDelete }) {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setIsAdmin(user?.role === 'Admin');
  }, []);

  const fetchBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const bookings = await response.json();
      const bookedEventIds = bookings.map(booking => booking.event._id);
      setBookedEvents(bookedEventIds);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (events.length > 0) {
      fetchBookings();
    }
  }, [events]);

  const handleBooking = async (eventId, e) => {
    e.preventDefault();
    e.stopPropagation();

    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Authentication required",
        description: "Please login to book events",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ eventId })
      });

      const data = await response.json();

      if (response.ok) {
        setBookedEvents(prev => [...prev, eventId]);
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

  const handleUpdate = (event, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/create-event', { state: { event } });
  };

  const handleDeleteClick = (event, e) => {
    e.preventDefault();
    e.stopPropagation();
    setEventToDelete(event);
    onOpen();
  };

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/events/${eventToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast({
          title: "Event deleted",
          description: "The event has been successfully deleted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        if (onEventDelete) {
          onEventDelete(eventToDelete._id);
        }
      } else {
        throw new Error('Failed to delete event');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the event",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      onClose();
      setEventToDelete(null);
    }
  };

  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={10}
      >
        {events.map((event) => {
          const eventDate = dayjs(event.date);
          const isBooked = bookedEvents.includes(event._id);
          
          return (
            <Link
              to={`/events/${event._id}`}
              key={event._id}
              style={{ textDecoration: "none" }}
            >
              <Box
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                bg="white"
                _hover={{
                  boxShadow: "xl",
                  cursor: "pointer",
                  transform: "scale(1.02)",
                }}
                transition="all 0.2s"
              >
                <Image
                  src={`/images/${event.imageUrl}`}
                  alt={event.name}
                  objectFit="cover"
                  w="full"
                  h="254px"
                />

                <Flex>
                  <VStack
                    w="110px"
                    p={6}
                    borderRight="1px"
                    borderColor="gray.200"
                  >
                    <Text fontSize="lg" color="purple.700" fontWeight="semibold">
                      {eventDate.format("MMM")}
                    </Text>
                    <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                      {eventDate.format("DD")}
                    </Text>
                  </VStack>

                  <Box flex={1} p={4}>
                    <Text fontSize="lg" fontWeight="semibold" mb={1}>
                      {event.name}
                    </Text>

                    {event.venue && (
                      <Text fontSize="sm" color="gray.600" mb={1}>
                        {event.venue}
                      </Text>
                    )}

                    {event.category && (
                      <Text
                        fontSize="sm"
                        color="gray.500"
                        textTransform="uppercase"
                        mb={2}
                      >
                        {event.category}
                      </Text>
                    )}

                    <HStack spacing={3} align="center">
                      <HStack spacing={1}>
                        <Icon as={FaTicketAlt} color="gray.600" />
                        <Text fontSize="sm" fontWeight="semibold">
                          ${event.price}
                        </Text>
                      </HStack>

                      <Box w="1" h="1" bg="gray.400" borderRadius="full" />

                      <HStack spacing={1}>
                        <Icon as={AiFillCalendar} color="gray.600" />
                        <Text fontSize="sm" color="gray.600">
                          {eventDate.format("dddd, h:mm A")}
                        </Text>
                      </HStack>
                    </HStack>

                    <HStack spacing={3} align="center" mt={4}>
                      {isBooked ? (
                        <Text
                          fontSize="sm"
                          fontWeight="bold"
                          color="green.500"
                          bg="green.100"
                          px={3}
                          py={1}
                          borderRadius="md"
                        >
                          Booked
                        </Text>
                      ) : (
                        <Button
                          size="sm"
                          background="black"
                          color="white"
                          _hover={{ background: "gray.700" }}
                          onClick={(e) => handleBooking(event._id, e)}
                        >
                          Book Now
                        </Button>
                      )}

                      {isAdmin && (
                        <HStack spacing={2} ml="auto">
                          <Button
                            size="sm"
                            colorScheme="blue"
                            leftIcon={<FaEdit />}
                            onClick={(e) => handleUpdate(event, e)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="red"
                            leftIcon={<FaTrash />}
                            onClick={(e) => handleDeleteClick(event, e)}
                          >
                            Delete
                          </Button>
                        </HStack>
                      )}
                    </HStack>
                  </Box>
                </Flex>
              </Box>
            </Link>
          );
        })}
      </Grid>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Event
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this event? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
