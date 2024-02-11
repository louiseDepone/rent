{
    const { email } = req.body;


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'email mies',
            pass: 'pass mies'
        }
    });

    const mailOptions = {
        from: 'email mies',
        to: email,
        subject: 'Approval of Rent Device',
        text: `Hello`
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

};