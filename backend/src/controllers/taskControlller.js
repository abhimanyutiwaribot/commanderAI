const Task = require('../models/Task');
const axios = require("axios")
const { interpretQuery } = require("../services/queryInterpreter");

exports.createTask = async (req, res) => {
  try {
    const { command } = req.body;

    let task = await Task.create({ command, status: "thinking" });

    // AI decides how to execute
    const interpretation = await interpretQuery(command);
    console.log("AI Interpretation:", interpretation);

    task.plan = [
      {
        step: "web_search",
        query: interpretation.search_query,
        intent: interpretation.intent,
        location: interpretation.location,
        topic: interpretation.topic,
        brand: interpretation.brand,
        category: interpretation.category,
        minPrice: interpretation.minPrice,
        maxPrice: interpretation.maxPrice,
        status: "pending"
      }
    ];

    task.status = "ready";
    await task.save();

    await axios.post(process.env.N8N_WEBHOOK, {
      taskId: task._id,
      plan: task.plan
    });

    res.status(201).json(task);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};
