import { useEffect, useState } from "react";
import axios from "axios";

function ApplicantList() {
  const [applicants, setApplicants] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchApplicants();
  }, []);

  // Fetch applicants
  const fetchApplicants = () => {
    axios
      .get("http://localhost:5000/applicants")
      .then((res) => {
  console.log(res.data);
  setApplicants(res.data);
})
      .catch((err) => console.log(err));
  };

  // Delete applicant
  const deleteApplicant = (id) => {
    axios
      .delete(`http://localhost:5000/applicants/${id}`)
      .then(() => {
        alert("Deleted");
        fetchApplicants();
      })
      .catch((err) => console.log(err));
  };

  // Update status
  const handleStatusChange = (id, newStatus) => {
  console.log("Updating:", id, newStatus); // 👈 add this

  axios
    .patch(`http://localhost:5000/applicants/${id}`, {
      status: newStatus,
    })
    .then(() => {
      setApplicants((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
    })
    .catch((err) => console.error(err));
};
      

  // Filter logic
  const filteredApplicants =
    filter === "All"
      ? applicants
      : applicants.filter((a) => a.status === filter);

  return (
    <div>
      <h2>Applicants</h2>

      {/* Filter Dropdown */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Reviewed">Reviewed</option>
        <option value="Shortlisted">Shortlisted</option>
        <option value="Rejected">Rejected</option>
        <option value="Hired">Hired</option>
      </select>

      {/* Applicants List */}
      {filteredApplicants.map((a) => (
        <div
          key={a.id}
          style={{
            background: "#ecf0f1",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
          }}
        >
          <p>{a.name}</p>

          {/* Status Update Dropdown */}
          <select
            value={a.status}
            onChange={(e) =>
              handleStatusChange(a.id, e.target.value)
            }
          >
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
            <option value="Hired">Hired</option>
          </select>

          {/* Delete Button */}
          <button
            style={{
              marginLeft: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={() => deleteApplicant(a.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ApplicantList;