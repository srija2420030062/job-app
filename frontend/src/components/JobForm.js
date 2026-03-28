import { useState } from "react";
import axios from "axios";

function JobForm() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  const addJob = () => {
    if (!title || !company) {
      alert("Please fill all fields");
      return;
    }

    axios.post("http://localhost:5000/jobs", {
      title,
      company
    })
    .then(() => {
  alert("Job Added");
  window.location.reload(); // 🔥 IMPORTANT
})
    .catch(() => alert("Error"));
  };

  return (
    <div>
      <h2>Add Job</h2>

      <input
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <br /><br />

      <button
        style={{
          background: "#3498db",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "6px"
        }}
        onClick={addJob}
      >
        Post Job
      </button>
    </div>
  );
}

export default JobForm;   // ✅ MUST BE HERE (outside function)