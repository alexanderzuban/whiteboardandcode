class Logger {
    log(...data: any[]) {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log(...data)
        }
    }

    render(...data: any[]) {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log({operation: "render", data})
        }
    }

    debug(...data: any[]) {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            console.log(...data)
        }
    }
}

export const logger = new Logger()
