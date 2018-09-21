const fs = require('fs')

const request = (obj) => new Promise((resolve, reject) => {
  const data = obj.data
  const firstName = data.firstname
  const lastName = data.lastname
  const email = data.email
  const birthdate = data.birthdate
  fs.writeFile(`./src/api/__mockData__/${email}.json`, JSON.stringify(data), 
  (err) => {
  
    if (err) reject(err)
    // Parse the data as JSON and put in the key entity (just like the request library does)
    resolve({ entity: data })
  })
})

export default request

