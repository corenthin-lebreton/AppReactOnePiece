export class MarinesProvider {
  marines
  constructor() {
    this.marines = this.getMarines()
  }

  save() {
    localStorage.setItem('spa-marines', JSON.stringify(this.marines))
  }

  load() {
    let datas = localStorage.getItem('spa-marines')
    if (datas === null) datas = '[]'
    datas = JSON.parse(datas)
    this.marines = datas
  }

  getMarines() {
    this.load()
    return this.marines
  }

  add(marine) {
    const id = Date.now()
    let tmp = { ...marine }
    tmp.id = id
    this.marines.push(tmp)
    this.save()
  }
  update(marine) {
    const { id } = marine
    let indice = -1
    for (let i = 0; i < this.marines.length; i++)
      if (this.marines[i].id === Number(id)) indice = i

    if (indice === -1) return false
    this.marines[indice] = marine
    this.save()
    return true
  }

  remove(marine) {
    let indice = -1
    for (let i = 0; i < this.marines.length; i++)
      if (this.marines[i].id === Number(marine.id)) indice = i

    if (indice === -1) return false

    this.marines.splice(indice, 1)
    this.save()
    return true
  }

  getMarineById(id) {
    let res = this.marines.filter(marine => marine.id === Number(id))
    return res.length === 0 ? false : res[0]
  }
}