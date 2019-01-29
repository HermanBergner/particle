import Http from './http';


export default class Particle {
  constructor(token) {
    this.token = token
    this.host = 'api.particle.io'
    this.version = '/v1'
  }

  async devices() {
    const http = new Http()
    const { host, token, version } = this

    return await http.request({ url: 'api.particle.io/v1/devices', auth: token })
  }

  async call(opt) {

    const http = new Http()
    const { token } = this
    Object.assign({ argument: ''}, opt)

    const { device, name, argument } = opt
    const id = await this.get.id(device)

    const result = await http.request({ 
      url: `api.particle.io/v1/devices/${id}/${name}`, 
      auth: token, 
      data:{ arg: argument} 
    })

    return result.return_value
  }

  get get() {

    const id = async (name) => {
      const devices = await this.devices()
      for (let device of devices) {
        if (device.name === name) {
          return device.id
        }
      }
      return
    }

    return {
      id: id.bind(this)
    }
  }
}
