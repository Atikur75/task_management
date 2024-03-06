const Task = require("../../models/taskModel");

// ============================= Create New Task Controller Start =======================
async function createTaskController(req,res){

    const user_id = req.header('id');

    const {title,description,dueDate} = req.body;
    
    const task = new Task({

        title,
        description,
        dueDate,
        userID:user_id

    });

    task.save();

    return res.json({status: "success", message: "Task created successfully!", data: task});
}
// ============================= Create New Task Controller End =======================

// ============================= Show New Task Controller Start =======================
async function showNewTaskController(req,res){

    const user_id = req.header('id');

    const result = await Task.find({userID:user_id, status:"New"}).populate('userID');

    return res.json({status: "success", message: "Task fetched successfully!", data: result});
}
// ============================= Show New Task Controller End =======================

// ============================= Show In Progress Controller Strat =======================
async function showInProgressController(req,res){
    
    const user_id = req.header('id');

    const result = await Task.find({userID:user_id, status:"Inprogress"}).populate('userID');

    return res.json({status: "success", message: "Task fetched successfully!", data: result});

}
// ============================= Show In Progress Controller End =======================

// ============================= Show Completed Controller Strat =======================
async function showCompletedController(req,res){
    
    const user_id = req.header('id');

    const result = await Task.find({userID:user_id, status:"Completed"}).populate('userID');

    return res.json({status: "success", message: "Task fetched successfully!", data: result});

}
// ============================= Show Completed Controller End =======================

// ============================= Show Canceled Controller Strat =======================
async function showCanceledController(req,res){
    
    const user_id = req.header('id');

    const result = await Task.find({userID:user_id, status:"Canceled"}).populate('userID');

    return res.json({status: "success", message: "Task fetched successfully!", data: result});

}
// ============================= Show Canceled Controller End =======================

// ============================= Change Status Controller Start =======================
async function statusChangeController(req,res){

    const user_id = req.header('id');

    const {task_id,status} = req.body;

    const result = await Task.findOneAndUpdate({userID:user_id,_id:task_id},{status:status},{new:true});

    return res.json({status: "success", message: "Status Updated successfully!", data: result});

}
// ============================= Change Status Controller End =======================

module.exports = {createTaskController,showNewTaskController,showInProgressController,showCompletedController,showCanceledController,statusChangeController};