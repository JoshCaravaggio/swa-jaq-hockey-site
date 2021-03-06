const azure = require('azure-storage');

module.exports = async function (context, req) {

    const tableService = azure.createTableService(process.env.TableStorage);
    const tableName = "Events";

    try {
        const events = await executeQuery(req.query.type);
        context.res = {
            status: 200,
            body: events,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Methods": "GET"
            }
        }
    }
    catch (err) {
        context.log(err);
        context.res = {
            status: 500,
            body: "An error occured while getting the events.",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "Access-Control-Allow-Methods": "GET"
            }
        }
    }
}

async function executeQuery(type) {
    try {
        const tableService = azure.createTableService(process.env.TableStorage);
        return new Promise((resolve, reject) => {
            var query = new azure.TableQuery().top(100).where(`Type == ?`, type);
            tableService.queryEntities("Events", query, null, function (error, result, response) {
                console.log(response)
                if (!error) {
                    var events = [];
                    result.entries.forEach(element => {
                        events.push({
                            startTimestamp: element.StartTime._,
                            additionalInfo: element.AdditionalInfo._,
                            location: element.Location._,
                            dateTimeDescription: element.DateTimeDescription._
                        });
                    })
                    events.sort(compareEventTimes);
                    resolve(events);
                } else {
                    resolve(error);
                }
            });
        });
    } catch (e) {
        console.log(2, e)
        return new Promise((resolve, reject) => {
            reject(e);
        });
    }
}

function compareEventTimes(a, b) {
    if (a.startTimestamp < b.startTimestamp) {
        return -1;
    }
    if (a.startTimestamp > b.startTimestamp) {
        return 1;
    }
    return 0;
}