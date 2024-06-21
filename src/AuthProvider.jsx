import { useEffect } from "react";
import { SERVER } from "./Helper/Strings";
import getData from "./Helper/Fetch";

const AuthProvider = ({ children, logIn, logOut }) => {
  const getUser = async (userKey, logIn) => {
    const response = await getData(
      SERVER + "getUserInfo.php",
      JSON.stringify(userKey)
    );
    if (response.Error.err) return false;
    //console.log(response)
    if (response.data.token === "Usuario Validado") logIn();
    else logOut();
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) logOut();
    else {
      getUser({ token: localStorage.getItem("token") }, logIn);
    }
  }, []);
  return <div>{children}</div>;
};

export default AuthProvider;