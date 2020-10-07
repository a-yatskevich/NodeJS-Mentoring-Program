import { createLogger, format, transports } from 'winston';

const options = {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false
    }
};

const { combine, timestamp, printf } = format;

const logger = createLogger({
    format: combine(
        timestamp(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [new transports.Console(options.console)],
    exitOnError: false
});

export default logger;
