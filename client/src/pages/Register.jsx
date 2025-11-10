import React, { useState } from "react";
import axios from "axios";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        setLoading(true);

        try {
            await axios.post("http://localhost:4000/api/v1/auth/register", form, {
                headers: { "Content-Type": "application/json" },
            });
            setMsg("✅ Registered successfully! You can login now.");
        } catch (err) {
            const message = err.response?.data?.message || "❌ Registration failed!";
            setMsg(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create Account</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        style={styles.input}
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
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
                    <select
                        style={styles.select}
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>

                    <button type="submit" style={styles.button} disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
                {msg && <p style={msg.includes("✅") ? styles.success : styles.error}>{msg}</p>}
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
        transition: "0.2s",
    },
    select: {
        padding: "12px 15px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        background: "#fff",
        fontSize: "15px",
        cursor: "pointer",
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
};

// Add hover effect
styles.button[":hover"] = {
    background: "#3e4ac2",
};
