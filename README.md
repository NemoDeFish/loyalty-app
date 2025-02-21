# Customer Points Sync System

## Overview
This project is a **customer points management system** designed to sync customer points from a local POS system to a remote web database. It consists of:

- **Frontend:** Built with React.
- **Backend:** Uses Express (Node.js) or an alternative PHP-based backend.
- **Database:** Supports both **MongoDB** and **MySQL**.
- **Syncing Mechanism:** Python scripts track changes in a local MySQL database and update the remote system.

## Features
- Fetches customer points from a POS system that uses MySQL.
- Updates remote MongoDB or MySQL databases in real time.
- Supports hosting providers that may not support Node.js.
- Uses **MySQL triggers** to track changes and log updates.
- Includes a Python script that periodically syncs new updates.

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/yourusername/customer-points-sync.git
cd customer-points-sync
```

### 2. Install Dependencies
#### Frontend (React)
```sh
cd frontend
npm install
npm run build
```

#### Backend (Express + MongoDB)
```sh
cd backend
npm install
node index.js
```

#### Alternative Backend (PHP + MySQL)
Ensure your server supports PHP and configure `config.php` with your database credentials.

### 3. Configure Environment Variables
Create a `.env` file in the corresponding directories. There are .env.example files attached in its own directories as a template.

### 4. Run the Sync Script
```sh
python mysql-mysql.py
python mysql-mongodb.py
```

## MySQL Trigger
This trigger logs changes to the `points_change_log` table:
```sql
CREATE TABLE points_change_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(15),
    old_points INT,
    new_points INT,
    change_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER after_points_update
AFTER UPDATE ON users
FOR EACH ROW
BEGIN
    -- Check if points were actually updated
    IF OLD.points <> NEW.points THEN
        INSERT INTO points_change_log (phone_number, old_points, new_points)
        VALUES (NEW.phone_number, OLD.points, NEW.points);
    END IF;
END$$

CREATE TRIGGER after_new_customer
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    -- Insert a record in the points_change_log table when a new user is added
    INSERT INTO points_change_log (phone_number, old_points, new_points, synced)
    VALUES (NEW.phone_number, 0, NEW.points, 0);  -- 0 is for the initial points, change as needed
END //
```

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-xyz`).
3. Commit your changes.
4. Push to your branch and open a pull request.

## License
This project is licensed under the MIT License.