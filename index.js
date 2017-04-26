var helpers = require('./helpers')

var SPEECH = {
  launch: '<speak>Launching your custom Alexa skill</speak>'
  sayHello: '<speak>Hello World</speak>',
  sayGoodbye: '<speak>Goodbye</speak>',
}

exports.handler = function (event, context, cb) {
  try {
    console.log('event.session.application.applicationId='
      + event.session.application.applicationId)

    /**
     * Uncomment this if statement and populate with your skill's application ID to
     * prevent someone else from configuring a skill that sends requests to this function.
     */

    //  if (event.session.application.applicationId !== 'myamazon id') {
    //      context.fail('Invalid Application ID')
    //   }

    if (event.session.new) {
      onSessionStarted({
        requestId: event.request.requestId
      }, event.session)
    }

    if (event.request.type === 'LaunchRequest') {
      onLaunch(event.request,
        event.session,
        function callback (sessionAttributes, speechletResponse) {
          context.succeed(helpers.buildResponse(sessionAttributes, speechletResponse))
        })
    } else if (event.request.type === 'IntentRequest') {
      onIntent(event.request,
        event.session,
        function callback (sessionAttributes, speechletResponse) {
          context.succeed(helpers.buildResponse(sessionAttributes, speechletResponse))
        })
    } else if (event.request.type === 'SessionEndedRequest') {
      onSessionEnded(event.request, event.session)
      context.succeed()
    }
    cb(null, 'success msg')
  } catch (e) {
    context.fail('Exception: ' + e)
    cb(new Error('failure'))
  }
}

function onSessionStarted (sessionStartedRequest, session) {
  console.log('onSessionStarted requestId=' + sessionStartedRequest.requestId + ', sessionId=' + session.sessionId)
  // add any session init logic here
}

function onLaunch (launchRequest, session, callback) {
  console.log('onLaunch requestId=' + launchRequest.requestId + ', sessionId=' + session.sessionId)

  var cardTitle = 'My Custom Alexa Skill'
  var speechOutput = SPEECH.launch
  callback(session.attributes,
    helpers.buildSpeechletResponse(cardTitle, speechOutput, '', true))
}

function onIntent (intentRequest, session, callback) {
  console.log('onIntent requestId=' + intentRequest.requestId + ', sessionId=' + session.sessionId)

  /* eslint-disable one-var */
  var intent = intentRequest.intent,
    intentName = intentRequest.intent.name
  /* eslint-enable one-var */

  if (intentName === 'Hello') {
    handleHello(intent, session, callback)
  }
  if (intentName === 'Goodbye') {
    handleGoodbye(intent, session, callback)
  }
}

/*
 * Called when the user ends the session.
 */
function onSessionEnded (sessionEndedRequest, session) {
  console.log('onSessionEnded requestId=' + sessionEndedRequest.requestId + ', sessionId=' + session.sessionId)
  // Add any cleanup logic here
}

function handleHello (intent, session, callback) {
  callback(session.attributes,
    helpers.buildSpeechletResponseWithoutCard(SPEECH.sayHello, '', 'true'))
}

function handleGoodbye (intent, session, callback) {
  callback(session.attributes,
    helpers.buildSpeechletResponseWithoutCard(SPEECH.turnLightOff, '', 'true'))
}
