db = require('../config/connection')
const promise = require('promise')
const bcrypt = require('bcrypt');
const collection = require("../config/collection")


module.exports = {
    signUp: (user) => {
        return new promise(async (resolve, reject) => {
            oldUser = await db.get().collection(collection.User_Collection).findOne({ email: user.email })
            if (oldUser) {
                
                console.log('already user')
                resolve({ status:false})
            }
            else {

                const saltRounds = 10;

                user.password = await bcrypt.hash(user.password, saltRounds)
                user.confirm_password = await bcrypt.hash(user.confirm_password, saltRounds)

                db.get().collection(collection.User_Collection).insertOne(user).then((data) => {
                    console.log(data)
                    resolve({data,status:true})
                })
            }

        })
    }
}