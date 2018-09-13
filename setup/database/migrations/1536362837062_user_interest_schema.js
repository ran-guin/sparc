'use strict'

const Schema = use('Schema')

class UserInterestSchema extends Schema {
  up () {
    this.create('user_interest', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable().index('user')
      table.foreign('user_id').references('user.id').onDelete('cascade')
      table.integer('interest_id').unsigned().notNullable().index('interest')     
      table.foreign('interest_id').references('interest.id').onDelete('cascade')      
      table.enu('level', ['mild', 'normal', 'high'])
      table.integer('skill_id').unsigned().notNullable().index('skill')
      table.foreign('skill_id').references('skill.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_interest')
  }
}

module.exports = UserInterestSchema
