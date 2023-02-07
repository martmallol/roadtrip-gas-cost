// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const handler = async (event) => {
  const {startDate} = event.queryStringParameters

  const EIA_SECRET = process.env.MY_EIA_KEY;
  const url = `https://api.eia.gov/v2/petroleum/pri/gnd/data/?frequency=weekly&data[0]=value&facets[duoarea][]=R1X&facets[duoarea][]=R1Y&facets[duoarea][]=R1Z&facets[duoarea][]=R20&facets[duoarea][]=R30&facets[duoarea][]=R40&facets[duoarea][]=R50&facets[duoarea][]=SCA&facets[duoarea][]=SCO&facets[duoarea][]=SFL&facets[duoarea][]=SFL&facets[duoarea][]=SMA&facets[duoarea][]=SMN&facets[duoarea][]=SNY&facets[duoarea][]=SOH&facets[duoarea][]=STX&facets[product][]=EPD2D&facets[product][]=EPMMU&facets[product][]=EPMPU&facets[product][]=EPMRU&start=${startDate}&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000&api_key=${EIA_SECRET}`;
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