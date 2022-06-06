import { medicalsRepo } from 'helpers';

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getMedicals();
        case 'POST':
            return createMedicals();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getMedicals() {
        const medicals = medicalsRepo.getAll();
        return res.status(200).json(medicals);
    }
    
    function createMedicals() {
        try {
            medicalsRepo.create(req.body);
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }
}
