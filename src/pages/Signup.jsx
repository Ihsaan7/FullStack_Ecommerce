import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await (async () => {
        const text = await res.text();
        try {
          return JSON.parse(text);
        } catch {
          return { rawText: text };
        }
      })();

      if (!res.ok) {
        // backend may return { message } or validation errors
        const msg =
          data?.message ||
          (data?.errors && data.errors[0]?.msg) ||
          "Signup failed";
        throw new Error(msg);
      }

      // Expect backend to return { token, user } — adjust if different
      if (data.token) {
        localStorage.setItem("token", data.token);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Redirect to store or dashboard
      nav("/store");
    } catch (err) {
      setError(err.message || "Signup error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Create account</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          value={fullName}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 6 chars)"
          type="password"
          minLength={6}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing up…" : "Create account"}
        </button>
      </form>
    </div>
  );
}
