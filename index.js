const amazon = require('./src/amazon')
const alexa = require('./src/alexa')

const APP = 'My App'
const DESCRIPTION = 'My App Description'

const SPEECH = {
  launch: 'Launching your custom Alexa skill',
  sayHello: 'Hello World',
  sayGoodbye: 'Goodbye World',
}

const handleInit = (event, context) => {
  console.log('Initialized')
}

const handleLaunch = (event, context) => {
  const cardTitle = APP
  const cardDescription = DESCRIPTION

  const wordsToSay = SPEECH.launch
  const action = alexa.speakAndUpdateCard(cardTitle, cardDescription, wordsToSay, true)
  amazon.dispatch(event, context, action)
}

const handleIntent = (event, context) => {
  const intent = event.request.intent

  let wordsToSay
  let action

  switch (intent.name) {
    case 'Hello':
      wordsToSay = SPEECH.sayHello
      // create your speech object / lambda response
      action = alexa.speak(wordsToSay, true)
      // end lambda callback with response
      amazon.dispatch(event, context, action)
      break
    case 'Goodbye':
      wordsToSay = SPEECH.sayGoodbye
      action = alexa.speak(wordsToSay, true)
      amazon.dispatch(event, context, action)
      break
    default:
  }
}

const handleEndSession = (event, context) => {
  // cleanup
}

/*
  Amazon Lifecycle --------------------------------------------------------------------
  - onStartSession - occcurs before launch for new sessions only
  - onLaunch - when user launches app but does not ask it to danythin
  - onIntent - when user asks app to perform action
  - onSessionEnd - when user says exit /  no matching intent is found / an error occurs
*/

const LAUNCH = 'LaunchRequest'
const INTENT = 'IntentRequest'
const END = 'SessionEndedRequest'

const handler = (event, context, cb) => {
  // While a Lambda function is executing, it can interact with AWS Lambda to get useful runtime information
  // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
  try {
    // runs once on startup
    amazon.onStartSession(event, context, handleInit)

    const requestType = event.request.type

    switch (requestType) {
      case LAUNCH:
        amazon.onLaunch(event, context, handleLaunch)
        break
      case INTENT:
        amazon.onIntent(event, context, handleIntent)
        break
      case END:
        amazon.onSessionEnd(event, context, handleEndSession)
        break
      default:
    }
  } catch (e) {
    const action = { error: `Exception: ${e}` }
    amazon.dispatch(event, context, action)
  }
}

module.exports = { handler }
