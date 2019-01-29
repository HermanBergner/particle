import http from 'https'
export default class Http{
  constructor(){}

  request(options){

    const { url, auth, data } = options
    
    let headers, postData
    const base = url.split(/\//)
    const host = base.shift()
    const path = `/${base.join('/')}?access_token=${auth}`

    
    if(data){
      postData = JSON.stringify(data)
        .replace(/{|}/g, '')
        .replace(/:/g, '=')
        .replace(/"/g, '')

      headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
      }
    }else{
      headers = {
        'content-type': 'application/json'
      }    
    }
    
    return new Promise((resolve, reject) => {
      const method = postData ? 'POST' : 'GET'
      const request = http.request({
        headers,
        host,
        path, 
        method,
      }, (res) => {
        try {
          res.on('data', d => resolve(JSON.parse(d)))
        } catch (e) {
          reject(e)
        }
      })
      
      request.on('error', (e) => reject(e))
      if(postData)
        request.write(postData)
      request.end()
    }) 
  }
}