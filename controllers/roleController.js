const {db} = require("../configs/database");
const  {decoding} = require('../services/jwt')

const Role = {
    Get:{
        singleRole(req, res){
            let role_id = req.params.id;
            if (!role_id) {
                return res.status(400).send({error: true, message :'Please provide role id'});
            }
            try{
                db.query('select * FROM role WHERE id = ?', role_id, (err, result) => {
                  if(err){
                    console.error('erroe fetching items:', err);
                    res.status(500).json({ message: 'Internal server error'})
                  } else {
                    res.status(200).json(result);
                  }  
                });
        
            } catch (errror){
        
                console.error('Error loadng user:', error);
                res.status(500).json({error: 'interrnal server error'})
            }
        },

        allRoles (req, res) {
            try {
                db.query('SELECT id,name FROM role',(err, result) => {
        
                    if(err) {
                        console.error('error fetching items:', err);
                        req.status(500).json({ error: 'Internal Server Error' });
                    }else{
                        res.status(200).json({result});
                    }
                });
        
            } catch (error) {
                console.error('Error loading users', error);
                res.status(200).json({ error: 'Internal Server Error' });
            }
        }
    },
    Post:{
        async singleRole(req,res){
            try{
                const {name} = req.body;;
        
                const queryInsert = 'INSERT INTO role name) VALUES (?)'
                await db.promise().execute(queryInsert, [name])
        
                res.status(201).json({message: 'Role added successfuly'})
            } catch (error){
                 console.error("ERROR!!: ", error)
                 res.status(500).json({error: "internal server error"})
            }
        }
    },
    Put:{
        async singleRole(req, res){
            let role_id = req.params.id;
        
            const{role_code,name} = req.body;
        
            if (!role_code || name) {
                return res.status(400).send({error: user,message:'please provide role_code andname'});
            } 
        
            try { 
                db.query('UPDATE role SET role_code = ?,name = ? WHERE id = ?',[role_code,name, role_id],(err,result, fields) => {
                if (err){
                    console.error('error updating:', err);
                    res.status(500).json({message:'internall server error'});
                }else {
                    res.status(200).json(result);
                }
            });
        
            } catch (error) {
                console.error('error loading user', error);
                res.status(500).json({ error: 'internnal server error' });
            }    
        }
    },

    Post:{
        async singleRole(req,res){
            try{
                const {name} = req.body;;
        
                const queryInsert = 'INSERT INTO role (name) VALUES (?)'
                await db.promise().execute(queryInsert, [name])
        
                res.status(201).json({message: 'Role added successfuly'})
            } catch (error){
                 console.error("ERROR!!: ", error)
                 res.status(500).json({error: "internal server error"})
            }
        }
    
    },

    //This up for change to update and setting the isDeleted column to True or 1.  
    Delete: {
        singleRole (req, res) {
        }
    },
}

module.exports = Role