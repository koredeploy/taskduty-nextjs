import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from '../../../../lib/mongodb';
import Tasks from "../../../../models/Tasks";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongoDB();
        const task = await Tasks.findById(params.id);
        if (!task) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Task retrieved successfully', success: true, data: task }, { status: 200 });
    } catch (error) {
        console.error('Error details', error);
        return NextResponse.json({
            message: 'Internal Server Error',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongoDB();
        const body = await req.json();
        const { taskTitle, description, tags } = body;
        
        const updatedTask = await Tasks.findByIdAndUpdate(params.id, { taskTitle, description, tags }, { new: true });
        if (!updatedTask) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Task updated successfully', success: true, data: updatedTask }, { status: 200 });
    } catch (error) {
        console.error('Error details', error);
        return NextResponse.json({
            message: 'Internal Server Error',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectMongoDB();
        const deletedTask = await Tasks.findByIdAndDelete(params.id);
        if (!deletedTask) {
            return NextResponse.json({ message: 'Task not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Task deleted successfully', success: true }, { status: 200 });
    } catch (error) {
        console.error('Error details', error);
        return NextResponse.json({
            message: 'Internal Server Error',
            error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
        }, { status: 500 });
    }
}