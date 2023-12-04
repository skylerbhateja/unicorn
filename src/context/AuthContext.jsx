import { decodeJwt } from "jose";
import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

const initialUsers = [
  { id: 1, email: "Snow", fullname: "Jon", role: "Admin" },
  { id: 2, email: "Lannister", fullname: "Cersei", role: "User" },
  { id: 3, email: "Lannister", fullname: "Jaime", role: "User" },
  { id: 4, email: "Stark", fullname: "Arya", role: "Admin" },
  { id: 5, email: "Targaryen", fullname: "Daenerys", role: "Admin" },
  { id: 6, email: "Melisandre", fullname: null, role: "User" },
  { id: 7, email: "Clifford", fullname: "Ferrara", role: "Admin" },
  { id: 8, email: "Frances", fullname: "Rossini", role: "User" },
  { id: 9, email: "Roxie", fullname: "Harvey", role: "Admin" },
];

export function AppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(initialUsers);

  const getUserDetails = () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      const userDetails = decodeJwt(token);
      setUser(userDetails);
    }
    setLoading(false);
  };

  const handleAddUser = (user) => {
    if (user) {
      setUsers((prev) => [user, ...prev]);
    }
  };

  const handleUpdateUser = (user) => {
    if (user) {
      setUsers((prevUsers) => {
        return prevUsers.map((item) => (item.id === user.id ? user : item));
      });
      return true;
    }
    return false;
  };

  const handleDeleteUser = (userID) => {
    if (userID) {
      setUsers((prevUsers) => {
        return prevUsers.filter((item) => item.id !== userID);
      });
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (!user) {
      getUserDetails();
    }
  }, []);

  const value = {
    user,
    loading,
    getUserDetails,
    users,
    handleAddUser,
    handleUpdateUser,
    handleDeleteUser,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
