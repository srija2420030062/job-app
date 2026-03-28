import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import ApplicantForm from "./components/ApplicantForm";
import ApplicantList from "./components/ApplicantList";

function App() {
  return (
    <div style={{
      fontFamily: "Segoe UI",
      background: "#eef2f7",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h1 style={{
        textAlign: "center",
        color: "#2c3e50",
        marginBottom: "30px"
      }}>
        Recruitment Management System
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px"
      }}>
        <Card><JobForm /></Card>
        <Card><JobList /></Card>
        <Card><ApplicantForm /></Card>
        <Card><ApplicantList /></Card>
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    }}>
      {children}
    </div>
  );
}

export default App;