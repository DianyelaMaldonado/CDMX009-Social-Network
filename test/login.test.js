
/*
describe('example', () => {
  it('debería ser una función', () => {
    expect(typeof example).toBe('function');
  });
}); */

//import * as auth from '.auth.js'


 import { loginPageOne } from '../src/functions/loginpageone.js';


global.firebase = {
  auth: jest.fn(() => ({
    emailAndPasswordUser: jest.fn(() => new Promise((resolve, reject) => {
      resolve(true)
  }))
}))
}

test('login confirmation', () => {
  let email = "bernardinoveronica@gmail.com"
  let pass = "Veronica1987"

  expect(auth.login(email, pass)).toBe('It has no any special character');
  expect(auth.login('', pass)).toBe('Invalid email or password');
});

test('login is carry out correctly', () => {
  let email = "bernardinoveronica@gmail.com"
  let pass = "Veronica1987"

  auth.login(email, pass).then(valor => {
    expect(valor).toBe(true)
  });
});

