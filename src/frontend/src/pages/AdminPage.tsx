import { useEffect, useState } from "react";
import type { Appointment, AppointmentId } from "../backend.d";
import { useActor } from "../hooks/useActor";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState<
    Array<[AppointmentId, Appointment]>
  >([]);
  const [loading, setLoading] = useState(false);
  const { actor, isFetching } = useActor();

  useEffect(() => {
    if (isLoggedIn && actor && !isFetching) {
      setLoading(true);
      actor
        .getAllAppointments()
        .then((data) => setAppointments(data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [isLoggedIn, actor, isFetching]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin1234") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div
        style={{ background: "#1A1A1A", minHeight: "100vh" }}
        className="flex items-center justify-center"
      >
        <div
          style={{
            background: "#111",
            border: "1px solid #FFD700",
            borderRadius: "12px",
            padding: "40px",
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <h1
            style={{
              color: "#FFD700",
              fontSize: "1.8rem",
              fontFamily: "'Playfair Display', serif",
              marginBottom: "8px",
              textAlign: "center",
            }}
          >
            Admin Dashboard
          </h1>
          <p
            style={{
              color: "#aaa",
              textAlign: "center",
              marginBottom: "28px",
              fontSize: "0.9rem",
            }}
          >
            Enter admin password to view appointments
          </p>
          <form onSubmit={handleLogin}>
            <label
              htmlFor="admin-password"
              style={{
                color: "#fff",
                display: "block",
                marginBottom: "8px",
                fontSize: "0.9rem",
              }}
            >
              Password
            </label>
            <input
              id="admin-password"
              data-ocid="admin.input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "#1A1A1A",
                border: "1px solid #444",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "1rem",
                marginBottom: "12px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {error && (
              <p
                data-ocid="admin.error_state"
                style={{
                  color: "#ff6b6b",
                  fontSize: "0.85rem",
                  marginBottom: "12px",
                }}
              >
                {error}
              </p>
            )}
            <button
              data-ocid="admin.submit_button"
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#FFD700",
                color: "#1A1A1A",
                fontWeight: "700",
                fontSize: "1rem",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                marginTop: "4px",
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#1A1A1A",
        minHeight: "100vh",
        padding: "32px 20px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div>
            <h1
              style={{
                color: "#FFD700",
                fontSize: "2rem",
                fontFamily: "'Playfair Display', serif",
                margin: 0,
              }}
            >
              Admin Dashboard
            </h1>
            <p style={{ color: "#aaa", margin: "4px 0 0", fontSize: "0.9rem" }}>
              All appointment submissions
            </p>
          </div>
          <button
            type="button"
            data-ocid="admin.logout_button"
            onClick={() => {
              setIsLoggedIn(false);
              setPassword("");
              setAppointments([]);
            }}
            style={{
              padding: "8px 20px",
              background: "transparent",
              border: "1px solid #FFD700",
              color: "#FFD700",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            Logout
          </button>
        </div>

        {/* Content */}
        {loading || isFetching ? (
          <div
            data-ocid="admin.loading_state"
            style={{ textAlign: "center", color: "#aaa", padding: "60px 0" }}
          >
            Loading appointments...
          </div>
        ) : appointments.length === 0 ? (
          <div
            data-ocid="admin.empty_state"
            style={{
              textAlign: "center",
              color: "#aaa",
              padding: "60px 0",
              border: "1px dashed #333",
              borderRadius: "8px",
            }}
          >
            <p style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
              No appointments yet
            </p>
            <p style={{ fontSize: "0.85rem" }}>
              Submitted appointments will appear here.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              data-ocid="admin.table"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                color: "#fff",
                fontSize: "0.9rem",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid #FFD700" }}>
                  {[
                    "#",
                    "Patient Name",
                    "Phone",
                    "Treatment",
                    "Preferred Date/Time",
                    "Message",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 16px",
                        textAlign: "left",
                        color: "#FFD700",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {appointments.map(([id, appt], idx) => (
                  <tr
                    key={String(id)}
                    style={{
                      borderBottom: "1px solid #2a2a2a",
                      background: idx % 2 === 0 ? "#111" : "#161616",
                    }}
                  >
                    <td style={{ padding: "12px 16px", color: "#aaa" }}>
                      {idx + 1}
                    </td>
                    <td style={{ padding: "12px 16px", fontWeight: "500" }}>
                      {appt.patientName}
                    </td>
                    <td style={{ padding: "12px 16px" }}>{appt.phoneNumber}</td>
                    <td style={{ padding: "12px 16px" }}>
                      {appt.treatmentNeeded}
                    </td>
                    <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                      {new Date(
                        Number(appt.preferredTime) / 1_000_000,
                      ).toLocaleString()}
                    </td>
                    <td style={{ padding: "12px 16px", color: "#ccc" }}>
                      {appt.message ?? <span style={{ color: "#555" }}>—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
