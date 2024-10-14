import { NextResponse } from 'next/server';
import Data from '../../../lib/model/Data';
import mongoose from 'mongoose';
import { connectDB } from '../../lib/config/Database';

export async function POST(req) {
    try {
      const isAlreadyConnected = mongoose.connection.readyState >= 1;

      if (!isAlreadyConnected) {
        await connectDB();
      }
      const { content, language } = await req.json();
  
      const newData = new Data({
        content,
        language,
      });
  
      const savedData = await newData.save();
  
      const response = NextResponse.json({
        message: 'Data saved successfully',
        data: savedData,
        objectId: savedData._id,
      });
  
      response.headers.set('Location', `/${savedData._id}`);
  
      return response;
    } catch (error) {
        const message = (error).message || 'Error retrieving data';
        console.error('Error retrieving data:', message);
        return NextResponse.json(
          { message: 'Error retrieving data', error: message },
          { status: 500 }
        );
      }
  }
