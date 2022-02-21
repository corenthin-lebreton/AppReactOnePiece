export class ShichibukaiProvider {
  shichibukai
  constructor() {
    this.shichibukai = this.getShichibukai()
  }

  save() {
    localStorage.setItem('spa-shichibukai', JSON.stringify(this.shichibukai))
  }

  load() {
    let datas = localStorage.getItem('spa-shichibukai')
    if (datas === null) datas = '[]'
    datas = JSON.parse(datas)
    this.shichibukai = datas
  }

  getShichibukai() {
    this.load()
    return this.shichibukai
  }

  add(shichibukai) {
    const id = Date.now()
    let tmp = { ...shichibukai }
    tmp.id = id
    this.shichibukai.push(tmp)
    this.save()
  }

  update(shichibukai) {
    const { id } = shichibukai
    let indice = -1
    for (let i = 0; i < this.shichibukai.length; i++)
      if (this.shichibukai[i].id === Number(id)) indice = i

    if (indice === -1) return false
    this.shichibukai[indice] = shichibukai
    this.save()
    return true
  }

  remove(shichibukai) {
    let indice = -1
    for (let i = 0; i < this.shichibukai.length; i++)
      if (this.shichibukai[i].id === Number(shichibukai.id)) indice = i

    if (indice === -1) return false

    this.shichibukai.splice(indice, 1)
    this.save()
    return true
  }

  getShichibukaiById(id) {
    let res = this.shichibukai.filter(
      shichibukai => shichibukai.id === Number(id)
    )
    return res.length === 0 ? false : res[0]
  }
}
