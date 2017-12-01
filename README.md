# Stranger-Things
The ability to analyze data as it streams from its source to its destination is a key enabler 
for making better decisions faster. We have attempted `Challenge #2` and have created a webapp
that attempts to _gamify_ the stimulation of a well. The goal is to _score_ the highest and stay
atop the leaderboard! The user's _score_ is calculated in realtime by our streaming application 
architecture!

## Client App
Mobile-first webapp, with no client-side dependencies. It is simple to use and easy to access.

## Audience
The app's target audience is the Person In Charge (PIC) of the stimulation job. There would also
be a full browser experience that could show more job info than the mobile version.

## Winning
The goal is to manage the __cost__ of the job, by controlling __rate__, __key chemicals__, and 
__sand concentration__. The realtime data is measured against the _plan_ or _design_ and a _score_ 
is calculated everytime new data is received from the job site ~ 1 sec on average. 

## Architecture
We (re)stream, or playback, the realtime data from __OSIsoft PI__ into __Azure Event Hub__. From there the 
data is picked up by __Azure Stream Analytics__ where it can be _transformed_, _enhanced_, and _analyzed_. 
__Machine Learning__, storage in an __Azure Data Lake__, and other Azure toolsets are all available for
data processing using this architecture! Once the data processing is complete, the data is pushed back to 
__Azure Event Hub__ where it can be picked up by a client consumer - i.e. _WebApp_, _SQL_, or even _OSIsoft PI_!

## Implementation
| Feature | Status |
|---------- | ----------- |
| Streaming Data | _fully implemented_ |
| Streaming Analytics |  _fully implemented_ |
| SAP Integration | _proof of concept_ |
| Thin Web Client | _fully implemented_ |
| User Scoring | _fully implemented_ |
| User Leaderboard | _design concept_ |
| Recommend Operational Changes | _future state_ |
| Write Back Results to PI | _future state_|

## Tools
* Angular
* Highcharts
* .NET Core 2.0 / .NET Standard
* Azure Event Hub
* Azure Storage
* Serilog
* Application Insights
* Visual Studio 2017
* Visual Studio Team Services
* Slack 

## Build
Each part of the application stack needs to be build individually and they all work together to
produce the product.
* strange-piwebapi (get data from piwebapi)
  * open the solution in visual studio
  * restore packages
  * build
* EventPublisher.ConsoleApp (publish data from strange-piwebapi into Azure Event Hub)
  * open the solution in visual studio
  * restore packages
  * build
* Azure Event Hub (configure only, no source code)
* Azure Stream Analytics (configure only, no source code)
* EventHubAPI (web client service layer, websockets, etc)
  * open the solution in visual studio
  * restore packages
  * build
* {angluar app}
  * {build instructions}

## Deploy
* strange-piwebapi: _runs as a client anywhere (Azure VM for Hackathon)_
* EventPublisher.ConsoleApp: _runs as a client anywhere (Azure VM for Hackathon)_
* Azure Event Hub: _its a cloud service... just let Microsft manage this one!_
* Azure Stream Analytics: _oh, glorious cloud!_
* EventHubAPI: _azure app service_
* {angular app}: _azure app service_

## Team
* Danny.Burrows - Monscierge
* Don.Morrison - Devon Energy
* Steve.Pankratz - Devon Energy
* Jon.Slominski - White Star Petroleum
* Devon Koetter-Mason - Devon Energy