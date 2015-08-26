var _checkStatus = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText),
        buffer = new Buffer(response.body._readableState.buffer[0])
    error.response = response
    error.response.body = JSON.parse(buffer.toString('utf-8'))
    throw error
  }
}

var _parseJSON = function(response) {
    if(response.status === 204 && response.statusText === "No Content")
        return response
    return response.json()
}

var _handleError = function(err) {
    throw err
}

module.exports = {
  checkStatus: _checkStatus,
  parseJSON: _parseJSON,
  handleError: _handleError
}