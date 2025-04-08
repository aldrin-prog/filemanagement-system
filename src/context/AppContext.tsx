import React, { createContext, useContext, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addResource,
  deleteResource,
  getResources,
  getUserResources,
  updateResourceStatus,
} from "@/services/resourceService";
import {
  changeUserRole,
  disableUser,
  enableUser,
  getUserInfo,
  getUsers,
  signInUser,
  signOutUser,
} from "@/services/userService";
import { ResourceType } from "@/utils/propsInterface";

// Define constants for query keys
const QUERY_KEYS = {
  RESOURCE: "resource",
  USER_LIST: "userList",
  USER_RESOURCE: "userResource",
  USER: "user",
};

const AppContext = createContext<any>(null);

/**
 * @component
 * @name AppProvider
 * @description
 * Provides application-wide context and state management using React Context and React Query.
 * It handles data fetching, caching, and mutations for resources and user-related data.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 *
 * @returns {JSX.Element} The AppContext.Provider wrapping the children components.
 *
 * @context
 * The context value provided includes:
 * - `resources`: The list of resources fetched from the server.
 * - `deleteMutation`: Mutation for deleting a resource.
 * - `userResources`: The list of resources associated with the current user.
 * - `user`: The current user's information.
 * - `userList`: The list of all users.
 * - `userLogoutMutation`: Mutation for logging out the user.
 * - `userLoginMutation`: Mutation for logging in the user.
 * - `userError`: Error object for the user query.
 * - `isUserSuccess`: Boolean indicating the success state of the user query.
 *
 * @hooks
 * - `useQuery`: Used to fetch and cache data for resources, user resources, user info, and user list.
 * - `useMutation`: Used to handle mutations for deleting resources, logging in, and logging out.
 *
 * @functions
 * - `invalidateQueries`: A reusable function to invalidate specific queries in the query cache.
 *
 * @example
 * ```tsx
 * import { AppProvider } from './AppContext';
 *
 * const App = () => (
 *   <AppProvider>
 *     <YourComponent />
 *   </AppProvider>
 * );
 * ```
 */
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  // Reusable function to invalidate queries
  const invalidateQueries = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RESOURCE] });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_RESOURCE] });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_LIST] });
  };

  const { data: resources } = useQuery({
    queryKey: [QUERY_KEYS.RESOURCE],
    queryFn: getResources,
    refetchOnWindowFocus: true,
  });

  const { data: userList } = useQuery({
    queryKey: [QUERY_KEYS.USER_LIST],
    queryFn: getUsers,
    refetchOnWindowFocus: true,
  });

  const { data: userResources } = useQuery({
    queryKey: [QUERY_KEYS.USER_RESOURCE],
    queryFn: getUserResources,
    refetchOnWindowFocus: true,
  });

  const { data: user, isSuccess: isUserSuccess } = useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: getUserInfo,
    refetchOnWindowFocus: true,
  });
  const updateResourceStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateResourceStatus(id, status),
    onSuccess: () => {
      invalidateQueries(); // Use reusable function
    },
    onError: (error) => {
      console.error("Error updating resource status:", error); // Log error
      alert(
        "An error occurred while updating the resource status. Please try again."
      ); // Provide user feedback
    },
  });
  const addResourceMutation = useMutation({
    mutationFn: ({
      form,
      files,
    }: {
      form: ResourceType;
      files: Array<string>;
    }) => addResource(form, files),
    onSuccess: () => {
      invalidateQueries(); // Use reusable function
    },
    onError: (error) => {
      console.error("Error adding resource:", error); // Log error
      alert("An error occurred while adding the resource. Please try again."); // Provide user feedback
    },
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id, attachments }: { id: string; attachments: string[] }) =>
      deleteResource(id, attachments),
    onSuccess: () => {
      invalidateQueries(); // Use reusable function
    },
    onError: (error) => {
      console.error("Error deleting resource:", error); // Log error
      alert("An error occurred while deleting the resource. Please try again."); // Provide user feedback
    },
  });

  const userLogoutMutation = useMutation({
    mutationFn: () => signOutUser(),
    onSuccess: () => {
      invalidateQueries(); // Use reusable function
    },
    onError: (error) => {
      console.error("Error logging out:", error); // Log error
      alert("An error occurred while logging out. Please try again."); // Provide user feedback
    },
  });

  const userLoginMutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => signInUser({ username, password }),
    onSuccess: () => {
      invalidateQueries(); // Use reusable function
    },
    onError: (error) => {
      console.error("Error logging in:", error); // Log error
      alert("An error occurred while logging in. Please try again."); // Provide user feedback
    },
  });
  const userDisableMutation = useMutation({
    mutationFn: ({ username }: { username: string }) => disableUser(username),
    onSuccess: () => {
      invalidateQueries(); // Use reusable function
    },
    onError: (error) => {
      console.error("Error disabling user:", error); // Log error
      alert("An error occurred while disabling the user. Please try again."); // Provide user feedback
    },
  });
  const userEnableMutation = useMutation({
    mutationFn: ({ username }: { username: string }) => enableUser(username),
    onSuccess: () => {
      invalidateQueries(); // Use reusable function
    },
    onError: (error) => {
      console.error("Error enabling user:", error); // Log error
      alert("An error occurred while enabling the user. Please try again."); // Provide user feedback
    },
  });
  const userChangeRoleMutation = useMutation({
    mutationFn: ({
      username,
      newRole,
      oldRole,
    }: {
      username: string;
      newRole: string;
      oldRole: string;
    }) => changeUserRole(username, newRole, oldRole),
    onSuccess: () => {
      invalidateQueries(); // Use reusable function
    },
    onError: (error) => {
      console.error("Error changing user role:", error); // Log error
      alert(
        "An error occurred while changing the user role. Please try again."
      ); // Provide user feedback
    },
  });

  const contextValue = useMemo(
    () => ({
      updateResourceStatusMutation,
      userChangeRoleMutation,
      userEnableMutation,
      userDisableMutation,
      resources,
      deleteMutation,
      userResources,
      user,
      userList,
      userLogoutMutation,
      userLoginMutation,
      isUserSuccess,
      addResourceMutation,
    }),
    [
      updateResourceStatusMutation,
      userChangeRoleMutation,
      userEnableMutation,
      userDisableMutation,
      resources,
      deleteMutation,
      userResources,
      user,
      userList,
      userLogoutMutation,
      userLoginMutation,
      isUserSuccess,
      addResourceMutation,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
