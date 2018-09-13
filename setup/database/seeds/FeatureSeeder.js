'use strict'

/*
|--------------------------------------------------------------------------
| FeatureSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')

// Add feature comparisons with:  Meetup, Facebook Groups, Airbnb Experience, Online Dating, Wanderung, Internations 
class FeatureSeeder {
  async run () {
  	const features = await Database.table('feature').insert([
          {name: 'No Ads', description: 'We do not sell ads for the site'},
          {name: 'No Data Selling', description: 'We do not sell user subscription data to 3rd parties'},
          {name: 'Not for Profit', description: 'Our focus is on building community - not making a profit'},
          {name: 'Less Spam', description: 'User controls type of invites to be received and when they receive them'},
          {name: 'Single Registration', description: 'You only need to register once - not for every event of interest'},
          {name: 'Cross-Pollinate between multiple Interests', description: 'Find people with multiple interests in comon'},
          {name: 'User Control', description: 'Users have detailed control over the types of invitations they receive.  (connectedness of host, minimum points of interest, availability limitations, attendance ...)'},
          {name: 'Host Control', description: 'Hosts have detailed control over the types of participants that are invited (age group, interests, connectedness, gender balance, skill level ...)'},
          {name: 'Unassuming Singles Events', description: 'Meet like-minded Singles in a completely new way (or the old way) - in a natural environment with other people - none of whom have to sign up to a singles site'},
          {name: 'Easily adaptable to user preferences', description: 'It can be what you want it to be, whether it is to simply organize events for friends, meet new people, meet singles, professional networking'},
          {name: 'Money goes to hosts', description: 'Very low overhead, with 95% of money going to hosts organizing events'},
          {name: 'Free Events', description: 'Free events run as public service at no cost'},
          {name: 'Zero fee Built-in Ticketing', description: 'Ticketing provided at no cost to make organizing easier'},
          {name: 'Alternatives to FCFS', description: 'Random Lottery option for selecting invitees ensures you do not have to register right away.  Preference given to those previously failing to get on random lottery list'},
          {name: 'Collaboration with Local Venues', description: 'Collaborations are setup with local businesses to provide mutually beneficial discounts without gouging venue or host, and enabling hosts to benefit from easily accessible list of venues offering standard discounts'},
          {name: 'Incentives for Hosts', description: 'Aside from advanced participant control, hosts can make money by hosting quality events'},
          {name: 'Better Attendance Estimates', description: 'Pre-payment platform enables host to have greater confident in attendance levels, making it easier to organize'},
          {name: 'Host Review System', description: 'Host reviews encourage hosts to generate enjoyable events, and reduce liklihood of poor events'},
          {name: 'User Verification System', description: 'Various levels of user verification to increase level of comfort by hosts and other participants'},
          {name: 'User Controlled Profile Settings', description: 'Users control access to personal profile settings, and may use site anonymously if desired (though some events may only send out invites to public profiles)'},
          {name: 'Membership by Invitaion', description: 'Anyone may register, but full members must be invited by another active member and have their identify verified by another member, increasing accountability (Note that many events may be open to non-members as well to enable them to meet members so that they may get involved)'},
  	])
  	console.log('seeded features: ' + features)
  }
}

module.exports = FeatureSeeder
