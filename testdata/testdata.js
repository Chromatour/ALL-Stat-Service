const tournament1 = {
  username: 'Chroma',
  firstname: 'Niggel',
  surname: 'leissön',
  age: '22',
  guild: 'Skilta',
  university: 'Tuni',
  email: 'niggel.leisson@tuni.fi',
  password: 'morjenttes',
  roles: ['moderator', 'player'],
  registrationComplete: true,
  emailConfirmed: true,
};

const provider1 = {
  providerId: '3',
  callbackUrl: 'http://localhost:3000/allstats/router',
};

module.exports = {
  provider1,
  tournament1,
};
