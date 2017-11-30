using System;
using System.Collections.Generic;
using OSIsoft.PIDevClub.PIWebApiClient;
using System.IO;

namespace strange_piwebapi
{
    class Program
    {
        static void Main(string[] args)
        {
            var username = "hacker";
            var password = "Pa$$w0rd";
            var uri = "https://pi.dvnhackathon.com/piwebapi";

            // connect to the pi-webapi
            PIWebApiClient client = new PIWebApiClient(uri, false, username, password);
            Console.WriteLine($"Connected to {uri}");

            // the webId for accessing the skid element
            var skidId = "E0kmIZsN6_90OPP6Ztf91JxQQG-r8JTT5xGpRgANOmHTrQT1NJU09GVFBJLTAwMVxERVZPTlxTS0lEU1xTS0lEICM3Nw";

            // get a list of attirbutes on this element indexed to name
            var attributeDict = new Dictionary<string, string>();
            foreach (var attribute in client.Element.GetAttributes(skidId).Items)
            {
                attributeDict.Add(attribute.Name, attribute.WebId);
                foreach (var child in client.Attribute.GetAttributes(attribute.WebId).Items)
                {
                    attributeDict.Add($"{attribute.Name} {child.Name}", child.WebId);
                }
            }
            Console.WriteLine($"Found {attributeDict.Count} attributes.");

            //var batchRequest = new Dictionary<string, PIRequest>();
            //batchRequest.Add("1", new PIRequest("GET", $"{uri}/streams/A0EkmIZsN6_90OPP6Ztf91JxQQG-r8JTT5xGpRgANOmHTrQEngcZuEydlc9S6njbLWPaQT1NJU09GVFBJLTAwMVxERVZPTlxTS0lEU1xTS0lEICM3N3xBQ1RJVkUgR0VMIEJSRUFLRVI/value"));
            //var batch = client.BatchApi.Execute(batchRequest);
            //foreach (var response in batch)
            //{
            //    Console.Write($"{response.Key} -> {response.Value}");
            //}

            // get data for our key attribute (data will be aligned to its timestamps)
            Console.WriteLine($"Requesting history for 'Treating Pressure' key item.");
            var timestamps = new List<string>();
            var startTime = "1/1/2017";
            var lastStartTime = "";
            while (startTime != lastStartTime)
            {
                Console.Write($" -> {startTime}");
                lastStartTime = startTime;
                var keyTimestamps = client.Stream.GetRecorded(
                    webId: "A0EkmIZsN6_90OPP6Ztf91JxQQG-r8JTT5xGpRgANOmHTrQfy8liDPVAlkrZEtw0Fh1wgT1NJU09GVFBJLTAwMVxERVZPTlxTS0lEU1xTS0lEICM3N3xUUkVBVElORyBQUkVTU1VSRQ",
                    startTime: startTime,
                    endTime: "*",
                    maxCount: 25000
                );

                foreach (var t in keyTimestamps.Items)
                {
                    timestamps.Add(t.Timestamp);
                    startTime = t.Timestamp;
                }
                Console.WriteLine($" [{keyTimestamps.Items.Count}]");
            }
            Console.WriteLine($"Found {timestamps.Count} timestamped values for key item.");

            // keep track of the row
            var rowCount = 0;
            var maxRows = timestamps.Count;

            // write the data to a file so we have better access, its all just history anyway
            // why is the webapi so slow? wireless network traffic?
            using (var csv = new StreamWriter("data.csv", false))
            {
                foreach (var timestamp in timestamps)
                {
                    Console.WriteLine($"{++rowCount}/{maxRows}: {timestamp}");

                    // write timestamp
                    var rowString = $"\"timestamp\": {timestamp},";

                    // get the values for each item at this timestamp
                    foreach (var a in attributeDict)
                    {
                        var time = new List<string>();
                        time.Add(timestamp);
                        var v = client.Stream.GetInterpolatedAtTimes(a.Value, time: time);
                        if (v.Items[0].Value.ToString().StartsWith("{", StringComparison.InvariantCulture))
                            rowString += ($"\"{a.Key.Replace(" ", "")}\": null,");
                        else
                            rowString += ($"\"{a.Key.Replace(" ", "")}\": {v.Items[0].Value},");
                    }

                    // remove the last comma
                    rowString = rowString.Remove(rowString.Length - 1);

                    // write to the file
                    csv.WriteLine($"{{{rowString}}}");
                }
            }
        }
    }
}
