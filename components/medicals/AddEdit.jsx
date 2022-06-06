import { useRouter } from 'next/router';
//import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Link } from 'components';
import { medicalService, alertService } from 'services';

export { AddEdit };

function AddEdit(props) {
    const medical = props?.medical;
    const isAddMode = !medical;
    const router = useRouter();
    //const [showPassword, setShowPassword] = useState(false);
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        description: Yup.string()
            .required('Description is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (!isAddMode) {
        const { ...defaultValues } = medical;
        formOptions.defaultValues = defaultValues;
    }

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        return isAddMode
            ? createMedical(data)
            : updateMedical(medical.id, data);
    }

    function createMedical(data) {
        return medicalService.create(data)
            .then(() => {
                alertService.success('Medical added', { keepAfterRouteChange: true });
                router.push('.');
            })
            .catch(alertService.error);
    }

    function updateMedical(id, data) {
        return medicalService.update(id, data)
            .then(() => {
                alertService.success('Medical updated', { keepAfterRouteChange: true });
                router.push('..');
            })
            .catch(alertService.error);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{isAddMode ? 'Add Medical' : 'Edit Medical'}</h1>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Description</label>
                    <input name="description" type="text" {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
            </div>
            <div className="form-row">
            <div className="form-group col-7">
                    <label>Results</label>
                    <input name="results" type="text" {...register('results')} className={`form-control ${errors.results ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.results?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Remarks</label>
                    <input name="remarks" type="text" {...register('remarks')} className={`form-control ${errors.remarks ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.remarks?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary mr-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/medicals" className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}