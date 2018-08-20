'use strict'

const Model = use('Model')

class Interest extends Model {
  static get table () {
    return 'interest'
  }

}

module.exports = Interest
