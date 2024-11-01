import errorResponse from '@/lib/errorResponse'
import { NextResponse } from 'next/server'

const errorHandler = (err: any, req: any, res: any, next: any) => {
    let error = { ...err }
    error.message = err?.message

    console.log('in error handler')

    if (err?.name === 'CastError') {
        const message = 'resource not found'
        error = new errorResponse(message, 404)
    }
    if (err?.code === 11000) {
        const message = 'no duplicate username(s) or key(s) are allowed'
        error = new errorResponse(message, 401)
    }
    if (err?.name === 'ValidationError') {
        const message = Object.values(err.errors).map((era: any) => era?.message).join(',')
        error = new errorResponse(message, 401)
    }

    return NextResponse.json(
        { error: error.message || 'server error' },
        { status: error?.statusCode || 500 }
    )
}

export default errorHandler