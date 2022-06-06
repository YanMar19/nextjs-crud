import { medicalsRepo } from 'helpers';

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getMedicalById();
        case 'PUT':
            return updateMedical();
        case 'DELETE':
            return deleteMedical();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getMedicalById() {
        const medical = medicalsRepo.getById(req.query.id);
        return res.status(200).json(medical);
    }

    function updateMedical() {
        try {
            medicalsRepo.update(req.query.id, req.body);
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    function deleteMedical() {
        medicalsRepo.delete(req.query.id);
        return res.status(200).json({});
    }
}
