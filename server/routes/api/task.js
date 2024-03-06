const express = require('express');
const middleware = require('../../middleware/middleware');
const { createTaskController, showNewTaskController, showInProgressController, showCompletedController, showCanceledController, statusChangeController } = require('../../controllers/TaskController/taskController');
const router = express.Router();

// Create Task
router.post('/createtask',middleware,createTaskController);

// Show Create Task
router.get('/shownewtask',middleware,showNewTaskController);

// Show Inprogress Task
router.get('/showinprogresstask',middleware,showInProgressController);

// Show Completed Task
router.get('/showcompletedtask',middleware,showCompletedController);

// Show Canceled Task
router.get('/showcanceledtask',middleware,showCanceledController);

// Status Change Task
router.post('/statusChangetask',middleware,statusChangeController);

module.exports = router;