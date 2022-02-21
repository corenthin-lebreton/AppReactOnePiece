export class PiratesProvider {
  pirates
  constructor() {
    this.pirates = this.getPirates()
  }

  save() {
    localStorage.setItem('spa-pirates', JSON.stringify(this.pirates))
  }

  load() {
    let datas = localStorage.getItem('spa-pirates')
    if (datas === null) datas = '[]'
    datas = JSON.parse(datas)
    this.pirates = datas
  }

  getPirates() {
    this.load()
    return this.pirates
  }

  add(pirate) {
    const id = Date.now()
    let tmp = { ...pirate }
    tmp.id = id
    this.pirates.push(tmp)
    this.save()
  }

  update(pirate) {
    const { id } = pirate
    let indice = -1
    for (let i = 0; i < this.pirates.length; i++)
      if (this.pirates[i].id === Number(id)) indice = i

    if (indice === -1) return false
    this.pirates[indice] = pirate
    this.save()
    return true
  }

  remove(pirate) {
    let indice = -1
    for (let i = 0; i < this.pirates.length; i++)
      if (this.pirates[i].id === Number(pirate.id)) indice = i

    if (indice === -1) return false

    this.pirates.splice(indice, 1)
    this.save()
    return true
  }

  getPirateById(id) {
    let res = this.pirates.filter(pirate => pirate.id === Number(id))
    return res.length === 0 ? false : res[0]
  }
}
