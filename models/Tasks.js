import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
taskTitle: {type: String, required: true},
description: {type: String, required: true},
tags: {type: String, enum: ['urgent', 'important',],  required: true}
}, {timestamps: true});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);


