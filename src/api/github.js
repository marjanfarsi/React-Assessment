import request from './request';

const getUser = user => {
   return request({url: `https://data.usbnc.org/api/contact`, method: 'post', data: user})
}
//('https://data.usbnc.org/api/contact')

export default getUser 
