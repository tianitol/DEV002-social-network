import { login } from "../src/lib/firebase/methodsAuth.js";
import { auth, signInWithEmailAndPassword } from "../src/init.js";

jest.mock('../src/init.js', () => {
    return {
        auth: jest.fn(() => {//la función fn crea una función interceptada por JEST
            return { auth: 'TEST' }
        }),
        signInWithEmailAndPassword: jest.fn((auth, email, password) => {
            if (!email || !password) {
                throw new Error('ERROR')
            }
            Promise.resolve({ user: 'Jhoann' })
        }),
        //siguiente funcion
    }
})

describe('Tests for the login function', ()=> {
    const email = "admin@test.com";
    const pass = "admin123";

    it('Should call signInWithEmailAndPasword', async()=> {
        await login(auth, email, pass)
        expect (signInWithEmailAndPassword).toHaveBeenCalled()
    })

    it('Shoul call signInWithEmailAndPassword', async()=>{
        await login(auth, email, pass)
        expect (signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, pass)
    })

    it('Should throw an error if executed without arguments', async() =>{
        try {
            await login()
        }
        catch(error){
            expect(error).toMatch('ERROR')
        }
    })
})

