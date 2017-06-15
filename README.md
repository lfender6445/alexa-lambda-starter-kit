# alexa lambda starter kit

starter kit to help you develop your alexa skills via aws lambdas

> alexa, tell hello world that i said  hi
>> "hello world"

> alexa, tell hello world that i said  bye
>> "goodbye world"

tutorial outlined below for simple hello world example. it is highly recommended you follow the tutorial prior to editing code

## what are lambdas

lambdas refer to AWS hosted functions

```
// local.js
function() { //do stuff }
// lambda.js  (remote)
const handler function() {}
module.exports.handler = handler
```

as seen above, the lambda is just an aws hosted function which weve named handler, the main difference being that it can be communicated with by other remote services.

We will be compressing the js files in this repo to an Archive.zip and uploading the zip to AWS lambda so we can edit our lambdas locally.

## tutorial

### setup lambda
1. log into [ambda](https://console.aws.amazon.com/lambda/home)
2. create a new function named `helloWorld`
3. configure your lambda runtime for node 6x
4. make sure you select `alexa skill` as the trigger for your lambda
5. upload your code (from this repo, `npm run zip`, select the Archive.zip, and upload through the lambda website)
  - make sure the handler field reads `index.handler`
6. click next or save
7. copy the ARN of your lambda for later use

### setup alexa dev portal
make sure you are logging in to the same account configured with your device

1. log into [alexa dev portal](https://developer.amazon.com/home.html)
2. click alexa skills kit
3 click 'add a new skill'
4. give your app a name and invocation, use `Hello World` for both
5. continue to 'Interaction Model' section
6. copy and paste the intent schema to the intent schema section from below.
7. copy and paste the utterances to the utterances section from below.
7. continue to configuration
8. click 'AWS Lambda ARN (Amazon Resource Name)'
9. select a region (eg North America) and paste the ARN from steps outlined above
10. click save

your skill should now be able to talk to lambda

### setup your code
- you can edit your code and upload to lambda with `npm run lambda` (note, this requires aws commandline tools) OR by manually uploading the recompressed zip archive (`npm run zip`)
  - see package.json scripts for more information
- log errors by configuring [cloudwatch](https://console.aws.amazon.com/cloudwatch/home?) for your lambda

### example intent schemas

```
{
  "intents": [
    {
      "intent": "Hello"
    },
    {
      "intent": "Goodbye"
    }
  ]
}
```

### example utterances
utterances are what the user speaks

```
Hello that I said hi
Goodbye that I said bye
```

## finally, try it out

> alexa, launch hello world
>> "launching your custom skill"

> alexa, tell hello world that i said  hi
>> alexa says "hello world"

> alexa, tell hello world that i said  bye
>> alexa says "goodbye world"
