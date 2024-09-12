const handler = async () => {
  return {
    statusCode: 200,
    header: ("Content-Type": "text/plain"),
    body: "Marconi".toUpperCase()
  }
}

module.exports = {handler}