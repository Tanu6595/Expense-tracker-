// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../SignUp.css"; // Make sure this path is correct

// function SignUp() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         name: "",
//         age: "",
//         profession: "",
//         username: "",
//         email: "",
//         password: "",
//     });
//     const [error, setError] = useState("");
//     const [successMessage, setSuccessMessage] = useState(""); // State for success message

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setSuccessMessage(""); // Clear any previous success message

//         try {
//             const response = await fetch("http://localhost:5000/api/auth/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setSuccessMessage("Registration successful!"); // Set success message
//                 console.log("Registration Response:", data);
//                 localStorage.setItem('token', data.token);

//                 // Redirect to dashboard after a short delay to show the success message
//                 setTimeout(() => {
//                     navigate("/dashboard");
//                 }, 1500); // Adjust the delay as needed
//             } else {
//                 setError(data.msg || "Registration failed");
//             }
//         } catch (err) {
//             console.error("Error:", err);
//             setError("Something went wrong during registration.");
//         }
//     };

//     return (
//         <div className="sign-up-container">
//             <h1>Sign Up</h1>
//             {error && <p className="error-message">{error}</p>}
//             {successMessage && <p className="success-message">{successMessage}</p>} {/* Display success message */}
//             <form onSubmit={handleSubmit} className="sign-up-form">
//                 <label htmlFor="name">Name:</label>
//                 <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                 />

//                 <label htmlFor="age">Age:</label>
//                 <input
//                     type="number"
//                     id="age"
//                     name="age"
//                     value={formData.age}
//                     onChange={handleChange}
//                 />

//                 <label htmlFor="profession">Profession:</label>
//                 <input
//                     type="text"
//                     id="profession"
//                     name="profession"
//                     value={formData.profession}
//                     onChange={handleChange}
//                 />

//                 <label htmlFor="username">Username:</label>
//                 <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                 />

//                 <label htmlFor="email">Email:</label>
//                 <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />

//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                 />

//                 <button type="submit">Sign Up</button>
//             </form>
//         </div>
//     );
// }

// export default SignUp;






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../SignUp.css"; // Make sure this path is correct

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    profession: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("You are successfully registered. Redirecting to login...");
        console.log("Registration Response:", data);

        // Wait for 2 seconds before redirecting to Login page
        setTimeout(() => {
          navigate("./login");
        }, 2000); // Adjust delay as needed
      } else {
        setError(data.msg || "Registration failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong during registration.");
    }
  };

  return (
    <div className="sign-up-container">
      <h1>Sign Up</h1>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="sign-up-form">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />

        <label htmlFor="profession">Profession:</label>
        <input
          type="text"
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
        />

        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
