import { NextResponse } from 'next/server';
import Data from '../../../lib/model/Data';

export async function GET(request) {
  try {
    const url = new URL(request.nextUrl);
    const searchParams = url.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const foundData = await Data.findById(id);

    if (!foundData) {
      return NextResponse.json({ message: 'Data not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Data retrieved successfully',
      data: foundData,
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