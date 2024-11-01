import { NextRequest } from "next/server"

type CallbackFn = (parm1?: any, param2?: any, param3?: any) => Promise<any>

const asyncHandler = (callbackFn: CallbackFn) =>
    (req: any, res: any, next: any) => Promise.resolve(callbackFn(req, res)).catch(next)

export default asyncHandler