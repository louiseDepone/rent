const {db} = require("../configs/database");
const  {decoding} = require('../services/jwt')

const Status = {
    Get:{
        singleStatus(req, res){
            let status_id = req.params.id;
            if (!status_id) {
                return res.status(400).send({error: true, message :'Please provide status id'});
            }
            try{
                db.query('select * FROM status WHERE id = ?', status_id, (err, result) => {
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

        allStatuss (req, res) {
            try {
                db.query('SELECT id,name FROM status',(err, result) => {
        
                    if(err) {
                        console.error('error fetching items:', err);
                        res.status(500).json({ error: 'Internal Server Error' });
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
        async singleStatus(req,res){
            try{
                const {name} = req.body;;
        
                const queryInsert = 'INSERT INTO status (name) VALUES (?)'
                await db.promise().execute(queryInsert, [name])
        
                res.status(201).json({message: 'status added successfuly'})
            } catch (error){
                 console.error("ERROR!!: ", error)
                 res.status(500).json({error: "internal server error"})
            }
        }
    },
    Put:{
        async singleStatus(req, res){
            let status_id = req.params.id;
        
            const{name} = req.body;
        
            if ( name) {
                return res.status(400).send({error: user,message:'please provide status_code andname'});
            } 
        
            try { 
                db.query('UPDATE status SET name = ? WHERE id = ?',[name, status_id],(err,result, fields) => {
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

    //This up for change to update and setting the isDeleted column to True or 1.  
    Delete: {
        singleStatus (req, res) {
            let id = req.params.id;
    
            const {soft_delete} = req.body;
        
           
        
            try { 
                db.query(`UPDATE status SET soft_delete = ? WHERE id = ?`,[soft_delete, id],(err,result, fields) => {
                if (err){
                    console.error(`error updating:`, err);
                    res.status(500).json({message:`internall server error`});
                }else {
                    res.status(200).json(result);
                }
            });
        
            } catch (error) {
                console.error(`error loading Device`, error);
                res.status(500).json({ error: `internnal server error` });
            }
        }
    },
}

module.exports = Status