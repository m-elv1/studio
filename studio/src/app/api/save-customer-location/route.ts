import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const locationData = await req.json();
    console.log('Received location data:', locationData);

    // TODO: Implement backend logic to save the location data to your database

    return NextResponse.json({message: 'Customer location saved successfully'}, {status: 200});
  } catch (error) {
    console.error('Error saving customer location:', error);
    return NextResponse.json({message: 'Failed to save customer location'}, {status: 500});
  }
}
