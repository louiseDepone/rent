const bcrypt = require("bcrypt");
const {db} = require("../configs/database");

const Rent = {

    Get: {
        
        singleRent (req, res){
            let id = req.params.id;
        
            if (!id) {
                return res.status(400).send({error: true, message :'Please provide id'});
            }
            try{
                db.query('SELECT * FROM rent WHERE rent.id = ?;', id, (err, result) => {
                    
                    if(err){
                    console.error('erroe fetching items:', err);
                    res.status(500).json({ message: 'Internal server error'})
                  } else {
                    res.status(200).json(result);
                  }  
                });
        
            } catch (errror){
        
                console.error('Error loadng rent:', error);
                res.status(500).json({error: 'interrnal server error'})
            }
        },

        allRent (req, res) {

            try {
                db.query('SELECT * FROM rent ',(err, result) => {
        
                    if(err) {
                        console.error('error fetching items:', err);
                        req.status(500).json({ error: 'Internal Server Error' });
                    }else{
                        res.status(200).json({result});
                    }
                });
        
            } catch (error) {
                console.error('Error loading rent', error);
                res.status(200).json({ error: 'Internal Server Error' });
            }
        }
    },
    Put: { 
        
        async singleRent(req,  res){

            let id = req.params.id;
        
            const {name, full_payment,device_id,rent_end,rent_start,status_id,quantity} = req.body;
        
            if (!name || !brand || !price_per_day ) {
                return res.status(400).send({message:'please providename, brand, price_per_day'});
            } 
        
            try { 
                db.query('UPDATE rent SET name = ?, full_payment = ?, device_id = ?, rent_end = ?, rent_start = ?, status_id = ?, quantity = ? WHERE id = ?',[name, full_payment,device_id,rent_end,rent_start,status_id,quantity, id],(err,result, fields) => {
                if (err){
                    console.error('error updating:', err);
                    res.status(500).json({message:'internall server error'});
                }else {
                    res.status(200).json(result);
                }
            });
        
            } catch (error) {
                console.error('error loading rent', error);
                res.status(500).json({ error: 'internnal server error' });
            }
        }
    },

    Post:{
        async singleRent(req,res){
            try{
                const {name, full_payment,device_id,rent_end,rent_start,status_id,quantity} = req.body;;
        
                const queryInsert = 'INSERT INTO rent (name, full_payment,device_id,rent_end,rent_start,status_id,quantity) VALUES (?,?,?,?,?,?,?)'
                await db.promise().execute(queryInsert, [name, full_payment,device_id,rent_end,rent_start,status_id,quantity])
        
                res.status(201).json({message: 'Rent added successfuly'})
            } catch (error){
                 console.error("ERROR!!: ", error)
                 res.status(500).json({error: "internal server error"})
            }
        }
    },

    //This up for change to update and setting the isDeleted column to True or 1.  
    Delete: {
            singleRent (req, res) {

                let id = req.params.id;
    
                const {soft_delete} = req.body;
            
                if (!soft_delete) {
                    return res.status(400).send({message:`please providen soft_delete`});
                } 
            
                try { 
                    db.query(`UPDATE rent SET soft_delete = ? WHERE id = ?`,[soft_delete, id],(err,result, fields) => {
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

module.exports = Rent