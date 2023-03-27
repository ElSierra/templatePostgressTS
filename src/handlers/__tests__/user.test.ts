import * as user from '../user'

describe('user handler', ()=>{
    it('should do create a new user', async()=>{
        const req = {body:{username: 'hello', password: 'hi'}}
        const res = {json({token}: any){
            expect(token).toBeTruthy()
        }}
    await user.createNewUser(req,res,()=>{})
    })
})