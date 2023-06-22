import React, { useState, useContext } from "react";
import "./Login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "./assets/solaris_logo2.png";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const findUserDetails = async (id) => {
    try {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        console.log("User data:", userSnap.data());
        const userDetail = userSnap.data();
        dispatch({ type: "LOGIN", payload: userDetail });
      } else {
        console.log("No such user!");
      }
    } catch (error) {
      console.log("User Details Can't Found !");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        findUserDetails(userCredential.user.uid);
        setIsLoading(false);
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(error);
      });
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <img src={logo}></img>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
        />
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          <button type="submit">Login</button>
        )}

        {error && <span className="error">Wrong email or password !</span>}
      </form>
    </div>
  );
};

export default Login;
