const azure = require('azure-storage');

module.exports = async function (context, req) {
    // context.log(`COnnection string: ${process.env.TableStorage}`);

    const tableService = azure.createTableService(process.env.TableStorage);
    const tableName = "Events";


    const events = await executeQuery();
    context.res = {
        status: 200,
        body: events
    }

    context.log("Done")
}
async function executeQuery() {
    try {
        const tableService = azure.createTableService(process.env.TableStorage);
        return new Promise((resolve, reject) => {
            var query = new azure.TableQuery().top(100);
            tableService.queryEntities("Events", query, null, function (error, result, response) {
                //console.log(response)
                if (!error) {
                    resolve(result.entries);
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