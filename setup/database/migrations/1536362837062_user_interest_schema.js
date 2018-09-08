'use strict'

const Schema = use('Schema')

class UserInterestSchema extends Schema {
  up () {
    this.create('user_interest', (table) => {
      table.increments()
      table.integer('user_id').references('id').inTable('user')
      table.integer('interest_id').references('id').inTable('interest')      
      table.enu('level', ['mild', 'normal', 'high'])
      table.integer('skill_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_interest')
  }
}

module.exports = UserInterestSchema
