'use strict'

const Model = use('Model')

class EventInterest extends Model {
  static get table () {
    return 'event_interest'
  }

}

module.exports = EventInterest
