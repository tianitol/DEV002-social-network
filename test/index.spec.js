// importamos la funcion que vamos a testear
import { createUserWithEmailAndPassword } from '../src/init.js';


 
describe('myFunction', () => {
  it('debería ser una función para registrar un usuario', () => {
    expect(typeof createUserWithEmailAndPassword).toBe('function');
  });
});
