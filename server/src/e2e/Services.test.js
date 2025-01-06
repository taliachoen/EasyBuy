const { createApp, createAppE2E } = require("../createApp");
const UserServices = require("../service/user.service");


// Service
describe("Test All User Services",() => {

    beforeAll(() => {
        createAppE2E();
    })
    
    test("test GetAllUsers Service",async () => {
 
       const result = await UserServices.getAllUsers();

       console.log(result)
    })
})