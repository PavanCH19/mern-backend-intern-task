import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:4000/api/v1/auth/login", form, {
                headers: { "Content-Type": "application/json" },
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setMsg("✅ Login successful!");
            setTimeout(() => navigate("/dashboard"), 800);
        } catch (err) {
            const message = err.response?.data?.message || "❌ Login failed!";
            setMsg(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        style={styles.input}
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        style={styles.input}
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {msg && <p style={msg.includes("✅") ? styles.success : styles.error}>{msg}</p>}

                <p style={styles.registerText}>
                    Don’t have an account?{" "}
                    <span
                        style={styles.link}
                        onClick={() => navigate("/register")}
                    >
                        Register here
                    </span>
                </p>
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #74ABE2, #5563DE)",
        padding: "10px",
    },
    card: {
        background: "#fff",
        padding: "30px 40px",
        borderRadius: "15px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
    },
    title: {
        marginBottom: "20px",
        color: "#333",
        fontWeight: "bold",
        fontSize: "24px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    input: {
        padding: "12px 15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        outline: "none",
        fontSize: "15px",
        transition: "0.3s ease",
    },
    button: {
        background: "#5563DE",
        color: "white",
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "0.3s",
    },
    success: { color: "green", marginTop: "15px", fontWeight: "bold" },
    error: { color: "red", marginTop: "15px", fontWeight: "bold" },
    registerText: {
        marginTop: "20px",
        color: "#555",
        fontSize: "14px",
    },
    link: {
        color: "#5563DE",
        fontWeight: "bold",
        cursor: "pointer",
    },
};
