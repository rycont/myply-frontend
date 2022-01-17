import { NextApiHandler } from "next"

export const ERROR_CODES = {
    CANNOT_RECOG_PROVIDER: {
        message: `스트리밍 서비스를 인식할 수 없어요`,
        status: 400,
    },
} as const

export class CommonError extends Error {
    code: keyof typeof ERROR_CODES

    constructor(code: keyof typeof ERROR_CODES, message?: string) {
        super(message || ERROR_CODES[code].message)
        this.code = code
    }
}

export const apiHandler: (h: NextApiHandler) => NextApiHandler =
    (handler: NextApiHandler) => async (req, res) => {
        try {
            return await handler(req, res)
        } catch (e) {
            if (e instanceof CommonError)
                return res.status(ERROR_CODES[e.code].status).json({
                    code: e.code,
                    message: e.message,
                })

            res.status(500).json({ message: "알 수 없는 오류가 발생했어요.." })
        }
    }
