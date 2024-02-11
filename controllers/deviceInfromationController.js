const bcrypt = require("bcrypt");
const {db} = require("../configs/database");

const DeviceInformation = {

    Get: {

        getSingleDeviceInformation (req, res){
            let id = req.params.id;
        
            if (!id) {
                return res.status(400).send({error: true, message :`Please provide id`});
            }
            try{
                db.query(`
                    SELECT d.*, a.stock, a.available, a.status 
                    FROM device d 
                    LEFT JOIN availability a ON d.id = a.device_id 
                    WHERE d.id = ?;`, id, (err, result) => {
                    
                    if(err){
                    console.error(`erroe fetching items:`, err);
                    res.status(500).json({ message: `Internal server error`})
                  } else {
                    res.status(200).json(result);
                  }  
                });
        
            } catch (errror){
        
                console.error(`Error loadng Device:`, error);
                res.status(500).json({error: `interrnal server error`})
            }
        },

        getallDeviceInformation (req, res) {
            try {
                db.query(`
                SELECT d.*, a.stock, a.available, a.status 
                FROM device d 
                LEFT JOIN availability a ON d.id = a.device_id;
                `,(err, result) => {
        
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

module.exports = DeviceInformation