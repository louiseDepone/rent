const bcrypt = require("bcrypt");
const {db} = require("../configs/database");
const {jsonwebtoken} = require('../middlewares/authMiddleware');
const  {decoding} = require('../services/jwt')

const  authentication = {
    async verifyUser(req,res){
        const decoded = decoding(req)
        console.log(decoded)
        res.status(201).json(decoded)
    },
    async register(req,res){
        const {name, email, password, role_id, residence_address, contact_number} = req.body;
        if(!role_id){
            role_id =  2;
        }
        try{
            
            const hashPass = await bcrypt.hash(password, 10);
    
            const queryInsert = 'INSERT INTO user (name, email, password, role_id, residence_address, contact_number) VALUES (?, ?, ?, ?, ?, ?)';
            await db.promise().execute(queryInsert, [name, email, hashPass, role_id, residence_address, contact_number])
    
            res.status(201).json({message: 'User registered successfuly'})
        } catch (error){
             console.error("ERROR!!: ", error)
             if(error.code === 'ER_DUP_ENTRY'){
                res.status(500).json({message: `${email} is already existing`})
             }
            //  res.status(500).json({error: "internal server error"})
        }
    },

    async login(req, res){
    
        try {
            const{email, password} = req.body;
    
            const getUserQuery = 'SELECT * FROM user WHERE email = ? AND soft_delete = false';
            const[rows] = await db.promise().execute(getUserQuery,[email]);
    
            if ( rows.length === 0) {
                return res.status(404).json({ error: 'Invalid email or password'});
            }
            
        const user = rows[0];
        const passwordMatch = await bcrypt.compare( password, user.password);
    
        if(!passwordMatch) {
            return res.status(404).json({ error: 'invalid email or password'});
        }
        const token = jsonwebtoken.sign({...user, password:"password"}, process.env.SECRETKEY, {expiresIn: '1h'});
        res.status(200).json({token});
    } catch (error) {
        console.error('error logging in', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    }
}



module.exports = authentication