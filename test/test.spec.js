const expect = require('expect');
const loginPageOne = require('../src/functions/loginpageone.js');
const { firebase } = require('../src/digitalplatform/firebase.js')


describe('loginPageOne', () => {
  it('should be a function', () => {
    expect(typeof loginPageOne).toBe('function');
  });
});

describe('loginPageOne.signInWithEmailAndPassword', () => {
  it('should login with email and password', () => {
    firebase.auth().signInWithEmailAndPassword()(function () {
      expect(typeof user).toBe('object');
    });
    loginPageOne.signUp("beto@codev.com", "betocodev", firebase)
  });
}); 