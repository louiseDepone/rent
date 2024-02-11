const bcrypt = require("bcrypt");
const {db} = require("../configs/database");
const  {decoding} = require(`../services/jwt`)

const Renter = {

    Get: {
        

        getallRenter (req, res) {
            let id = req.params.id;
            if (!id) {
                return res.status(400).send({error: true, message :`Please provide id`});
            }
            try {
                db.query(`SELECT * FROM rent WHERE id = ?`,id,(err, result) => {
        
                    if(err) {
                        console.error(`error fetching items:`, err);
                        req.status(500).json({ error: `Internal Server Error` });
                    }else{
                        res.status(200).json({result});
                    }
                });
        
            } catch (error) {
                console.error(`Error loading Device`, error);
                res.status(200).json({ error: `Internal Server Error` });
            }
        }
    },   
}

module.exports = Renter