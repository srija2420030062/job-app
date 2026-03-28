const db = require("./db");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/jobs", (req, res) => {
    console.log("BODY:", req.body);
  const { title, company } = req.body;

   if (!title || !company) {
    return res.send("Missing data");
  }

  db.query(
    "INSERT INTO jobs (title, company) VALUES (?, ?)",
    [title, company],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error adding job");
      } else {
        res.send("Job added successfully");
      }
    }
  );
});
app.get("/jobs", (req, res) => {
  db.query("SELECT * FROM jobs", (err, result) => {
    if (err) {
      res.send("Error fetching jobs");
    } else {
      res.json(result);
    }
  });
});
app.delete("/jobs/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM jobs WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.send("Error deleting job");
    } else {
      res.send("Job deleted");
    }
  });
});
app.post("/applicants", (req, res) => {
  const { name, job_id, status } = req.body;

  

  db.query(
    "INSERT INTO applicants (name, job_id, status) VALUES (?, ?, ?)",
    [name, job_id, status],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Error adding applicant");
      } else {
        res.send("Applicant added successfully");
      }
    }
  );
});
app.get("/applicants", (req, res) => {
  db.query(
    "SELECT id, name, job_id, Status AS status FROM applicants",
    (err, result) => {
      if (err) {
        res.send("Error fetching applicants");
      } else {
        res.json(result);
      }
    }
  );
});
app.put("/applicants/:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  db.query(
    "UPDATE applicants SET status = ? WHERE id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        res.send("Error updating status");
      } else {
        res.send("Status updated");
      }
    }
  );
});
app.delete("/applicants/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM applicants WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.send("Error deleting applicant");
    } else {
      res.send("Applicant deleted");
    }
  });
});
app.get("/test-insert", (req, res) => {
  db.query(
    "INSERT INTO jobs (title, company) VALUES ('TestJob', 'TestCompany')",
    (err, result) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.send("Insert failed");
      }
      res.send("Inserted directly");
    }
  );
});
// 👉 PUT THIS BELOW YOUR OTHER API ROUTES

app.patch("/applicants/:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  db.query(
    "UPDATE applicants SET status = ? WHERE id = ?",
    [status, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error updating status");
      } else {
        res.send("Status updated");
      }
    }
  );
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});