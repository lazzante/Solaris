import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Homepage/Home";
import List from "./pages/List/List";
import New from "./pages/New/New";
import Single from "./pages/Single/Single";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { productInputs, userInputs } from "./pages/New/formsource";
import "./style/dark.scss";
import { DarkModeContext } from "./context/darkModeContext";
import Main from "./components/chat/Main";
import Titles from "./pages/Titles/Titles";
import Divisions from "./pages/Divisions/Divisions";
import Roles from "./pages/Roles/Roles";
import Positions from "./pages/Positions/Positions";
import { roleInputs } from "./pages/Roles/inputs";
import { titleInputs } from "./pages/Titles/inputs";
import { divisionInputs } from "./pages/Divisions/inputs";
import { positionInputs } from "./pages/Positions/inputs";
import NewRole from "./pages/Roles/NewRole";
import NewTitle from "./pages/Titles/NewTitle";
import NewDivision from "./pages/Divisions/NewDivision";
import NewPosition from "./pages/Positions/NewPosition";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          // "/" PATH
          <Route path="/">
            //HOME
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            //LOGIN
            <Route path="login" element={<Login />} />
            // "/users" PATH
            <Route path="users">
              //LIST
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              //SINGLE
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              //NEW
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>
            // "/products" PATH
            <Route path="products">
              //LIST
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              //SINGLE
              <Route
                path=":productId"
                element={
                  <RequireAuth>
                    <Single inputs={userInputs} />
                  </RequireAuth>
                }
              />
            </Route>
            <Route
              path="chat"
              element={
                <RequireAuth>
                  <Main />
                </RequireAuth>
              }
            />
          </Route>
          //TİTLES
          <Route path="titles">
            <Route index element={<Titles />} />
            <Route
              path="newTitle"
              element={
                <RequireAuth>
                  <NewTitle inputs={titleInputs} title="Add New Title" />
                </RequireAuth>
              }
            />
          </Route>
          //DIVISIONS
          <Route path="divisions">
            <Route index element={<Divisions />} />
            <Route
              path="newDivision"
              element={
                <RequireAuth>
                  <NewDivision
                    inputs={divisionInputs}
                    title="Add New Division"
                  />
                </RequireAuth>
              }
            />
          </Route>
          //ROLES
          <Route path="roles">
            <Route index element={<Roles />} />
            <Route
              path="newRole"
              element={
                <RequireAuth>
                  <NewRole inputs={roleInputs} title="Add New Role" />
                </RequireAuth>
              }
            />
          </Route>
          //POSITIONS
          <Route path="positions">
            <Route index element={<Positions />} />

            <Route
              path="newPosition"
              element={
                <RequireAuth>
                  <NewPosition
                    inputs={positionInputs}
                    title="Add New Position"
                  />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
