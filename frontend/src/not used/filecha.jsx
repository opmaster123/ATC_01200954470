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
} from "@chakra-ui/react";
import { FaTicketAlt } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

const events = [
  {
    id: 1,
    date: "25-26",
    month: "NOV",
    title: "Lakeside Camping at Pawna",
    location: "Adventure Geek - Explore the Unexplored, Mumbai",
    time: "8:30 AM - 7:30 PM",
    price: "INR 1,400",
    interested: 14,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ef66eb9d0678b1475fbca4f18a73a4184543da37",
  },
  {
    id: 1,
    date: "25-26",
    month: "NOV",
    title: "Lakeside Camping at Pawna",
    location: "Adventure Geek - Explore the Unexplored, Mumbai",
    time: "8:30 AM - 7:30 PM",
    price: "INR 1,400",
    interested: 14,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ef66eb9d0678b1475fbca4f18a73a4184543da37",
  },
  {
    id: 1,
    date: "25-26",
    month: "NOV",
    title: "Lakeside Camping at Pawna",
    location: "Adventure Geek - Explore the Unexplored, Mumbai",
    time: "8:30 AM - 7:30 PM",
    price: "INR 1,400",
    interested: 14,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ef66eb9d0678b1475fbca4f18a73a4184543da37",
  },
  {
    id: 2,
    date: "02",
    month: "DEC",
    title: "Sound Of Christmas 2023",
    location: "Bal Gandharva Rang Mandir, Mumbai",
    time: "6:30 PM - 9:30 PM",
    price: "INR 499",
    interested: 16,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/243f7859484bac72efe7edb86c64dd3e146f623e",
  },
  // ...more events can be added here
];

export default function EventCards() {
  return (
    <Box
      bg="white"
      w="full"
      minH="100vh"
      py={16}
      px={{ base: 5, md: 10, lg: 28 }}
    >
      <Text
        fontSize={{ base: "2xl", md: "4xl" }}
        fontWeight="bold"
        mb={10}
        color="gray.800"
      >
        Popular Events Taking Place Right Now
      </Text>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={10}
      >
        {events.map((event) => (
          <Box
            key={event.id}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            bg="white"
          >
            <Image
              src={event.image}
              alt={event.title}
              objectFit="cover"
              w="full"
              h="254px"
            />
            <Flex>
              <VStack w="119px" p={6} borderRight="1px" borderColor="gray.200">
                <Text fontSize="xl" color="purple.700" fontWeight="semibold">
                  {event.month}
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="gray.800">
                  {event.date}
                </Text>
              </VStack>
              <Box flex={1} p={4}>
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  mb={1}
                  color="gray.800"
                >
                  {event.title}
                </Text>
                <Text fontSize="sm" color="gray.600" mb={1}>
                  {event.location}
                </Text>
                <Text
                  fontSize="sm"
                  color="gray.600"
                  textTransform="uppercase"
                  mb={2}
                >
                  {event.time}
                </Text>
                <HStack spacing={3} align="center">
                  <HStack spacing={1} align="center">
                    <Icon as={FaTicketAlt} color="gray.600" />
                    <Text fontSize="sm" color="gray.600" fontWeight="semibold">
                      {event.price}
                    </Text>
                  </HStack>
                  <Box w="1" h="1" bg="gray.500" borderRadius="full" />
                  <HStack spacing={1}>
                    <Icon as={AiFillStar} color="purple.600" />
                    <Text fontSize="sm" color="gray.600" fontWeight="semibold">
                      {event.interested} interested
                    </Text>
                  </HStack>
                </HStack>
              </Box>
            </Flex>
          </Box>
        ))}
      </Grid>

      <Box mt={20} textAlign="center">
        <Text
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="medium"
          color="yellow.400"
          mb={4}
        >
          Create an event with Eventify
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color="yellow.300" mb={6}>
          Got a show, event, activity or a great experience? Partner with us &
          get listed on Eventify
        </Text>
        <Button size="lg" colorScheme="yellow" color="gray.800" fontSize="lg">
          Create Event
        </Button>
      </Box>
    </Box>
  );
}
