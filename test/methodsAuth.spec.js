import { logini, logOut, register, loginWithGoogle} from "../src/lib/firebase/methodsAuth.js";
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "../src/init.js";

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

        createUserWithEmailAndPassword: jest.fn((auth, email, password) => {
            if (!email || !password) {
                throw new Error('ERROR')
            }
            Promise.resolve({ userCredential: 'Jhoann' })
        }),

        signOut: jest.fn((auth) => {
            if (!auth)
                return Promise.reject('no auth parameter')
        }),

        // const provider = new GoogleAuthProvider()
        signInWithPopup: jest.fn((auth, GoogleAuthProvider) => {
            if (!auth) {
                throw new Error('ERROR')
            }
            Promise.resolve({ user: 'Jhoann' })
        }),
        //siguiente funcion
    }
})

describe('Tests for the logini function', () => {
    const email = "admin@test.com";
    const pass = "admin123";

    it('Should call signInWithEmailAndPasword', async () => {
        await logini(auth, email, pass)
        expect(signInWithEmailAndPassword).toHaveBeenCalled()
    })

    it('Shoul call signInWithEmailAndPassword', async () => {
        await logini(auth, email, pass)
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, pass)
    })

    it('Should throw an error if executed without arguments', async () => {
        try {
            await logini()
        }
        catch (error) {
            expect(error).toMatch('ERROR')
        }
    })
})

describe('Tests for the register function', () => {
    const email = "admin@test.com";
    const pass = "admin123";

    it('Should call signInWithEmailAndPasword', async () => {
        await register(auth, email, pass)
        expect(createUserWithEmailAndPassword).toHaveBeenCalled()
    })

    it('Shoul call signInWithEmailAndPassword', async () => {
        await register(auth, email, pass)
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, pass)
    })

    it('Should throw an error if executed without arguments', async () => {
        try {
            await register()
        }
        catch (error) {
            expect(error).toMatch('ERROR')
        }
    })
})


describe('Tests for the logOut function', () => {

    it('Should call signOut', async () => {
         logOut(auth)
        expect(signOut).toHaveBeenCalled()
    })

    it('Shoul call signOut',  () => {
         logOut(auth)
        expect(signOut).toHaveBeenCalledWith(auth)
    })

    it('Should throw an error if executed without arguments', async () => {
        try {
              await logOut()
             //expect().toBe(false)
        }
        catch (error) {
            expect(error).toBe('no auth parameter')
        }
    })
})


describe('Tests for the loginWithGoogle function', () => {
    const email = "admin@test.com";
    const pass = "admin123";

    // it('Should call signInWithPopup', async () => {
    //     await loginWithGoogle(auth)
    //     expect(signInWithPopup).toHaveBeenCalled()
    // })

    // it('Shoul call signInWithPopup', async () => {
    //     await loginWithGoogle(auth)
    //     expect(signInWithPopup).toHaveBeenCalledWith(auth, GoogleAuthProvider)
    // })

    it('Should throw an error if executed without arguments', async () => {
        try {
            await loginWithGoogle()
        }
        catch (error) {
            expect(error).toMatch('ERROR')
        }
    })
})
