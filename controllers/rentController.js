const bcrypt = require("bcrypt");
const {db} = require("../configs/database");
const  {decoding} = require('../services/jwt')

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
                        res.status(500).json({ error: 'Internal Server Error' });
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
        
            const {full_payment,device_id,rent_end,rent_start,status_id,quantity} = req.body;
        
            if ( full_payment || device_id || rent_end || rent_start || status_id || quantity ) {
                return res.status(400).send({message:'please providename, brand, price_per_day'});
            } 
        
            try { 
                db.query('UPDATE rent SET  full_payment = ?, device_id = ?, rent_end = ?, rent_start = ?, status_id = ?, quantity = ? WHERE id = ?',[name, full_payment,device_id,rent_end,rent_start,status_id,quantity, id],(err,result, fields) => {
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
            decode = decoding(req)
            try{
                const { full_payment,device_id,rent_end,rent_start,status_id,quantity} = req.body;;
                if ( !full_payment || !device_id || !rent_end || !rent_start || !status_id || !quantity ) {
                    return res.status(400).send({message:'please provide input'});
                } 
                console.log(full_payment,device_id,rent_end,rent_start,status_id,quantity,decode.id)
                const queryInsert = 'INSERT INTO rent (full_payment,device_id,rent_end,rent_start,status_id,quantity,user_id) VALUES (?,?,?,?,?,?,?)'
                await db.promise().execute(queryInsert, [full_payment,device_id,rent_end,rent_start,status_id,quantity, decode.id])
        
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