function speakAndUpdateCard(title, desc, output, shouldEndSession) {
  return {
    outputSpeech: {
      type: 'PlainText',
      text: output,
    },
    card: {
      type: 'Simple',
      title,
      content: desc,
    },
    reprompt: {
      outputSpeech: {
        type: 'PlainText',
        text: output,
      },
    },
    shouldEndSession,
  }
}

function speak(output, repromptText, shouldEndSession) {
  return {
    outputSpeech: {
      type: 'PlainText',
      text: output,
    },
    reprompt: {
      outputSpeech: {
        type: 'PlainText',
        text: repromptText,
      },
    },
    shouldEndSession,
  }
}

function buildResponse(sessionAttributes, speechletResponse) {
  return {
    version: '1.0',
    sessionAttributes,
    response: speechletResponse,
  }
}

module.exports = {
  speakAndUpdateCard,
  speak,
  buildResponse,
}
