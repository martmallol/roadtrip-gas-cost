# Roadtrip Gas Cost Calculator App
![Page Example](/roadtrip-gas-cost/src/img/sample-page.jpg)
This Web Page calculates how much money you'll have to spend on gas for your next roadtrip. It calculates it basing on the routes you'll take.

## Overview
### Users should be able to
- Insert all the trips that will take part of their roadtrip (US addresses and their proper state).
- Remove a trip if they want.
- Insert the gas type that they will be using for their car.
- Insert their car's fuel consumption (if they'd like to).

### Built with
- React JS.
- Bootstrap.
- Bing Maps API & EIA (US Energy Information Administration) API.
- CSS.

### What I learnt
- Send requests to an API and use that information for the sake of my app.
- Utilize async-await functions and render the proper visuals on the web page. This depends on the following factors: 
    - If the fetching of the data was succesful. 
    - If it wasn't.
    - If it's still pending.
- Create the styling for mobile devices. The app's visuals are clean for desktop & smart devices. 

### APIs
#### Bing Maps API
Documentation link [here](https://learn.microsoft.com/en-us/bingmaps/rest-services/routes/calculate-a-route?redirectedfrom=MSDN).

I place the inputs made by the user (both trip's addresses and its state) and then calculate the distance of the trip by extracting it from the JSON object returned by the response.

#### EIA (US Energy Information Administration) API
Documentation link [here](https://www.eia.gov/opendata/documentation.php).

I search for last week gas prices on the United States and then extract from the API's response the price of the state's fuel type given by the user.
