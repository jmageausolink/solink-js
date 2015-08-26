var SolinkAPI = require('./index'),
    url = 'https://10.126.140.51:8800',
    credentials = { 
        'email' : 'integrationtestuser+1@solinkcorp.com', 
        'password' : 'password'
    },
    token = {
      "auth_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfbWV0YWRhdGEiOnsidGVuYW50X2lkIjoiMSIsInVzZXJfdHlwZSI6ImFkbWluIn0sImVtYWlsIjoiaW50ZWdyYXRpb250ZXN0dXNlcisxQHNvbGlua2NvcnAuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vc29saW5rLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1NWM4YzQ2NmFhMGM4Mzc3Mjg2OTE1YzIiLCJhdWQiOiI1UjlpREtpUTduWUNHT0phQkRyUGJlc013bmtHajdpaCIsImV4cCI6MTQ0MDY0OTg3OCwiaWF0IjoxNDQwNjEzODc4fQ.TQDdNALDA8bHoo6OBLRTz9omTmJ4e-dYQ-axeCuEVYg",
      "aws": {
        "AccessKeyId": "ASIAICVD2OHQOBRYZC2Q",
        "SecretAccessKey": "oLvK7SK1r6x0R//AIbB9zPILl8vW15QAzWHBfI4y",
        "SessionToken": "AQoDYXdzEDQa0AKdke8SFenJHc3WTRlz+oRLhexRwiIw8U/eKF1dG4PvMaYPk86FZ0BL9XP67LQRIeJ79I5Hbz5AMhxfMVwvoOQAPbQehY5/dwNLAwh/nERjH2ZDJqx2EDb9vA/gvSS3cTJqYjaWDyC6lHCgSsCWPrQPHYHp1ZsbNXPKd8HN5nuD/FM4QJNRGQBrXVuF0OU5XR0Kh6Vx4Y5lPSNGatZxgKpOGaXnk7lZXJFhYYDjRtyViIHZ8KzhC1/o/SL3dOzLEwG+N3As+J6H5eCJB/jTACpHZX4QZLPWJSrvxO8ffw0WIoFF3/3Qu3Zb5kXbVOswelM4YFePx4+Nrrq084dalvJvjV2LgRpJGr6hHFrmfaX1LTTmXWurX9122Y/0TE3remRBwkWHGGeCKztsci7/IW7Q4No288faZFFHMHov5cFGSAG1ApOstSq2c3SRiGYLC1wg9ov4rgU="
      }
    }
// URL defaults to cloud url
var api = new SolinkAPI(credentials, url)
var filter = {
  "id": "filter_id",
  "name": "Small transactions",
  "query": {
    "query": {
      "match_all": {}
    },
    "sort": {
      "balance": {
        "order": "desc"
      }
    }
  }
}

api.filters.create(filter)
    .then(function(res) {   console.log('created')  })
    .then(function() {
        api.filters.find(filter.id)
            .then(function(res) {   console.log('found')    })
            .then(function() {
                api.filters.update(filter.id, filter)
                    .then(function(res) {   console.log('updated')  })
                    .then(function() {
                        api.filters.delete(filter.id)
                            .then(function(res) {  console.log('deleted')  })
                            .catch(function(e) {
		                    	console.log('err')
		                    	console.log(e)
		                    })
                    })
            })
    }).catch(function(e) {
      console.log(e)
    })

// api.locations.cameras('camera_id').at(35)
//   .then(function(res) {
//     console.log('res')
//     // console.log(res)
//   })
//   .catch(function(e) {
//     console.log('err')
//     // console.log(e)
//   })