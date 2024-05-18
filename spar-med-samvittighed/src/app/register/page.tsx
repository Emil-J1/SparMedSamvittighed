

// export async function CreateUser(params:type) {
//   "use server";

// }

export default function Register() {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-100">
        <h1>Register</h1>
        <form>
          <input type="email" name="email" />
          <input type="username" name="username" />

          <button type="submit">Register</button>

        </form>
      </div>
    );
}