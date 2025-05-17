import { Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const AdminRoute = ({ children }) => {
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!token || !user) {
    toast({
      title: "Access Denied",
      description: "Please login to access this page",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== "Admin") {
    toast({
      title: "Access Denied",
      description: "You don't have permission to access this page",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return <Navigate to="/" replace />;
  }

  return children;
};

