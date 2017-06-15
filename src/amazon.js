const isAuthorized = (event, context) => (
  /*
  * Uncomment this if statement and populate with your skill's application ID to
  * prevent someone else from configuring a skill that sends requests to this function.

  if (event.session.application.applicationId !== 'myamazon id') {
      return context.fail('Invalid Application ID')
   }
  */
  true
)

const amazon = {
  dispatch: (event, context, action, version) => {
    if (action.error) {
      return context.fail(action.error)
    }
    // context.succeed indicates the Lambda function
    // execution and all callbacks completed successfully
    return context.succeed({
      version: version || '1.0',
      sessionAttributes: event.session.attributes,
      response: action,
    })
  },
  onStartSession: (event, context, cb) => {
    const authorized = isAuthorized(event, context)
    const req = event.request

    if (authorized && event.session.new) {
      console.log(`onSessionStarted requestId=${req.requestId},sessionId= ${event.session.sessionId}`)
      if (cb) {
        return cb(event, context)
      }
    }
    return null
  },
  onLaunch: (event, context, cb) => {
    const launchRequest = event.request
    const session = event.session

    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`)

    if (cb) {
      return cb(event, context)
    }

    return null
  },
  onIntent: (event, context, cb) => {
    const intentRequest = event.request
    const session = event.session

    console.log(`onIntent requestId=${intentRequest.requestId},sessionId=${session.sessionId}`)

    if (cb) {
      return cb(event, context)
    }
    return null
  },
  onSessionEnd: (event, context, cb) => {
    const req = event.request
    const session = event.session

    console.log(`onSessionEnd requestId=${req.requestId}, sessionId=${session.sessionId}`)

    if (cb) {
      return cb(event, context)
    }
    return null
  },
}

module.exports = amazon
