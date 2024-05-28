"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter();
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
    <section className="flex flex-col items-center justify-center h-screen w-screen w-full bg-white text-center gap-2">
      <h1 className="text-3xl font-bold mb-8 text-green-800">Register din profil</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-sm:w-3/5 gap-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          name="username"
          placeholder="Navn"
          value={formData.username}
          onChange={handleChange}
          required
          className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <input
          type="password"
          name="password"
          placeholder="Kodeord"
          value={formData.password}
          onChange={handleChange}
          required
          className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Postnummer"
          value={formData.zipCode}
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
          className="bg-green-500 hover:bg-white hover:text-green-500 transition ease-in-out duration-300 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline self-center border w-40 mt-10"
        >
          Register profil
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </section>
  );
}
