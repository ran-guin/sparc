export default {
  apiURL: 'http://localhost:3333',
  apiHeader: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},

  overview: [
    'Meet like-minded people',
    'Organize events for friends',
    'Organize events for strangers',
    'Attend events targetting your individual passioins'
  ],
  setup: [
    'Register as a member (free)',
    'Indicate interests and the types of activities you like to do',
    'Find current event postings or just sit back and await invitations'
  ],
  hosting: [
    'Ensure you are a validated member (all hosts must have their identity and contact information validated)',
    'Create an event - with many options to help target members with similar passions',
    'Save your event (this will tell you how many invitations will be sent out, so you can change the filtering options above if desired to raise or lower the invitation numbers)',
    'Publish Event (this will send out invitations to applicable members)',
    'Have fun',
    'Provide feedback to confirm guest attendance (and identity of newer members)'
  ],

  forms: {
    'event_filters': [
      { name: 'gender_balanced', type: "enum('No', 'Passive', 'Active')" },
      { name: 'signup_strategy', type: "enum('FCFS','Lottery')" }
    ],
    'eventBasics': [
      { name: 'Title', type: 'varchar' },
      { name: 'Description', type: 'text' },
      { name: 'Start', type: 'date' },
      { name: 'End', type: 'date' },
      { name: 'Location', type: 'text' }
    ],
    'eventDetails': [
      { name: 'connectivity', type: "enum('favourites','fof','fofof','unconnected')" },
      { name: 'Signup Deadline', type: 'date' },
      { name: 'Min_number', type: 'integer', default: 2 },
      { name: 'Max_number', type: 'integer' },
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
    {id: 10, 'name': 'marathon', 'parent_id': 4, selected: true, skill_level: '?'},
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
    {id: 25, 'name': 'ballet', 'parent_id': 3, selected: false},
    {id: 26, 'name': 'opera', 'parent_id': 3, selected: false},
    {id: 27, 'name': 'dancing', 'parent_id': 2, selected: true},
    {id: 28, 'name': 'swing', 'parent_id': 27, selected: true},
    {id: 29, 'name': 'blues', 'parent_id': 27, selected: true},
    {id: 30, 'name': 'club', 'parent_id': 27, selected: true},
    {id: 31, 'name': 'sports (watching)', 'parent_id': 2, selected: false},
    {id: 32, 'name': 'philosophy', 'parent_id': 3, selected: true},
    {id: 33, 'name': 'politics', 'parent_id': 3, selected: true},
    {id: 34, 'name': 'science', 'parent_id': 3, selected: true},
    {id: 35, 'name': 'hockey', 'parent_id': 31, selected: true},
    {id: 36, 'name': 'football (American)', 'parent_id': 31, selected: true},
    {id: 37, 'name': 'football (European)', 'parent_id': 31, selected: true},
    {id: 38, 'name': 'basketball', 'parent_id': 31}
  ],
  demo_events: [
    {id: 1, name: 'Potluck', description: 'description of potluck', location: 'Toronto, ON', interests: 'dinner parties, philosophy', image: 'potluckWide.jpg'},
    {id: 2, name: 'Dancing', description: 'description of dance', location: 'Vancouver', skills: 'Dancing: intermediate', image: 'dancing.jpg'}
  ],
  demo_invites: [
    {id: 5, name: 'Dinner Party', description: 'description of art gallery event', location: 'Toronto, ON', interests: 'dinner, travel, discussion', image: 'mingle.jpg'},
    {id: 5, name: 'Bike Ride', description: 'description of art gallery event', location: 'Toronto, ON', interests: 'bike touring, travel', image: 'bike.png'},
    {id: 3, name: 'Art Gallery', description: 'description of art gallery event', location: 'Toronto, ON', interests: 'modern art, discussion', image: 'art.png'},
    {id: 4, name: 'Flash Mob', description: 'description of dance', location: 'Vancouver', skills: 'Dancing: intermediate', interests: 'Spontaneity, Flash mobs', image: 'dancing.jpg'},
    {id: 6, name: 'Singles book club', description: 'description of dance', location: 'Vancouver', interests: 'book club, dinner, single events', image: 'singles.png'}
  ],
  demo_differences: {
    Accessibility: [
      'registration is completely free of charge',
      'participants do not need to join a distinct group for each of their interests',
      'provides good targeted exposure for local community events (eg gallery openings, local theatre)',
      'anyone can host events (once they are fully verified members)',
      'although membership is by invitation, many public events are available for guest members so they can easily become connected'
    ],
    Filtering: [
      'advanced filtering enables higher compatibility among participants',
      'events can combine multiple interests and activities increasing compatibility of participants',
      'members only receive invitations that apply to their specified interests and event preferences reducing unwanted spam invites',
      'events can include filtering for experience level to enable more compatible skill levels',
      'users have a lot of control over the types of invitations they receive and when they receive them (see filtering)'
    ],
    Features: [
      'advance payment options can make it easier for hosts to estimate accurate attendance',
      'service fees (including built in ticketing system) are capped at 0-5% ensuring almost all money raised goes to hosting members',
      'collaborations with local restaurants & cafes provide mutual benefit',
      'invitation-based membership reduces inappropriate users or trolls',
      'multi-level user verification process and host reviews improves accountability of members & hosts for greater comfort level for everyone',
      'ability to flag or favourite other members, hosts, or events increases control, and improves likelihood for positive experiences'
    ]
  },
  examples: {
    reasons: [
      {
        name: 'Connect with existing friends',
        description: 'If you like you can simply receive invites only from friends.  The advantage of doing it here is that you might have friends that have similar interests that you are not aware of.  For instance, you may have hiking friends that also happen to like boardgames or salsa dancing.  Now if any of your friends hosts a boardgame night or a salsa dancing outing then you will automatically be invited even though they did not even know you were into that sort of thing.'
      },
      {
        name: 'Connect with friends of friends',
        description: 'You may still be wary of attending events with strangers, but you can also expand the invites you receive to friends of friends.  This enables you to meet people that you do not know that are connected to you through mutual friends.  It may turn out that some of them have a lot of similar interests as well!'
      },
      {
        name: 'Meet new people',
        description: 'If you do not limit your invitations to friends (or friends of friends) then you will receive invitations from anyone who happens to be hosting an event that you are interested in, allowing you to meet new people - often with multiple interests in common'
      },
      {
        name: 'Meet people with multiple interests in common',
        description: 'Since most events are tied to multiple interests, you are much more likely to form deep connections with other participants than you would for single topic events.  You can even indicate the minimum number of similar interests indicated before you are invited.  (For example you could avoid invites for basic hikes, but receive invites for hikes that also target participants who are interested in photography and adventure travel'
      },
      {
        name: 'Meet singles in a non-intimidating atmosphere',
        description: 'This is an excellent way to meet other single people with similar interests in natural environment - doing things that you enjoy.  Because they are group events, you meet a number of people without being put on the spot with someone one-on-one, and you get to see how people interact socially with others.  Also, since registrants are simply indicating singles events as one in a long list of interests, there is a good chance to meet single people who are not signed up to an online dating site.  Singles events will also usually be specifically gender balanced so that attendance numbers are essentially equal between men and women'
      },
      {
        name: 'Organize your own activities',
        description: 'Because it is so easy to become a host, and you have access to people with lots of diverse interests, you can easily start organizing things that you want to do and do not have to worry about who you know that would like to participate.  Whether you choose to invite friends, friends of friends, or strangers, the invitations are sent out automatically based simply upon your filtering criteria'
      },
      {
        name: 'Know how many people are coming to your events!',
        description: 'One frustating aspect of organizing events can be not knowing how many people are going to show up.  This is particularly annoying when you need to reserve a table to make some payments in advance.  We encourage hosts to post events which require advance payment - even if only a few bucks.  Sure some people may prefer not to commit, but the ones that sign up are likely to be more eager to take part and it makes things a lot easier to organize.'
      },
      {
        name: 'Reach people more easily for more unusual events',
        description: 'Uncommon events can be difficult to advertise for, but SPARC enables you to automatically target everyone with specific interests'
      }
    ],
    hosting: [
      {
        name: 'Host a dinner party (and get paid)',
        example: 'Invite only Spanish-speaking people who enjoy political discussions and dinner parties',
        description: 'Like cooking or hosting dinner parties?  Cook up a multi-course feast and get paid for your effort and have a great time in the meantime.  These can also be combined with other social gathering ideas (potlucks, conversational topics, theme parties, boardgames etc)'
      },
      {
        name: 'Organize a flash mob!',
        example: 'Target local members who can dance and who are open to spontaneity',
        description: 'Easily connects people who are interested in the type of event you would like to organize, and facilitates an easy communication thread to organize the event'
      },
      {
        name: 'Teach a yoga class',
        example: 'Optionally target people who like a particular type of yoga and/or those at a specified level',
        description: 'Organize a small yoga class in your spare time.  Classes may have fixed cost or be by donation'
      },
      {
        name: 'Plan an outing to a play',
        example: 'Find strangers who also like plays and optionally share other similar interests',
        description: 'Meet new people who share multiple common interests in a group environment'
      },
      {
        name: 'Organize a hike',
        example: 'Invite only inexperienced hikers who enjoy photography to do a casual photo walk',
        description: 'Find like-minded people of similar experience level to take part in activities you enjoy'
      },
      {
        name: 'Put on a community arts event',
        example: 'generate targetted invites to members with specific or esoteric interests',
        description: 'Get great exposure for arts & music events in your local community'
      },
      {
        name: 'Support local restaurants & cafes',
        example: 'host events at collaborating restaurants for discounts',
        description: 'Mutual monetary benefit goes almost entirely to participants and collaborating shops which benefit from exposure and increased clientelle'
      }
    ],
    participating: [
      {
        name: 'Meet like-minded people',
        example: 'You can choose to only get invites from people you know or with similar interests',
        description: 'Keep on top of events you are interested in that your friends (or friends of friends) are attending'
      },
      {
        name: 'Avoid having to go out alone',
        example: 'Find people with multiple shared interests',
        description: 'If you are new in town, get out and meet other people going to a movie, concert, or dinner that have some similar interests'
      },
      {
        name: 'Exercise your mind and body at the same time',
        example: 'Organize a small local hike for up to 6 people who want to practice their Spanish, and speak at an intermediate level',
        description: 'Meet activity partners that you connect with on multiple levels'
      },
      {
        name: 'Develop close friendships & relationships',
        example: 'The multi-dimensional nature of most events fosters deep connections through multiple common interests & values',
        description: 'You control the level of connectivity that you feel comfortable with, and the how extended a community to interact with so that you can expand or deepen your social circle at your own pace'
      },
      {
        name: 'Connect with community for support',
        example: 'Connect with volunteers, counselors, and others dealing with challenges like you',
        description: 'Attend support sessions for people dealing with similar issues (eg new moms, breakups, grieving or depression)'
      }
    ],
    'common themes': [
      {
        name: 'Avoid cooking alone',
        description: 'Cook simple meals together in small groups (2-4).  Intended to be very simple meals simply intended to reduce the monotony and isolation of prepping, cooking, eating & cleaning alone.'
      },
      {
        name: 'Themed Dinner Hosting (paid)',
        description: 'Like cooking or hosting dinner parties?  Cook up a multi-course feast and get paid for your effort and have a great time in the meantime.  These can also be combined with other social gathering ideas (potlucks, conversational topics, theme parties, boardgames etc)'
      },
      {
        name: 'Social conversation (philosphy cafe plus)',
        description: "Connect with friends and/or strangers for fascinating discussions on a variety of subjects over dinner, drinks, public talks, or just in someone's living room"
      },
      {
        name: 'Movie club plus',
        description: 'Watch films in a particular genre, with an emphasis on discussion afterwards over dinner or drinks'
      },
      {
        name: 'Alternative to traditional Online Dating',
        description: 'Old school events bringing together like-minded strangers within a specified age group to socialize together around common activities of interest.  This is a much more organic and less intimidating way of meeting people in person who are not specifically signing up for a dating website'
      }
    ]
  },
  filters: {
    Participant: [
      {name: 'min_connections', description: 'Only invite me to events that meet at least N interests that I have chosen'},
      {name: 'min_attendance', description: 'Only invite me to events that have a minimum of N people attending'},
      {name: 'max_attendance', description: 'Do not invite me to events that have a max_attendance of more than N people'},
      {name: 'max_distance', description: 'Only invite me to events within N km of my location (defaults to 10 km)'},
      {name: 'host', description: 'Only invite me to events hosted by specific people (connections, favourites etc)'},
      {name: 'availability', description: 'Only invite me to events happening on specific days of the week and/or times'},
      {name: 'advance_notice', description: 'Only invite me to events with a minimum number of days advance notice'},
      {name: 'invitation_format', description: 'Option to turn off invitations, or request only weekly invite summary rather than individual invitations.  (though users may still search for events themselves)'}
    ],
    Event: [
      {name: 'gender', description: 'specify gender for participants'},
      {name: 'min_age', description: 'specify a minimum age for participants (will not invite people with unspecified birthdates)'},
      {name: 'max_age', description: 'specify a minimum age for participants (will not invite people with unspecified birthdates)'},
      {name: 'min_connections', description: 'only invite people that have a minimum of N interests within specified list'}
    ]
  },
  options: [
    {user: ['invites']}
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
