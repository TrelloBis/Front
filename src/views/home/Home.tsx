import React from "react";
import { UsersContext } from "../../providers/UserProvider";

export default function Home() {
  const { getUser } = React.useContext(UsersContext);  

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <>
    </>
  )
}