global._checkStatus = function(response) {
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

global._parseJSON = function(response) {
  return response.json()
}

global._handleError = function(err) {
    throw err 
}