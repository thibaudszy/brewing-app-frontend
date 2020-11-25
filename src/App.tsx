import { useQuery } from "@apollo/client";
import React from "react";
import "./App.css";
import AppNavbar from "./components/Navbar/AppNavbar";
import { GET_USERS } from "./graphQL/queries";

function App() {
  const allUsers = useQuery(GET_USERS);
  console.log("all users:", allUsers.data);
  return (
    <div className="App">
      <AppNavbar />
      hello
    </div>
  );
}

export default App;
