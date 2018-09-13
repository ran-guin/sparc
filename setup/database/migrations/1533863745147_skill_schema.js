'use strict'

const Schema = use('Schema')

class SkillSchema extends Schema {
  up () {
    this.create('skill', (table) => {
      table.increments()
      table.string('name',63).notNullable()
      table.integer('interest_id').unsigned().notNullable().index('interest_id')
      table.foreign('interest_id').references('interest.id').onDelete('cascade')
      table.integer('level').unsigned().default(1)
      table.string('description',255)
      table.timestamps()
    })
  }

  down () {
    this.drop('skill')
  }
}

module.exports = SkillSchema
