var SolinkAPI = require('./index'),
    url = 'http://localhost:8800',
    credentials = { 
        'email' : 'integrationtestuser+1@solinkcorp.com', 
        'password' : 'password'
    },
    token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhcHBfbWV0YWRhdGEiOnsidGVuYW50X2lkIjoiMSIsInVzZXJfdHlwZSI6ImFkbWluIn0sImVtYWlsIjoiaW50ZWdyYXRpb250ZXN0dXNlcisxQHNvbGlua2NvcnAuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlzcyI6Imh0dHBzOi8vc29saW5rLmF1dGgwLmNvbS8iLCJzdWIiOiJhdXRoMHw1NWM4YzQ2NmFhMGM4Mzc3Mjg2OTE1YzIiLCJhdWQiOiI1UjlpREtpUTduWUNHT0phQkRyUGJlc013bmtHajdpaCIsImV4cCI6MTQ0MDY0MzA4OCwiaWF0IjoxNDQwNjA3MDg4fQ.dmWSGCOa-OOqI4c6h-vn_UZebHfoU6d7LYwpkvkEMbw'

// URL defaults to cloud url
var api = new SolinkAPI(token, url)
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

// api.filters.create(filter)
//     .then(function(res) {   console.log('created')  })
//     .then(function() {
//         api.filters.find(filter.id)
//             .then(function(res) {   console.log('found')    })
//             .then(function() {
//                 api.filters.update(filter.id, filter)
//                     .then(function(res) {   console.log('updated')  })
//                     .then(function() {
//                         api.filters.delete(filter.id)
//                             .then(function(res) {  console.log('deleted')  })
//                             .catch(function(e) {
// 		                    	console.log('err')
// 		                    	console.log(e)
// 		                    })
//                     })
//             })
//     })

api.locations.cameras('camera_id').at(35)
  .then(function(res) {
    console.log('res')
    console.log(res)
  })
  .catch(function(e) {
    console.log('err')
    console.log(e)
  })