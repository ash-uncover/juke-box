import * as StringUtils from './StringUtils'

class StringLabel {

  private _value: string
  private _words: string[]

  constructor (value: string, separator: string = ' ') {
    this._value = value
    this._words = value.split(separator).map(w => w.toLowerCase()).filter(w => Boolean(w))
  }

  get words () {
    return this._words
  }

  get camel () {
    return this.words.map((w, index) => (index === 0 ? w : StringUtils.capitalize(w))).join('')
  }

  get pascal () {
    return this.words.map(w => StringUtils.capitalize(w)).join('')
  }

  get worm () {
    return this.words.map(w => w.toLowerCase()).join('_')
  }

  get snake () {
    return this.words.map(w => StringUtils.capitalize(w)).join('_')
  }

  get serpent () {
    return this.words.map(w => w.toUpperCase()).join('_')
  }
}

export default StringLabel