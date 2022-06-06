import { AddEdit } from 'components/medicals';
import { medicalService } from 'services';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const medical = await medicalService.getById(params.id);

    return {
        props: { medical }
    }
}