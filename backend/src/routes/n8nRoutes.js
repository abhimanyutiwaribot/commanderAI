const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.post('/update-status', async (req, res) => {
  try {
    const { taskId, status, message, result } = req.body;

    const updateFields = {
      status,
      $push: { logs: { message } }
    };

    if (result) {
      updateFields.result = result;
      updateFields["plan.0.status"] = "completed"; // agent finished!
    } else if (status === "executing") {
      updateFields["plan.0.status"] = "executing";
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      updateFields,
      { new: true }
    );

    if (!task) return res.status(404).json({ error: "Task not found" });

    return res.json({ success: true, task });

  } catch (err) {
    console.error("Update Status Error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
