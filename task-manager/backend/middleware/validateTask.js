// Middleware functions

const PRIORITIES = ["low", "medium", "high"];

// parseIdParam middleware to validate and parse :id param
function parseIdParam(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid task id" });
  }
  req.id = id;
  next();
}

// validateCreateTask middleware to validate request body for creating a task
function validateCreateTask(req, res, next) {
  const { title, description, completed, priority } = req.body;

  if (typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({
      error: 'Field "title" is required and must be a non-empty string',
    });
  }

  if (typeof description !== "string" || description.trim().length === 0) {
    return res.status(400).json({
      error: 'Field "description" is required and must be a non-empty string',
    });
  }

  if (typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ error: 'Field "completed" is required and must be a boolean' });
  }

  if (!PRIORITIES.includes(priority)) {
    return res.status(400).json({
      error:
        'Field "priority" is required and must be one of: low | medium | high',
    });
  }

  next();
}

function validateUpdateTask(req, res, next) {
  const { title, description, completed, priority } = req.body;

  if (typeof title !== "string" || title.trim().length === 0) {
    return res
      .status(400)
      .json({
        error: 'Field "title" is required and must be a non-empty string',
      });
  }

  if (typeof description !== "string" || description.trim().length === 0) {
    return res
      .status(400)
      .json({
        error: 'Field "description" is required and must be a non-empty string',
      });
  }

  if (typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ error: 'Field "completed" is required and must be a boolean' });
  }

  if (!PRIORITIES.includes(priority)) {
    return res.status(400).json({
      error:
        'Field "priority" is required and must be one of: low | medium | high',
    });
  }

  next();
}

module.exports = {
  PRIORITIES,
  parseIdParam,
  validateCreateTask,
  validateUpdateTask,
};
