import { useEffect, useState } from "react";
import axios from "axios";

function ApplicantForm() {
  const [name, setName] = useState("");
  const [jobId, setJobId] = useState("");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/jobs")
      .then(res => setJobs(res.data));
  }, []);

  const addApplicant = () => {
    axios.post("http://localhost:5000/applicants", {
      name,
      job_id: jobId,
      status: "Applied"
    })
    .then(() => {
      alert("Applied Successfully");
      window.location.reload();
    });
  };

  return (
    <div>
      <h2>Apply for Job</h2>

      <input
        placeholder="Your Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <select onChange={(e) => setJobId(e.target.value)}>
        <option value="">Select Job</option>
        {jobs.map(job => (
          <option key={job.id} value={job.id}>
            {job.title}
          </option>
        ))}
      </select>
      <br /><br />

      <button
        style={{ background: "#2ecc71", color: "white", padding: "10px" }}
        onClick={addApplicant}
      >
        Apply
      </button>
    </div>
  );
}

export default ApplicantForm;