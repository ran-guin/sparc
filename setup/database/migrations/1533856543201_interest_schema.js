'use strict'

const Schema = use('Schema')

class InterestSchema extends Schema {
  up () {
    this.create('interest', (table) => {
      table.increments()
      table.string('name')
      table.integer('parent_id')
      table.enu('status', ['active', 'proposed', 'inactive']).notNullable().defaultTo('active')
      table.text('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('interest')
  }
}

module.exports = InterestSchema
