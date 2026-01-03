import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PRODUCTS_ROUTE, SIGNUP_ROUTE } from "../constants/AppRoutes";

export const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { email, password } = user;

    try {
      const res = await fetch("http://localhost:5000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 400 || !data) {
        window.alert("Invalid Login");
        console.log("Invalid Login");
      } else {
        window.alert("Login successful");
        console.log("Login successful");
        navigate(PRODUCTS_ROUTE);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      window.alert("An error occurred. Please try again later.");
    }
  };

  return (
    <section className="signIn">
      <div className="container mt-5">
        <div className="signIn-content">
          <div className="signIn-form">
            <h1 className="form-title">Sign In</h1>
            <form className="register-form" id="register-form" onSubmit={PostData}>
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email material-icons-name"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  placeholder="Your Email"
                  value={user.email}
                  onChange={handleInputs}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  placeholder="Your Password"
                  value={user.password}
                  onChange={handleInputs}
                />
              </div>

              <div className="form-group form-button">
                <input type="submit" name="signin" id="signin" className="form-submit" value="Sign In" />
              </div>
            </form>

            <div className="already-registered">
              <Link to={SIGNUP_ROUTE}>Create Account</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
