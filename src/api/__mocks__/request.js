const fs = require('fs')

  const request = (obj) => new Promise((resolve, reject) => {
  const data = obj.data
  const firstName = data.fname
  const lastName = data.lname
  const email = data.email
  const birthdate = data.birthdate
  const prefix = data.prefix
  fs.writeFile(`./src/api/__mockData__/${email}.json`, JSON.stringify(data), 
  (err) => {
  
    if (err) reject(err)
    // Parse the data as JSON and put in the key entity (just like the request library does)
    resolve({ entity: data })
  })
})

export default request

