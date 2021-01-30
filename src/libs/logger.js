const winston = require('winston');
const config = require('../config/settings')
const CONSOLE_DATE_FORMAT = 'HH:mm:ss.SSS';

/**
 * Factory method to create a logger with the parameters provided
 * @param {string} label Log label
 * @param {string} level Log level e.g info, debug, warn
 * @param {string} filename Filename to write logs
 * @returns {winston.Logger} Logger
 */
const createLogger = () => {
    const label = config.lOGGER_DETAILS.label;
    const level = config.lOGGER_DETAILS.level;
    const filename = config.lOGGER_DETAILS.file;
    const logger = winston.createLogger({ level });

    // Console transport for display messages in the terminal
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.label({ label }),
            winston.format.timestamp({ format: CONSOLE_DATE_FORMAT }),
            winston.format.splat(),
            winston.format.printf(({
                level, message, label, timestamp,
            }) => `${timestamp} [${label}] ${level}: ${message}`),
        ),
    }));

    // If a filename is specified, create a file logger
    if (typeof filename === 'string' && filename.length) {
        logger.add(new winston.transports.File({
            filename,
            format: winston.format.combine(
                winston.format.label({ label }),
                winston.format.timestamp(),
                winston.format.splat(),
                winston.format.uncolorize(),
                winston.format.json(),
            ),
        }));
    }

    return logger;
};

const logger = createLogger();
module.exports = logger;