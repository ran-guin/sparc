export default {
  setup: [
    'Register as a member (free)',
    'Indicate interests and the types of activities you like to do',
    'Indicate experience / skill level if applicable',
    'Find current event postings or just sit back and await invitations'
  ],
  hosting: [
    'Ensure you are a validated member (all hosts must have their identity and contact information validated)',
    'Create an event and pick one or more primary activities that define your event',
    'Optionally specify secondary interests to target members with similar passions',
    'Indicate minimum and/or maximum attendance numbers along with a signup deadline',
    'Optionally specify advanced options for your event (eg gender balanced, selection by lottery etc)',
    'Submit your event (this will save your event and tell you how many invitations will be sent out',
    'Adapt filtering criteria if desired to raise or lower invitation numbers',
    'Publish Event (this will send out invitations to applicable members)',
    'Confirm attendance prior to the event',
    'Have fun',
    'Provide feedback on guest attendance and identity'
  ],

  forms: {
    'event_filters': [
      {name: 'gender_balanced', type: "enum('No', 'Passive', 'Active')"},
      {name: 'signup_strategy', type: "enum('FCFS','Lottery')"},
      {name: 'connectivity', type: "enum('connected','fof','fofof','dynamically connected','unconnected','minimize connections')"}
    ],
    'event': [
      { name: 'Title', type: 'varchar' },
      { name: 'Start', type: 'date' },
      { name: 'End', type: 'date' },
      { name: 'Deadline', type: 'date' },
      { name: 'Min_number', type: 'number' },
      { name: 'Max_number', type: 'number' },
      { name: 'Status', type: 'hidden', default: 'pending' }
    ]
  },
  demo_interests: [
    {id: 1, 'name': 'sport', 'parent_id': null, selected: true},
    {id: 2, 'name': 'social', 'parent_id': null, selected: true},
    {id: 3, 'name': 'cultural', 'parent_id': null, selected: true},
    {id: 4, 'name': 'running', 'parent_id': 1, selected: true},
    {id: 5, 'name': 'biking', 'parent_id': 1, selected: true},
    {id: 6, 'name': 'climbing', 'parent_id': 1},
    {id: 7, 'name': 'trail', 'parent_id': 4, selected: true},
    {id: 8, 'name': '5k', 'parent_id': 4, selected: true, skill_level: '20 min'},
    {id: 9, 'name': '10k', 'parent_id': 4},
    {id: 10, 'name': 'marathon', 'parent_id': 4, selected: true},
    {id: 11, 'name': 'touring', 'parent_id': 5, selected: true},
    {id: 12, 'name': 'road', 'parent_id': 5, selected: true},
    {id: 13, 'name': 'mountain', 'parent_id': 5, selected: true},
    {id: 14, 'name': 'trad', 'parent_id': 6},
    {id: 15, 'name': 'sport climbing', 'parent_id': 6},
    {id: 16, 'name': 'gym climbing', 'parent_id': 6},
    {id: 17, 'name': 'dinner parties', 'parent_id': 2, selected: true},
    {id: 18, 'name': 'potlucks', 'parent_id': 17, selected: true},
    {id: 19, 'name': 'hosted', 'parent_id': 17, selected: true},
    {id: 20, 'name': 'board games', 'parent_id': 2, selected: false},
    {id: 21, 'name': 'Settlers of Cataan', 'parent_id': 20, selected: false},
    {id: 22, 'name': 'Scrabble', 'parent_id': 20, selected: false},
    {id: 23, 'name': 'museum', 'parent_id': 3, selected: true},
    {id: 24, 'name': 'art gallery', 'parent_id': 3, selected: true},
    {id: 25, 'name': 'ballet', 'parent_id': 3, selected: true},
    {id: 26, 'name': 'opera', 'parent_id': 3, selected: true},
    {id: 27, 'name': 'dancing', 'parent_id': 2, selected: true},
    {id: 28, 'name': 'swing', 'parent_id': 27, selected: true},
    {id: 29, 'name': 'blues', 'parent_id': 27, selected: true},
    {id: 30, 'name': 'club', 'parent_id': 27, selected: true},
    {id: 31, 'name': 'sports (watching)', 'parent_id': 2, selected: true},
    {id: 32, 'name': 'philosophy', 'parent_id': 3, selected: true},
    {id: 33, 'name': 'politics', 'parent_id': 3, selected: true},
    {id: 34, 'name': 'science', 'parent_id': 3, selected: true},
    {id: 35, 'name': 'hockey', 'parent_id': 31, selected: true},
    {id: 36, 'name': 'football (American)', 'parent_id': 31, selected: true},
    {id: 37, 'name': 'football (European)', 'parent_id': 31, selected: true},
    {id: 38, 'name': 'basketball', 'parent_id': 31}
  ],
  demo_events: [
    {id: 1, name: 'Potluck', description: 'description of potluck', location: 'Toronto, ON', interests: 'dinner parties, philosophy'},
    {id: 2, name: 'Dancing', description: 'description of dance', location: 'Vancouver', skills: 'Dancing: intermediate'}
  ],
  demo_differences: [
    'anyone can host events (once they are verified members)',
    'advance payment options can make it easier for hosts to estimate accurate attendance',
    'ability to flag or favourite other members, hosts, or events improves likelihood for positive experiences',
    'events can combine multiple interests and activities increasing compatibility of participants',
    'members only receive invitations that apply to their specified interests reducing unwanted spam invites',
    'participants do not need to join a distinct group for each of their interests',
    'advanced filtering enables higher compatibility among participants',
    'events can include filtering for experience level to enable more compatible skill levels',
    'multi-level user verification process improves accountability of members for greater comfort level'
  ],
  demo_hostIdeas: [
    {
      name: 'Host a dinner party (and get paid)',
      example: 'Invite only Spanish-speaking people who enjoy political discussions',
      description: 'Like cooking or hosting?  Host dinner parties and get paid for your effort and have a great time in the meantime.  These can also be combined with other social gathering ideas (potlucks, conversational topics, theme parties, boardgames etc)'
    },
    {
      name: 'Teach a yoga class',
      example: 'Optionally target people who like a particular type of yoga and/or those at a specified level',
      description: 'Organize a small yoga class.  Classes may have fixed cost or be by donation'
    },
    {
      name: 'Plan an outing to a play',
      example: 'Find strangers who share similar interests who also happen to enjoy plays',
      description: 'If you are new in town, or your friends are not interested in the same cultural events that you are, this encourages you to go out and experience cultural events in the city with a group of like-minded people -  whether you are looking for a date or want to organize a large group to attend a show.'
    },
    {
      name: 'Organize a hike',
      example: 'Invite only inexperienced hikers who enjoy photography to do a casual photo walk',
      description: 'Organize short or long hiking trips.  These can also be easily combined with interest filtering so that you find hiking partners that have some similar interests'
    },
    {
      name: 'Put together a karaoke night',
      example: 'Organize a karaoke evening for 8 people who are in grad school',
      description: 'Host almost any social activity you can think of and filter to attract like-minded people'
    }
  ],
  demo_ideas: [
    {
      name: 'Eat out with like-minded people',
      example: 'You can choose to only get invites from people you know or with similar interests',
      description: 'Join other members for dinner'
    },
    {
      name: 'Go see a show',
      example: 'Find people with multiple shared interests',
      description: 'If you are new in town, find others going to a movie or concert that have some similar interests'
    },
    {
      name: 'Go for a hike',
      example: 'Organize a small local hike for up to 6 people who want to practice their Spanish, and speak at an intermediate level',
      description: 'Join others for a local hike'
    },
    {
      name: 'Meet other singles',
      example: 'Any of the above ideas can be targetted to singles (either loosely or strictly)',
      description: 'Find events that are targetted to like-minded singles.  Only get invites for the types of events you enjoy'
    }
  ],
  demo_filter: [
    {event_id: 1, min_age: 30, max_age: 45, gender: 'F'}
  ],
  interest_overlap: [
    {event_id: 1, interest: 'dinner parties', interest_id: 17},
    {event_id: 1, interest: 'philosophy', interest_id: 32},
    {event_id: 1, interest: 'running', interest_id: 4}
  ],
  skill_requirement: [
    {event_id: 1, skill_id: 3}
  ],
  demo_skills: [
    {id: 1, interest: 'running', interest_id: 4, 'skill': 'complete newbie', 'level': 1},
    {id: 2, interest: 'running', interest_id: 4, 'skill': 'beginner', 'level': 2},
    {id: 3, interest: 'running', interest_id: 4, 'skill': 'intermediate', 'level': 3},
    {id: 4, interest: 'running', interest_id: 4, 'skill': 'advanced', 'level': 4},
    {id: 5, interest: 'running', interest_id: 4, 'skill': 'elite', 'level': 5},
    {id: 6, interest: 'sport climbing', interest_id: 15, 'skill': 'complete newbie', 'level': 1},
    {id: 7, interest: 'sport climbing', interest_id: 15, 'skill': '< 5.9', 'level': 2},
    {id: 8, interest: 'sport climbing', interest_id: 15, 'skill': '50', 'level': 3},
    {id: 9, interest: 'sport climbing', interest_id: 15, 'skill': '5.11', 'level': 4},
    {id: 10, interest: 'sport climbing', interest_id: 15, 'skill': '5.12', 'level': 5},
    {id: 11, interest: 'sport climbing', interest_id: 15, 'skill': '5.13+', 'level': 6},
    {id: 12, interest: 'sport climbing', interest_id: 15, 'skill': 'top-rope', 'level': 1},
    {id: 13, interest: 'sport climbing', interest_id: 15, 'skill': 'lead', 'level': 2},
    {id: 14, interest: 'dancing', interest_id: 27, 'skill': 'intermediate', 'level': 2}
  ]
}
