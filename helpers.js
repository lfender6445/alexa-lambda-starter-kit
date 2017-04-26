function buildSpeechletResponse (title, output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: 'SSML',
      ssml: output
    },
    card: {
      type: 'Simple',
      title: title,
      content: output
    },
    reprompt: {
      outputSpeech: {
        type: 'PlainText',
        text: repromptText
      }
    },
    shouldEndSession: shouldEndSession
  }
}

function buildSpeechletResponseWithoutCard (output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: 'PlainText',
      text: output
    },
    reprompt: {
      outputSpeech: {
        type: 'PlainText',
        text: repromptText
      }
    },
    shouldEndSession: shouldEndSession
  }
}

function buildResponse (sessionAttributes, speechletResponse) {
  return {
    version: '1.0',
    sessionAttributes: sessionAttributes,
    response: speechletResponse
  }
}

module.exports = {
  buildSpeechletResponse: buildSpeechletResponse,
  buildSpeechletResponseWithoutCard: buildSpeechletResponseWithoutCard,
  buildResponse: buildResponse
}
