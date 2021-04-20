import React, { useReducer, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export const UserContext = createContext();

export const UserReducer = (props) => {
  const initialState = {
    token: null,
    userID: null,
    user: null,
    wishlist: null,
    Logged: null,
    search: null,
  };
  const [cookies, setCookie, removeCookie] = useCookies(["huppy"]);

  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        setCookie("huppy", action.token, {
          path: "/",
          maxAge: action.expires,
        });

        return {
          token: action.token,
          user: action.user,
          userID: action.userID,
          userID: action.userID,
          Logged: true,
        };
      case "logout":
        removeCookie("huppy");
        return { token: null, userID: null, Logged: null };

      case "signUp":
        setCookie("huppy", action.token, {
          path: "/",
          maxAge: action.expires,
        });

        return {
          token: action.token,
          user: action.user,
          userID: action.userID,
          Logged: true,
        };

      case "changeSearch":
        return {
          search: action.search,
        };
    }
  };

  const [user, setUser] = useReducer(reducer, initialState);

  useEffect(() => {
    if (cookies.huppy)
      axios({
        method: "GET",
        url: process.env.REACT_APP_API_URL + "/api/users/loginByToken",
        headers: {
          "x-access-token": cookies.huppy,
        },
      })
        .then((res) => {
          setUser({
            type: "login",
            token: res.data.token,
            user: res.data.username,
            userID: res.data.userID,
            expires: res.data.expires,
          });
        })
        .catch((error) => {});
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
