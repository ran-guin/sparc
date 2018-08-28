'use strict'

const Env = use('Env')
const Helpers = use('Helpers')
const Config = use('Config')

module.exports = {
  database: {
    upload: {
      // specify explicit list of tables that can be updated, along with default field validation requirements  (for security)
      // keys = table name (lower case);  values = validation ( eg { name: 'required|min:3|max:10'} )
      'event' : { title: 'required|min:3|max:64' },
    },

    search: {
      // specify explicit list of tables that can be searched, along with default fields accessible  (for security)
      // keys = table name (lower case);  values = hash of options (fields: array, joins, array of arrays)
      'event' : {
        fields: [
          '.id',
          'event.name',
          'event.description',
          'event.cost'
        ],
        joins: [
          ['user', 'event.host', 'user.id'],
          ['interest', 'event.interest_id', 'interest.id']
        ]
      },
      'interest' : {
        fields: [
          'interest.name',
          'interest.description',
        ],
        joins: [
        ]
      }

      // other options :
      // rawFields: ['group_concat(disease.name) as coverage']
      // groupBy: ['vaccine_id']
    }
  }
}
