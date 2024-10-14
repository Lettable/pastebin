// src/app/api/update/route.js
import { NextResponse } from 'next/server';
import Data from '../../../lib/model/Data';
import mongoose from 'mongoose';
import { connectDB } from '../../../lib/config/Database';

export async function PUT(req) {
  try {
    const isAlreadyConnected = mongoose.connection.readyState >= 1;

    if (!isAlreadyConnected) {
      await connectDB();
    }
    const { id, content, language } = await req.json();
    
    const updatedData = await Data.findByIdAndUpdate(id, { content, language }, { new: true });

    if (!updatedData) {
      return NextResponse.json({ message: 'Data not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Data updated successfully',
      data: updatedData,
    });
  } catch (error) {
    const message = (error).message || 'Error retrieving data';
    console.error('Error retrieving data:', message);
    return NextResponse.json(
      { message: 'Error retrieving data', error: message },
      { status: 500 }
    );
  }
}
