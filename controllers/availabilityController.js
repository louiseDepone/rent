const bcrypt = require("bcrypt");
const {db} = require("../configs/database");

const Availability = {

    Get: {
        
        singleAvailability (req, res){
            let id = req.params.id;
        
            if (!id) {
                return res.status(400).send({error: true, message :'Please provide id'});
            }
            try{
                db.query('SELECT * FROM availability WHERE availability.id = ?;', id, (err, result) => {
                    
                    if(err){
                    console.error('erroe fetching items:', err);
                    res.status(500).json({ message: 'Internal server error'})
                  } else {
                    res.status(200).json(result);
                  }  
                });
        
            } catch (errror){
        
                console.error('Error loadng availability:', error);
                res.status(500).json({error: 'interrnal server error'})
            }
        },
        

        allAvailability (req, res) {

            try {
                db.query('SELECT * FROM availability ',(err, result) => {
        
                    if(err) {
                        console.error('error fetching items:', err);
                        res.status(500).json({ error: 'Internal Server Error' });
                    }else{
                        res.status(200).json({result});
                    }
                });
        
            } catch (error) {
                console.error('Error loading availability', error);
                res.status(200).json({ error: 'Internal Server Error' });
            }
        }
    },
    Put: { 
        
        async singleAvailability(req,  res){

            let id = req.params.id;
        
            const {device_id, stock, available, status} = req.body;
            const hashedPassword = await bcrypt.hash(password,10);
        
            if (!device_id || !stock || !available || !status) {
                return res.status(400).send({message:'please provide name, email, password, role_id, residence_address, contact_number'});
            } 
        
            try { 
                db.query('UPDATE availability SET device_id = ?, stock = ?, available = ?, status = ? WHERE id = ?',[device_id, stock, available, status, id],(err,result, fields) => {
                if (err){
                    console.error('error updating:', err);
                    res.status(500).json({message:'internall server error'});
                }else {
                    res.status(200).json(result);
                }
            });
        
            } catch (error) {
                console.error('error loading availability', error);
                res.status(500).json({ error: 'internnal server error' });
            }
        }
    },

    Post:{
        async singleAvailability(req,res){
            try{
                const {device_id, stock, available, status} = req.body;;
        
                const queryInsert = 'INSERT INTO availability (device_id, stock, available, status) VALUES (?,?,?,?)'
                await db.promise().execute(queryInsert, [device_id, stock, available, status])
        
                res.status(201).json({message: 'availability added successfuly'})
            } catch (error){
                 console.error("ERROR!!: ", error)
                 res.status(500).json({error: "internal server error"})
        }
    }},
    
    //This up for change to update and setting the isDeleted column to True or 1.  
    Delete: {
            singleAvailability (req, res) {
                let id = req.params.id;
    
                const {soft_delete} = req.body;
            
      
            
                try { 
                    db.query(`UPDATE availability SET soft_delete = ? WHERE id = ?`,[soft_delete, id],(err,result, fields) => {
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

module.exports = Availability