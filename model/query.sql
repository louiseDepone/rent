-- drop database rent;
-- CREATE DATABASE IF NOT EXISTS Rent;

USE Rent;

-- CREATE TABLE `      ` (
--   `id` INT PRIMARY KEY,
--   `name` VARCHAR(255),
--   `brand` VARCHAR(255),
--   `price_per_day` DECIMAL(10, 2),
--   `soft_delete` BOOLEAN DEFAULT FALSE
-- );


-- CREATE TABLE `status` (
--   `id` INT PRIMARY KEY,
--   `name` VARCHAR(255),
--   `soft_delete` BOOLEAN DEFAULT FALSE
-- );

-- CREATE TABLE `role` (
--   `id` INT PRIMARY KEY,
--   `name` VARCHAR(255),
--   `soft_delete` BOOLEAN DEFAULT FALSE
-- );
-- CREATE TABLE `user` (
--   `id` INT PRIMARY KEY,
--   `name` VARCHAR(255),
--   `residence_address` VARCHAR(255),
--   `email` VARCHAR(255),
--    `role_id` INT,
--   `contact_number` VARCHAR(15),
--   `password` VARCHAR(255),
--   `soft_delete` BOOLEAN DEFAULT FALSE,
--   FOREIGN KEY (`role_id`) REFERENCES `role`(`id`)
-- );


-- CREATE TABLE `rent` (
--   `id` INT PRIMARY KEY,
--   `device_id` INT,
--   `user_id` INT,
--   `status_id` INT,
--   `rent_start` DATETIME,
--   `rent_end` DATETIME,
--   `full_payment` DECIMAL(10, 2),
--   `timeStamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   `soft_delete` BOOLEAN DEFAULT FALSE,
--   FOREIGN KEY (`device_id`) REFERENCES `device`(`id`),
--   FOREIGN KEY (`user_id`) REFERENCES `user`(`id`),
--   FOREIGN KEY (`status_id`) REFERENCES `status`(`id`)
-- );

-- USE Rent;


-- INSERT INTO `device` (`id`, `name`, `brand`, `price_per_day`, `soft_delete`)
-- VALUES
--   (1, 'Laptop', 'Dell', 20.00, false),
--   (2, 'Smartphone', 'Samsung', 15.00, false),
--   (3, 'Tablet', 'Apple', 18.00, false),
--   (4, 'Chromebook', 'Google', 25.00, false);
  -- Add more devices as needed

-- Insert sample data into the `status` table
-- INSERT INTO `status` (`id`, `name`, `soft_delete`)
-- VALUES
--   (1, 'Available', false),
--   (2, 'Rented', false),
--   (3, 'Damaged', false);
  
  -- Add more statuses as needed

-- Insert sample data into the `role` table
-- INSERT INTO `role` (`id`, `name`, `soft_delete`)
-- VALUES
--   (1, 'Admin', false),
--   (2, 'User', false);
--   -- Add more roles as needed

-- -- Insert sample data into the `user` table
-- INSERT INTO `user` (`id`, `name`, `residence_address`, `email`, `role_id`, `contact_number`, `password`, `soft_delete`)
-- VALUES
--   (1, 'John Doe', '123 Main St', 'john.doe@example.com', 2, '555-1234', 'hashed_password', false),
--   (2, 'Jane Smith', '456 Oak St', 'jane.smith@example.com', 2, '555-5678', 'hashed_password', false);
--   -- Add more users as needed

-- -- Insert sample data into the `rent` table
-- INSERT INTO `rent` (`id`, `device_id`, `user_id`, `status_id`, `rent_start`, `rent_end`, `full_payment`, `timeStamp`, `soft_delete`)
-- VALUES
--   (1, 4, 1, 2, '2024-02-01 12:00:00', '2024-02-10 12:00:00', 250.00, CURRENT_TIMESTAMP, false),
--   (2, 4, 2, 1, '2024-02-05 10:00:00', '2024-02-15 10:00:00', 225.00, CURRENT_TIMESTAMP, false);
--   -- Add more rental records as needed
select * from user;

-- CREATE TABLE `availability` (
--   `id` INT PRIMARY KEY,
--   `device_id` INT,
--   `stock` INT,
--   `available` INT,
--   `status`varchar(255) ,
--   `soft_delete` BOOLEAN DEFAULT FALSE,
--   FOREIGN KEY (`device_id`) REFERENCES `device`(`id`)
-- );

-- ALTER TABLE `rent`
-- ADD COLUMN `quantity` INT DEFAULT 1;