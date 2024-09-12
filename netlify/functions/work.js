const handler = async () => {
  return {
    statusCode: 200,
    header: ("Content-Type": "text/plain"),
    body: 2 + 2
  }
}

module.exports = {handler}