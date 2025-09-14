import { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader.js";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email";
    if (!/^\d{10}$/.test(form.contact))
      newErrors.contact = "Contact must be 10 digits";
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validate()) return;
    try {
      await axios.post("/api/auth/signup", form);
      alert("User Registered!");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {loading && <Loader />}
      {Object.keys(form).map((f) => (
        <div key={f}>
          <input
            type={f === "password" ? "password" : "text"}
            placeholder={f}
            value={form[f]}
            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
          />
          {errors[f] && <span className="error">{errors[f]}</span>}
        </div>
      ))}
      <button type="submit">Signup</button>
    </form>
  );
}
