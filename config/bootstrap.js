/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
const storage = require('node-persist');
module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  const defaultUsers = [
    { fullName: 'Julian Pachon', email: 'andres@mail.com',password: '0000'},
    { fullName: 'Andres Lopez', email: 'mail2@mail.com', password: '8520'}
  ]
  
  //init storage
  await storage.init( /* options ... */);

  //clear data persist
  await storage.clear();

  //generate data persist
  let listUsers = await storage.getItem('users');
  if (listUsers == undefined) {
      await storage.setItem('users', JSON.stringify(defaultUsers));
  }
  
};
