export default function Login() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <h1>Login</h1>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button className="btn mt-8">Log in</button>
        </div>
      </main>
    );
  }
  