import { useState } from "react";
import api from "../api/api";
import { setToken } from "../utils/auth";

export default function Signin() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signin", form);
      setToken(res.data.token);
      alert("Signin successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Signin</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-green-500 text-white py-2 w-full rounded hover:bg-green-600"
        >
          Signin
        </button>
      </form>
    </div>
  );
}
