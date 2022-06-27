import { sql_query } from '../../../helpers/db.js';

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getUserById();
        case 'PUT':
            return updateUser();
        case 'DELETE':
            return deleteUser();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getUserById() {
        console.log("getById");
        const user_id = req.query.id;
        const my_sql_q = `
        SELECT * 
        FROM Users
        WHERE Users.id = ${user_id}
        `;
        console.log(`my_sql_q: ${my_sql_q}`);
        try {
            const results = await sql_query(my_sql_q);
            const resultArray = results[0];
            // console.log(resultArray);
            return res.status(200).json(resultArray);
        } catch (error) {
            return res.status(400).send({message: `User with id: ${user_id} does not exist.`});
        }
    }

    async function updateUser() {
        console.log("updateByID");
        const user_id = req.query.id;
        
        // console.log(`user_id: ${user_id}`);
        const body = req.body;
        // console.log(`id: ${body.id}`);
        const my_sql_q = `
        UPDATE Users
        SET Users.title = "${body.title}",
        Users.firstName = "${body.firstName}",
        Users.lastName = "${body.lastName}",
        Users.email = "${body.email}",
        Users.role = "${body.role}",
        Users.dateUpdated = NOW()
        WHERE Users.id = ${user_id}
        `;
        try {
            console.log(`my_sql_q: ${my_sql_q}`);
            await sql_query(my_sql_q);
            if (body.password != null){
                try{
                    const my_sql_q2 = `
                    UPDATE Users
                    SET Users.password = "${body.password}"
                    WHERE Users.id = ${user_id}
                    `;
                    await sql_query(my_sql_q2);
                }
                catch (error) {
                    return res.status(400).json({ message: error });
                }
            }
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    async function deleteUser() {
        console.log("deleteById");
        const user_id = req.query.id;
        // console.log(`user_id: ${user_id}`);
        const my_sql_q = `
        DELETE FROM Users
        WHERE Users.id = ${user_id}
        `;
        console.log(`my_sql_q: ${my_sql_q}`);
        try {
            await sql_query(my_sql_q);
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ message: 'User does not exist.' });
        }
    }
}
