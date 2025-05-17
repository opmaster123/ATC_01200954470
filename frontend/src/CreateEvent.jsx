import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Textarea,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Heading,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    date: "",
    venue: "",
    price: "",
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = location.state?.event !== undefined;
  const eventToEdit = location.state?.event;

  useEffect(() => {
    if (isEditMode && eventToEdit) {
      const eventDate = new Date(eventToEdit.date);
      const formattedDate = eventDate.toISOString().slice(0, 16);

      setFormData({
        name: eventToEdit.name || "",
        description: eventToEdit.description || "",
        category: eventToEdit.category || "",
        date: formattedDate,
        venue: eventToEdit.venue || "",
        price: eventToEdit.price || "",
        imageUrl: eventToEdit.imageUrl || "",
      });
    }
  }, [isEditMode, eventToEdit]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Event name is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.date) {
      newErrors.date = "Date and time is required";
    } else {
      const selectedDate = new Date(formData.date);
      const now = new Date();
      if (selectedDate < now) {
        newErrors.date = "Event date must be in the future";
      }
    }

    if (!formData.venue.trim()) {
      newErrors.venue = "Venue is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleNumberChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      price: value,
    }));
    if (errors.price) {
      setErrors((prev) => ({
        ...prev,
        price: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Authentication required",
          description: "Please login to manage events",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
        return;
      }

      const url = isEditMode
        ? `http://localhost:5000/api/events/${eventToEdit._id}`
        : "http://localhost:5000/api/events";

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: isEditMode
            ? "Event updated successfully"
            : "Event created successfully",
          description: isEditMode
            ? "Your event has been updated"
            : "Your event has been created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/");
      } else {
        throw new Error(
          data.message ||
            (isEditMode ? "Failed to update event" : "Failed to create event")
        );
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box maxW="600px" mx="auto" mt={8} p={6} boxShadow="lg" borderRadius="lg">
      <VStack spacing={6} align="stretch">
        <Heading size="lg" textAlign="center" mb={4}>
          {isEditMode ? "Edit Event" : "Create New Event"}
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired isInvalid={errors.name}>
              <FormLabel>Event Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter event name"
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter event description"
                rows={4}
              />
              <FormErrorMessage>{errors.description}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.category}>
              <FormLabel>Category</FormLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Select category"
              >
                <option value="Music">Music</option>
                <option value="Sports">Sports</option>
                <option value="Arts">Arts</option>
                <option value="Food">Food</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </Select>
              <FormErrorMessage>{errors.category}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.date}>
              <FormLabel>Date and Time</FormLabel>
              <Input
                name="date"
                type="datetime-local"
                value={formData.date}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors.date}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.venue}>
              <FormLabel>Venue</FormLabel>
              <Input
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Enter venue"
              />
              <FormErrorMessage>{errors.venue}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.price}>
              <FormLabel>Price ($)</FormLabel>
              <NumberInput
                min={0}
                value={formData.price}
                onChange={handleNumberChange}
              >
                <NumberInputField placeholder="Enter price" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>{errors.price}</FormErrorMessage>
            </FormControl>

            <FormControl isRequired isInvalid={errors.imageUrl}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
              <FormErrorMessage>{errors.imageUrl}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              isLoading={isSubmitting}
              loadingText={
                isEditMode ? "Updating Event..." : "Creating Event..."
              }
            >
              {isEditMode ? "Update Event" : "Create Event"}
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
}
