#strange-piwebapi
Console app to pipe data from piwebapi to a csv file. Tried to use piwebapi directly, but it as just too slow making singleton calls for each attribute and timestamp. Batch controller is not available for hackathon.

##build
In order to build:
* Add `./PI-Web-API-Client-DotNet-Core/dist/` as a nuget repo.
* Add `PIWebApiClient` as dependency if not already
* Build

