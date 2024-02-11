const bcrypt = require("bcrypt");
const {db} = require("../configs/database");

const User = {

    Get: {
        
        singleUser (req, res){
            let id = req.params.id;
        
            if (!id) {
                return res.status(400).send({error: true, message :'Please provide id'});
            }
            try{
                db.query('SELECT * FROM user WHERE user.id = ?;', id, (err, result) => {
                    
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

        allUser (req, res) {

            try {
                db.query('SELECT * FROM user ',(err, result) => {
        
                    if(err) {
                        console.error('error fetching items:', err);
                        req.status(500).json({ error: 'Internal Server Error' });
                    }else{
                        res.status(200).json({result});
                    }
                });
        
            } catch (error) {
                console.error('Error loading user', error);
                res.status(200).json({ error: 'Internal Server Error' });
            }
        }
    },
    Put: { 
        
        async singleUser(req,  res){

            let id = req.params.id;
        
            const {name, email, password, role_id, residence_address, contact_number} = req.body;
            const hashedPassword = await bcrypt.hash(password,10);
        
            if (!name || !email || !password || !role_id || !residence_address || !contact_number) {
                return res.status(400).send({message:'please provide name, email, password, role_id, residence_address, contact_number'});
            } 
        
            try { 
                db.query('UPDATE user SET name = ?, email = ?, password = ?, role_id = ?, residence_address = ?, contact_number = ? WHERE id = ?',[name, email, password, role_id, residence_address, contact_number, id],(err,result, fields) => {
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
            async singleUser (req, res) {

                let id = req.params.id;
                
                    const {soft_delete} = req.body;
                
                    if (!soft_delete) {
                        return res.status(400).send({message:`please providen soft_delete`});
                    } 
                
                    try { 

                        const getUserQuery = 'SELECT * FROM user WHERE id = ? ';
                        const[rows] = await db.promise().execute(getUserQuery,[id]);
                        const emailDeletedAccount = `${rows[0].ID}|${rows[0].email}`


                        db.query(`UPDATE user SET soft_delete = ?, email = ? WHERE id = ?`,[soft_delete, emailDeletedAccount, id],(err,result, fields) => {
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

module.exports = User