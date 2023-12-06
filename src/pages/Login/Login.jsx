import React, { useState, useContext } from "react";
import "./Login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "./assets/solaris_logo2.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { detailSetter } from "../../Redux/userDetailSlice";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //REDUX
  const dispatch1 = useDispatch();

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  //I THİNK OLD CODE FROM FİRESBASE BACKEND--------------------------------------------------------------------------
  /*const findUserDetails = async (id) => {
    try {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        console.log("User data:", userSnap.data());
        const userDetail = userSnap.data();
        //FİREBASE AUTHENTİCATİON İÇİN GEREKLİ
        dispatch({ type: "LOGIN", payload: userDetail });
      } else {
        console.log("No such user!");
      }
    } catch (error) {
      console.log("User Details Can't Found !");
    }
  };*/
  //---------------------------------------------------------------------------------------------------------------

  //GET USER FROM JAVA BACKEND
  async function getUserDetails(uid) {
    try {
      axios
        .get(
          `http://localhost:8080/user/uid/${uid}`
        )
        .then((details) => {
          //REDUX
          if (details.data.authorities) {
            dispatch1(detailSetter(details.data));
          } else {
            dispatch1(detailSetter(""));
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        getUserDetails(userCredential.user.uid);
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
        <img src="/gunamlogo.png"></img>
        <span><h2 style={{color:"#F49F3C", display:"inline"}}>Solaris</h2>&nbsp;<h6 style={{display:"inline"}}>V1.0</h6></span>
        <br/>
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
