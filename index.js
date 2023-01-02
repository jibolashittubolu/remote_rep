// import express from "express";
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const createError = require('./utils/createError.js')

// import cors from 'cors'

const app = express();
const PORT = 5000;

app.use(cors())
app.use(express.json());
dotenv.config();


const posts = [
  {
    username: 'Yemi',
    title: 'Post 1',
    description: 'Your access key is 111222'
  },
  {
    username: 'Kunle',
    title: 'Post 2',
    description: 'Your access key is 222333'
  },
  {
    username: 'Afolabi',
    title: 'Post 3',
    description: 'Your access key is 333444'
  },
  {
    username: 'admin',
    title: 'Post 4 by admin',
    description: 'Your access key is admin'
  }
]

const emails= ['a@a.com', 'admin@admin.com', 'b@b.com', 'admin', 'a', 'b']
const passwords = {
  "a@a.com": 'a', 
  "admin@admin.com": 'admin', 
  "b@b.com": 'b', 
  "admin": "admin",
  "a": "a",
  "b": "b"
}
// const passwords = {
//   {"a@a.com": 'a', 
//   {"admin@admin.com": 'admin'}, 
//   {"b@b.com": 'b'}, 
//   {"admin": "admin"}
// }

app.post('/api/login', async (req, res, next) => {
  try{

    const supplied_email = req.body?.email;
    if(!supplied_email){
      return next(createError(400, '1 please provide an email, bad request', 1))
      // return res.status(400).json('please provide an email, bad request')
    }

    const password = req.body?.password;
    if(!password){
      return next(createError(400, '2 please provide a valid password ', 2))
    }

    if( !(emails.includes(supplied_email)) ) { 
      return next(createError(400, '3 mail not found in db ', 3))
    }


    if( !(passwords[supplied_email]) ) { 
      return next(createError(400, '4 password is invalid ', 4))
    }

    return next(createError(200,`5 Welcome, ${supplied_email}` , 5))
  }
  catch(err){
    return next(createError(200,'64 An error occurred during authentication' , 6))
  }

})

const mail_access_keys = ['111222', '222333', '333444', 'Mazi', 'admin']
app.post('/api/test_api', async (req, res, next) => {
  try{
    const supplied_access_key = req.body?.accessKey;
    // console.log(supplied)
    if(!supplied_access_key){
      return next(createError(400, '142 please provide a valid dummy access key '))
    }

    if( !(mail_access_keys.includes(supplied_access_key)) ) { 
      return next(createError(400, '143 access key is invalid '))
    }
    //below means accessKey is valid

    //*check if email is supplied
    const supplied_email = req.body?.email;
    if(!supplied_email){
      return next(createError(400, '18 please provide an email, bad request'))
      // return res.status(400).json('please provide an email, bad request')
    }

  
    return next(createError(200,'63 An OTP has been sent to your current mail and you need to check it' , 63))
  }
  catch(err){
    return next(createError(200,'64 An error occurred in email S1' , 64))
    console.log(err)
  }

})




//ERROR middleware *
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong'
  const customCode = err.custom_code
  return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      custom_code: customCode,
      // stack: err.stack
  })
  // return res.status(errorStatus).json({createError(
  //   errorStatus,
  //   errorMessage,
  //   custom_code
  // )})
})

app.listen(PORT, ()=> {
    console.log(`App is running on port: ${PORT}`)
})
 