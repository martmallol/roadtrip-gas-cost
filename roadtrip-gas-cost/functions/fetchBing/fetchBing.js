// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
//import fetch from "node-fetch";

const handler = async (event) => {
  const {formatedFirstAddr, formatedFirstState, formatedSecondAddr, formatedSecondState} = event.queryStringParameters

  const API_SECRET = process.env.MY_BING_KEY;
  const url = `http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=${formatedFirstAddr},%20${formatedFirstState}&wayPoint.2=${formatedSecondAddr},%20${formatedSecondState}&distanceUnit=mi&key=${API_SECRET}`
  try {
    const response = await fetch(url);
    let data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: status,
      body: JSON.stringify({status, statusText, headers, data})
    }
  }
}

module.exports = { handler }