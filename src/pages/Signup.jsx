import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signup(fullName, email, password);
      
      if (result.success) {
        // Redirect to store after successful signup
        nav("/store");
      } else {
        setError(result.error);
      }
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
