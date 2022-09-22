// import { usersRepo } from 'helpers';
import { sql_query } from '../../../helpers/db.js';

const handler = async (req, res) => {
    // console.log(req.body);
    switch (req.method) {
        case 'GET':
            console.log("GET");
            try{
                const results = await sql_query(`
                SELECT * FROM Users
                `);
                return res.json(results);
            } catch (e){
                res.status(400).json({ message: e.message});
            }
        case 'POST':
            try{
                console.log("POST");
                const body = req.body;
                const my_sql_q = `
                SELECT * 
                FROM Users
                WHERE Users.email = "${body.email}"
                `;
                // console.log(`my_sql_q: ${my_sql_q}`);
                const results = await sql_query(my_sql_q);
                // console.log(`!results.length: ${!results.length}`);

                if (results.length) {
                    // console.log(res.status(400).json({ message: 'User with this email already exists'}));
                    res.status(400).send({ message: 'User with this email already exists'});
                    return;
                }
                
                const my_sql_q2 = `
                insert INTO Users (title, firstName, lastName, email, user_role, password, dateCreated, dateUpdated)
                VALUES ( "${body.title}",
                    "${body.firstName}",
                    "${body.lastName}",
                    "${body.email}",
                    "${body.user_role}",
                    "${body.password}",
                    NOW(), 
                    NOW())
                `;
                // console.log(`my_sql_q2: ${my_sql_q2}`);
                const result2 = await sql_query(my_sql_q2);
                // console.log(result2);
                if (result2.insertId > 0){
                    console.log("OK");
                    res.status(200).send({ message: 'User inserted.'});
                    return;
                }
                console.log("Something went wrong!");
                res.status(400).send({ message: 'Something went wrong!'});
                return;
                
            } catch (e){
                return res.status(e.status).json({ message: e.message});
            }
        default:
            return res.status(400).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;


// export default handler;

// function handler(req, res) {
//     switch (req.method) {
//         case 'GET':
//             return getUsers();
//         case 'POST':
//             return createUser();
//         default:
//             return res.status(405).end(`Method ${req.method} Not Allowed`)
//     }

//     function getUsers() {
//         const users = usersRepo.getAll();
//         return res.status(200).json(users);
//     }
    
//     function createUser() {
//         try {
//             usersRepo.create(req.body);
//             return res.status(200).json({});
//         } catch (error) {
//             return res.status(400).json({ message: error });
//         }
//     }
// }
// eof


// CREATE TABLE `dbwm5gkvx0exp2`.`Users` ( `id` INT NOT NULL AUTO_INCREMENT , `title` VARCHAR(256) NULL , `firstName` VARCHAR(256) NULL , `lastName` VARCHAR(256) NULL , `email` VARCHAR(256) NOT NULL , `user_role` VARCHAR(256) NULL , `password` VARCHAR(256) NULL , `dateCreated` VARCHAR(256) NULL , `dateUpdated` VARCHAR(256) NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

