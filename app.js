
const express = require("express");
const db = require("./db");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// Get all events
app.get("/events", (req, res) => {
    db.query("SELECT * FROM events", (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// Get one event
app.get("/events/:eventid", (req, res) => {
    db.query("SELECT * FROM events WHERE eventid = ?",
        [req.params.eventid], (err, rows) => {
            if (err) return res.status(500).send(err.message);
            if (!rows.length) return res.status(404).send("Event not found");
            res.json(rows[0]);
        });
});

// Insert event
app.post("/events", (req, res) => {
    const { eventid, event_name, event_time, event_day, venue, description } = req.body;
    const sql = `INSERT INTO events
        (eventid,event_name,event_time,event_day,venue,description)
        VALUES (?,?,?,?,?,?)`;

    db.query(sql, [eventid,event_name,event_time,event_day,venue,description],
        (err) => {
            if (err) return res.status(500).send(err.message);
            res.status(201).send("Event inserted successfully");
        });
});

// Update event
app.put("/events/:eventid", (req, res) => {
    const { event_name, event_time, event_day, venue, description } = req.body;
    const sql = `UPDATE events SET event_name=?, event_time=?,
        event_day=?, venue=?, description=? WHERE eventid=?`;

    db.query(sql, [event_name,event_time,event_day,venue,description,req.params.eventid],
        (err, result) => {
            if (err) return res.status(500).send(err.message);
            if (!result.affectedRows) return res.status(404).send("Event not found");
            res.send("Event updated successfully");
        });
});

// Delete event
app.delete("/events/:eventid", (req, res) => {
    db.query("DELETE FROM events WHERE eventid=?",
        [req.params.eventid], (err, result) => {
            if (err) return res.status(500).send(err.message);
            if (!result.affectedRows) return res.status(404).send("Event not found");
            res.send("Event deleted successfully");
        });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});