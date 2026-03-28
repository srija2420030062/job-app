import { useEffect, useState } from "react";
import axios from "axios";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = () => {
    axios.get("http://localhost:5000/jobs")
      .then((res) => {
        console.log("Jobs:", res.data); // ✅ DEBUG
        setJobs(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteJob = (id) => {
    axios.delete(`http://localhost:5000/jobs/${id}`)
      .then(() => {
        alert("Deleted");
        fetchJobs(); // ✅ REFRESH
      });
  };

  return (
    <div>
      <h2>Job List</h2>

      {jobs.length === 0 && <p>No jobs found</p>}

      {jobs.map((job) => (
        <div key={job.id} style={{
          background: "#ecf0f1",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px"
        }}>
          {job.title} - {job.company}

          <button
            style={{
              marginLeft: "10px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "5px"
            }}
            onClick={() => deleteJob(job.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default JobList;