const express = require('express');
const app = express();
const pool = require('./db')
var cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')

app.use(cors());
app.use(express.json())
app.use(cookieParser())

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}
function comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
}
function generateToken(id) {
    const token = jwt.sign({
      userId: id
    },
      "secretstring", { expiresIn: '7d' }
    );
    return token;
}

app.post('/api/auth/signup', async(req,res)=>{
    try {
        const {username,password,firstname,lastname} = req.body;
        const hashpassword = hashPassword(password)
        query="select * from test_register_user('"+username+"','"+hashpassword+"','"+firstname+"','"+lastname+"')"
        const response = await pool.query(query)
        res.send(response)
    } catch (error) {
        console.log(error)
    }
})

app.get('/userinfo', async function (req, res) {
    const username = req.body;
    query="select * from test_get_user_info('"+username+"')";
    const response = await pool.query(query)
    res.send(response)
  })

app.post('/api/auth/login', async(req,res)=>{
    try {
        console.log(req.body)
        const {username,password} = req.body;
        console.log(username,password)
        query="select * from test_login_user('"+username+"')"
        const response = await pool.query(query)
        const realpassword = (response.rows[0].password)
        console.log(password,realpassword)
        if(comparePassword(realpassword,password)){
            const jwttkn = generateToken(username)
            // res.cookie("jwt",jwttkn)
            res.json({
                "jwt":jwttkn
            })
        }
        else{
            res.status(403).json({
                "message":"username or passwords do not match"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(403).json({
            "message":"user not registered"
        })
    }
})

app.get('/parsecookie/:cook', async function (req, res) {
    const {cook} = req.params
    console.log(cook)
    const decoded = await jwt.verify(cook, 'secretstring');
    res.json({
        decoded
    })
    console.log(decoded)
  })

app.listen(4000,()=>{
    console.log('listening on port 4000')
})