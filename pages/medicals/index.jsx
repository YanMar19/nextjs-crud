import { useState, useEffect } from 'react';

import { Link } from 'components';
import { medicalService } from 'services';

export default Index;

function Index() {
    const [medicals, setMedicals] = useState(null);

    useEffect(() => {
        medicalService.getAll().then(x => setMedicals(x));
    }, []);

    function deleteUser(id) {
        setMedicals(medicals.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        medicalService.delete(id).then(() => {
            setMedicals(medicals => medicals.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Medical Isuues</h1>
            <Link href="/medicals/add" className="btn btn-sm btn-success mb-2">Add Medical</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Desription</th>
                        <th style={{ width: '30%' }}>Results</th>
                        <th style={{ width: '30%' }}>Remarks</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {medicals && medicals.map(medical =>
                        <tr key={medical.id}>
                            <td>{medical.description}</td>
                            <tb>{medical.results}</tb>
                            <td>{medical.remarks}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/medicals/edit/${medical.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(medical.id)} className="btn btn-sm btn-danger btn-delete-user" disabled={medical.isDeleting}>
                                    {medical.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!medicals &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {medicals && !medicals.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Medicals To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
