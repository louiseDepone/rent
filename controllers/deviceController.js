const bcrypt = require("bcrypt");
const {db} = require("../configs/database");

const Device = {

    Get: {
        
        singleDevice (req, res){
            let id = req.params.id;
        
            if (!id) {
                return res.status(400).send({error: true, message :'Please provide id'});
            }
            try{
                db.query('SELECT * FROM device WHERE device.id = ?;', id, (err, result) => {
                    
                    if(err){
                    console.error('erroe fetching items:', err);
                    res.status(500).json({ message: 'Internal server error'})
                  } else {
                    res.status(200).json(result);
                  }  
                });
        
            } catch (errror){
        
                console.error('Error loadng Device:', error);
                res.status(500).json({error: 'interrnal server error'})
            }
        },

        allDevice (req, res) {

            try {
                db.query('SELECT * FROM device ',(err, result) => {
        
                    if(err) {
                        console.error('error fetching items:', err);
                        req.status(500).json({ error: 'Internal Server Error' });
                    }else{
                        res.status(200).json({result});
                    }
                });
        
            } catch (error) {
                console.error('Error loading Device', error);
                res.status(200).json({ error: 'Internal Server Error' });
            }
        }
    },
    Put: { 
        
        async singleDevice(req,  res){

            let id = req.params.id;
        
            const {name, brand, price_per_day} = req.body;
        
            if (!name || !brand || !price_per_day ) {
                return res.status(400).send({message:'please providename, brand, price_per_day'});
            } 
        
            try { 
                db.query('UPDATE Device SET name = ?, email = ?, password = ?, role_id = ?, residence_address = ?, contact_number = ? WHERE id = ?',[name, email, password, role_id, residence_address, contact_number, id],(err,result, fields) => {
                if (err){
                    console.error('error updating:', err);
                    res.status(500).json({message:'internall server error'});
                }else {
                    res.status(200).json(result);
                }
            });
        
            } catch (error) {
                console.error('error loading Device', error);
                res.status(500).json({ error: 'internnal server error' });
            }
        }
    },
    Post:{
        async singleDevice(req,res){
            try{
                const {name, brand, price_per_day} = req.body;;
        
                const queryInsert = 'INSERT INTO device (name, brand, price_per_day) VALUES (?,?,?)'
                await db.promise().execute(queryInsert, [name, brand, price_per_day])
        
                res.status(201).json({message: 'Device added successfuly'})
            } catch (error){
                 console.error("ERROR!!: ", error)
                 res.status(500).json({error: "internal server error"})
            }
        }

    },

    //This up for change to update and setting the isDeleted column to True or 1.  
    Delete: {
            singleDevice (req, res) {

                let id = req.params.id;
            
                if (!id) {
                    return res.status(400).send({error: true, message :'Please provide id'});
                }
                try{
                    db.query('DELETE FROM device WHERE id = ?;', id, (err, result) => {
                        
                        if(err){
                        console.error('erroe fetching items:', err);
                        res.status(500).json({ message: 'Internal server error'})
                      } else {
                        res.status(200).json(result);
                      }  
                    });
            
                } catch (errror){
            
                    console.error('Error loadng Device:', error);
                    res.status(500).json({error: 'interrnal server error'})
                }   
        }
    },


    
}

module.exports = Device