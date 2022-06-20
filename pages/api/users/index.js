// import { usersRepo } from 'helpers';
import { sql_query } from '../../../helpers/db.js';

const handler = async (req, res) => {
    // console.log(req.body);
    switch (req.method) {
        case 'GET':
            try{
                const results = await sql_query(`
                SELECT * FROM Users
                `);
                return res.json(results);
            } catch (e){
                res.status(400).json({ status: e.status, message: e.message});
            }
        case 'POST':
            try{
                const body = JSON.parse(req.body);

                const results = await sql_query(`
                SELECT * 
                WHERE Users.email == ${body.email}
                FROM Users
                `);
                console.log(`Log 1: ${results.JSON}`);
                if (results) {
                    console.log(res.status(400).json({ status: e.status, message: 'User with this email already exists'}));
                    return res.status(400).json({ status: e.status, message: 'User with this email already exists'});
                }

                dateCreated = new Date().toISOString();
                console.log(`Log 2: ${results}`);
                results = await sql_query(`
                insert INTO 'Users' (title, firstName, lastName, email, role, password, dateCreated, dateUpdated)
                VALUES ( '${body.title}',
                    '${body.firstName}',
                    '${body.lastName}',
                    '${body.email}',
                    '${body.role}',
                    '${body.password}',
                    '${dateCreated}', 
                    '${dateCreated}'
                `);
                console.log("******************************");
                console.log(`Log 3: ${results}`);
                return res.status(200).json(results);

            } catch (e){
                return res.status(e.status).json({ status: e.status, message: e.message});
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
