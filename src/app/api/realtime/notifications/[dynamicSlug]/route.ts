import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/db/config/connectDB'
import NotificationModel from '@/db/models/NotificationModel'

export async function GET(req: NextRequest) {
    // Ensure the database is connected
    await connectDB()

    const headers = new Headers()
    headers.set('Content-Type', 'text/event-stream')
    headers.set('Cache-Control', 'no-cache')
    headers.set('Connection', 'keep-alive')

    const stream = new ReadableStream({
        async start(controller) {
            const sendEvent = (data: any) => {
                console.log('\n\n\n\n\n\n\n\n\ sending data... \n\n\n\n\n\n\n\n\n')
                controller.enqueue(`data: ${JSON.stringify(data)}\n\n`)
            }

            // Watch the Mongoose model for changes
            const changeStream = NotificationModel.watch()

            // Handle changes and stream them to the client
            changeStream.on('change', (change) => {
                sendEvent(change)
            })

            // When the client disconnects, clean up the resources
            req.signal.addEventListener('abort', () => {
                changeStream.close()
                controller.close()
            })
        }
    })

    return new NextResponse(stream, {
        headers
    })
}
