import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '../../lib/config/Database';

export async function GET() {
  try {
    const isAlreadyConnected = mongoose.connection.readyState >= 1;

    if (!isAlreadyConnected) {
      await connectDB();
    }

    const apiInfo = {
      message: isAlreadyConnected
        ? 'Already connected'
        : 'Connected with database',
      status: isAlreadyConnected ? 'connected' : 'new connection',
      databaseState: mongoose.connection.readyState,
      author: 'Mirza',
      project: {
        name: 'Zube',
        description: 'Zube is a privatebin platform where users can create and share encrypted notes.',
        version: '0.1.0',
      },
      apiDetails: {
        technologies: {
          frontend: 'Next.js',
          backend: 'Node.js',
          database: 'MongoDB',
          ORM: 'Mongoose',
        },
        environment: process.env.NODE_ENV || 'development',
      },
      additionalInfo: {
        license: 'MIT',
        documentation: '...',
        repository: 'https://github.com/Lettable/Pastebin',
      },
    };

    return NextResponse.json(apiInfo);
  } catch (error) {
    const message = (error).message || 'An unknown error occurred';
    console.error('Error while connecting to the database:', message);

    return NextResponse.json(
      {
        message: 'Error while connecting to the database',
        error: message,
        author: 'Mirza',
        project: {
          name: 'Zube',
          description: 'Zube is a privatebin platform where users can create and share encrypted notes.',
        },
      },
      { status: 500 }
    );
  }
}
