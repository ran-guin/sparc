'use strict'

const Model = use('Model')

class Event extends Model {
  static get table () {
    return 'event'
  }
  interests () {
  return this
    .belongsToMany('App/Models/Event')
    .pivotTable('event_interest')
  }

}

module.exports = Event
