"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Register() {
  // const router = useRouter(); out commented for testing
  const [formData, setFormData] = useState({ email: '', username: '', password: '', zipCode: "",  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        router.push('/');
      } else {
        setMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setMessage("An unexpected error occurred");
    }
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-black">
      <h1 className="text-4xl font-bold mb-8">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-1/5 ">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          aria-label="Email"
          onChange={handleChange}
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          aria-label="Username"
          onChange={handleChange}
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          aria-label="Password"
          onChange={handleChange}
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={formData.zipCode}
          aria-label="Zip Code"
          onChange={handleChange}
          onKeyDown={(event) => {
            const pattern = /[0-9]/;
            if (
              !pattern.test(event.key) &&
              event.key !== "Backspace" &&
              event.key !== "Delete"
            ) {
              event.preventDefault();
            }
          }}
          onInput={(event) => {
            if ((event.target as HTMLInputElement).value.length > 4) {
              (event.target as HTMLInputElement).value = (
                event.target as HTMLInputElement
              ).value.slice(0, 4);
            }
          }}
          required
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </section>
  );
}