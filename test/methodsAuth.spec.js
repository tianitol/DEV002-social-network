import { login } from "../src/lib/firebase/methodsAuth";
import { auth, signInWithEmailAndPassword } from "../src/init";

jest.mock('../src/init', () => {
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
    const email = "jhoannarmd@gmail.com";
    const pass = "jhoanna123";

    it('Should call signInWithEmailAndPasword', async()=> {
        await login(email, pass)
        expect (signInWithEmailAndPassword).toHaveBeenCalled()
    })

    it('Shoul call signInWithEmailAndPassword', async()=>{
        await login(email, pass)
        expect (signInWithEmailAndPassword).toHveBeenCalledWith(auth, email, pass)
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

