import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from '../../../lib/mongodb';
import Tasks from "../../../models/Tasks";

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
    }

    try {
        const body = await req.json();
        const { taskTitle, description, tags } = body;
        console.log(body);
        
        // Add validation
        if (!taskTitle || !description || !tags) {
            return NextResponse.json({ message: 'Missing required fields', success: false }, { status: 400 });
        }

        console.log('Attempting to connect to mongodb...');
        await connectMongoDB();
        console.log('MongoDb connected successfully');
        console.log('received data:', body);

        const newTask = await Tasks.create({
            taskTitle,
            description,
            tags
        });
        console.log('New Task created:', newTask);
        
        return NextResponse.json({ message: 'Task created successfully', success: true, data: newTask }, { status: 201 });
        
    } catch (error) {
        console.error('Error details', error);
        return NextResponse.json({
            message: 'Internal Server Error',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined 
        }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        console.log('Attempting to connect to mongodb...');
        await connectMongoDB();
        console.log('MongoDb connected successfully');

        const tasks = await Tasks.find({}).sort({ createdAt: -1 }); // Retrieve all tasks, sorted by creation date (newest first)
        console.log('Tasks retrieved:', tasks.length);

        return NextResponse.json({ message: 'Tasks retrieved successfully', success: true, data: tasks }, { status: 200 });
    } catch (error) {
        console.error('Error details', error);
        return NextResponse.json({
            message: 'Internal Server Error',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined 
        }, { status: 500 });
    }
}