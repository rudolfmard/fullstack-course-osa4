const logger = require('./logger')

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if(error.name === 'ValidationError'){
        return response.status(400).send({error: 'Required field is missing'})
    }
    next(error)
}

module.exports = {
    errorHandler
}