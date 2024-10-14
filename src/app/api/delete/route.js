import { NextResponse } from 'next/server';
import Data from '../../../lib/model/Data';
import mongoose from 'mongoose';
import { connectDB } from '../../lib/config/Database';

export async function DELETE(req) {
  try {
    const isAlreadyConnected = mongoose.connection.readyState >= 1;

    if (!isAlreadyConnected) {
      await connectDB();
    }
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const deletedData = await Data.findByIdAndDelete(id);

    if (!deletedData) {
      return NextResponse.json({ message: 'Data not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Data deleted successfully',
      data: deletedData,
    });
  } catch (error) {
    const message = (error).message || 'Error deleting data';
    console.error('Error deleting data:', message);
    return NextResponse.json(
      { message: 'Error deleting data', error: message },
      { status: 500 }
    );
  }
}
