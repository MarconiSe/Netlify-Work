const { MongoClient } = require("mongodb")

const handler = async () => {
  const client = new MongoClient(process.env.CONNECTIONSTRING)
  await client.connect()

  const recentWorkSection = await client.db().collection("RecentWorkSection").find().toArray()
  client.close()

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(recentWorkSection)
  }
}

module.exports = { handler }