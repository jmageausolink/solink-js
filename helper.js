global._checkStatus = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    // var error = new Error(response.statusText)
    // error.response = response
    console.log('bad status')
    console.log(JSON.stringify(response, null, 2))
    return response
  }
}

global._parseJSON = function(response) {
  return response.json()
}

global._handleError = function(err) {
    throw err 
}