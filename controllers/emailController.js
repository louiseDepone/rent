const nodemailer = require('nodemailer');
  
const Email = {
     async sendEmail (req, res) {
        const {rent_id} = req.body;
     
        const getUserQuery = `SELECT r.id AS rent_id, r.device_id AS rent_device_id, r.user_id AS rent_user_id, r.status_id, r.rent_start, r.rent_end, r.full_payment, r.timeStamp, r.soft_delete AS rent_soft_delete,
        d.id AS device_id, d.name AS device_name, d.description,d.brand AS device_brand, d.price_per_day AS device_price_per_day, d.soft_delete AS device_soft_delete,
        u.id AS user_id, u.name AS user_name, u.residence_address, u.email, u.role_id, u.contact_number, u.password, u.soft_delete AS user_soft_delete
        FROM rent r
        JOIN device d ON r.device_id = d.id
        JOIN user u ON r.user_id = u.id
        WHERE r.id = ?;`;
        const[rows] = await db.promise().execute(getUserQuery,[rent_id]);
  
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'irentdevice@gmail.com',
                pass: 'irentdevicefromyou'
            }
        });

        const mailOptions = {
            from: 'irentdevice@gmail.com',
            to: rows[0].email,
            subject: 'Approval for Your iRent Device Rental',
            text: `Hi ${rows[0].user_name},

            Good news! Your request to rent a device from "iRent" has been approved. Here are the details:\n
            \n
            Device Details:\n
            Name: ${rows[0].device_name}\n
            Brand: ${rows[0].device_brand}\n
            Description: ${rows[0].description}
            \n
            Renter Information:\n
            Name: ${rows[0].user_name}\n
            Start Date: ${rows[0].rent_start}\n
            Expect Return Date: ${rows[0].rent_end}\n
            If you have any questions or need further assistance, feel free to reach out.\n
            \n
            Thanks,\n
            Irent`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Email sent');
            }
        });
    }    
}

module.exports = Email;