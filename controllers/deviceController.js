const bcrypt = require("bcrypt");
const {db} = require("../configs/database");
const  {decoding} = require(`../services/jwt`)

const Device = {
  Get: {
    singleDevice(req, res) {
      let id = req.params.id;

      if (!id) {
        return res
          .status(400)
          .send({ error: true, message: `Please provide id` });
      }
      try {
        db.query(
          `SELECT * FROM device WHERE device.id = ?;`,
          id,
          (err, result) => {
            if (err) {
              console.error(`erroe fetching items:`, err);
              res.status(500).json({ message: `Internal server error` });
            } else {
              res.status(200).json(result);
            }
          }
        );
      } catch (errror) {
        console.error(`Error loadng Device:`, error);
        res.status(500).json({ error: `interrnal server error` });
      }
    },

    allDevice(req, res) {
      const isadmin = decoding(req).role_id;
      try {
        db.query(
          `SELECT * FROM device ${
            isadmin == 2 ? "WHERE soft_delete = false" : " "
          }`,
          (err, result) => {
            if (err) {
              console.error(`error fetching items:`, err);
              res.status(500).json({ error: `Internal Server Error` });
            } else {
              res.status(200).json({ result });
            }
          }
        );
      } catch (error) {
        console.error(`Error loading Device`, error);
        res.status(200).json({ error: `Internal Server Error` });
      }
    },
  },

  Put: {
    async singleDevice(req, res) {
      let id = req.params.id;

      const {
        name,
        brand,
        price_per_day,
        description,
        processor,
        memory,
        storage,
        display_resolution,
      } = req.body;

      if (
        !name ||
        !brand ||
        !price_per_day ||
        !description ||
        processor ||
        memory ||
        storage ||
        display_resolution
      ) {
        return res
          .status(400)
          .send({
            message: `please provide name, brand, price_per_day, description,  processor, memory, storage, display_resolution`,
          });
      }

      try {
        db.query(
          `UPDATE Device SET name = ?, brand = ?, price_per_day  = ?, description = ? ,  processor = ?, memory = ?, storage = ?, display_resolution = ? WHERE id = ?`,
          [
            name,
            brand,
            price_per_day,
            description,
            processor,
            memory,
            storage,
            display_resolution,
            id,
          ],
          (err, result, fields) => {
            if (err) {
              console.error(`error updating:`, err);
              res.status(500).json({ message: `internall server error` });
            } else {
              res.status(200).json(result);
            }
          }
        );
      } catch (error) {
        console.error(`error loading Device`, error);
        res.status(500).json({ error: `internnal server error` });
      }
    },
  },

  // Post:{
  //     async singleDevice(req,res){
  //         try{
  //             const {name, brand, price_per_day, description, processor, memory, storage, display_resolution} = req.body;;

  //             const queryInsert = `INSERT INTO device (name, brand, price_per_day, description, processor, memory, storage, display_resolution) VALUES (?,?,?,?,?,?,?,?)`
  //             await db.promise().execute(queryInsert, [name, brand, price_per_day, description,  processor, memory, storage, display_resolution])

  //             res.status(201).json({message: `Device added successfuly`})
  //         } catch (error){
  //              console.error("ERROR!!: ", error)
  //              res.status(500).json({error: "internal server error"})
  //         }
  //     }

  // },
  Post: {
    async singleDevice(req, res) {
      try {
        const {
          name,
          brand,
          price_per_day,
          description,
          processor,
          memory,
          storage,
          display_resolution,
          stock,
          available,
        } = req.body;

        // Determine the status based on stock and available values
        const status =
          available > 0
            ? "Available"
            : stock > 0
            ? "Some Available"
            : "All Rented";

        const queryInsertDevice = `
                INSERT INTO device (name, brand, price_per_day, description, processor, memory, storage, display_resolution)
                VALUES (?,?,?,?,?,?,?,?)
            `;

        // Insert device into the device table
        const [deviceResult] = await db
          .promise()
          .execute(queryInsertDevice, [
            name,
            brand,
            price_per_day,
            description,
            processor,
            memory,
            storage,
            display_resolution,
          ]);

        const deviceId = deviceResult.insertId;

        // Insert availability row for the added device
        const queryInsertAvailability = `
                INSERT INTO availability (device_id, stock, available, status, soft_deleted)
                VALUES (?,?,?,?,?)
            `;

        await db
          .promise()
          .execute(queryInsertAvailability, [
            deviceId,
            stock,
            available,
            status,
            0,
          ]);

        res.status(201).json({
          message: `Device added successfully`,
        });
      } catch (error) {
        console.error("ERROR!!: ", error);
        res.status(500).json({
          error: "Internal server error",
        });
      }
    },
  },

  //This up for change to update and setting the isDeleted column to True or 1.
  Delete: {
    async singleDevice(req, res) {
      let id = req.params.id;

      const { soft_delete } = req.body;

      try {
        db.query(
          `UPDATE Device SET soft_delete = ? WHERE id = ?`,
          [soft_delete, id],
          (err, result, fields) => {
            if (err) {
              console.error(`error updating:`, err);
              res.status(500).json({ message: `internall server error` });
            } else {
              res.status(200).json(result);
            }
          }
        );
      } catch (error) {
        console.error(`error loading Device`, error);
        res.status(500).json({ error: `internnal server error` });
      }
    },
  },
};

module.exports = Device