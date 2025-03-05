import express from 'express'
const router = express.Router()
import UserData from "../models/User.js"


router.post('/', async(req, res) => {
    const { Roll, password, type } = req.body
    console.log({Roll : Roll , password : password , type : type})
    await UserData.findOne({ Roll: Roll.toUpperCase() })
      .then(user => {
        console.log(user)
        if (user) {
          console.log({pass : user.password , type : user.type})
          if (password === user.password && type === user.type) {
            console.log("granted")
            res.json({ access: 'granted' })
          } else {
            console.log('invalid')
            res.status(400).send('invalid cedentials')
          }
        } else {
          res.status(404).send('user not found')
        }
      })
      .catch(err => {
        res.status(500).json({ error: 'Internal server error', details: err.message })
      })
  })

export default router