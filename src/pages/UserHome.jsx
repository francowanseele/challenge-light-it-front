import React, { useEffect, useState } from 'react';
import { Checkbox } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';

import { getDiagnosisApi, getSymptomsApi } from '../api/healthservice';
import Pagination from '../Components/Custom/Pagination/Pagination';
import Navbar from '../Components/UserLogged/Navbar';
import ShowDiagnosis from '../Components/Custom/Diagnosis/ShowDiagnosis';
import ShowDiagnosisHistory from '../Components/Custom/Diagnosis/ShowDiagnosisHistory';
import { getDiagnosisByUserApi } from '../api/user';

export default function UserHome() {
    const [symptoms, setSymptoms] = useState([]);
    const [syptompsToShow, setSyptompsToShow] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPages, setMaxPages] = useState(1);
    const [syptomsSelected, setSyptomsSelected] = useState([]);
    const [diagnosis, setDiagnosis] = useState([]);
    const [diagnosisHistory, setDiagnosisHistory] = useState([]);
    const PAGE_SIZE = 10;

    useEffect(() => {
      const skip = (page - 1) * PAGE_SIZE;

      setSyptompsToShow(symptoms.slice(skip, skip + PAGE_SIZE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])
    

    useEffect(() => {
        getSymptomsApi().then((result) => {
            if (result.ok) {
                setSymptoms(result.symptoms);
                setPage(1);
                setMaxPages(Math.trunc(result.symptoms.length / PAGE_SIZE));
                setSyptompsToShow(result.symptoms.slice(0, PAGE_SIZE));
            } else {
                toast.info(result.message, {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
            }
        });

        getDiagnosisByUserApi().then((result) => {
            if(result.ok) {
                setDiagnosisHistory(result.diagnosis);
            } else {
                toast.info(result.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            }
        })
    }, [])

    const selectSymptoms = (e, s) => {
        let syptomsSelectedAux = syptomsSelected;
        const index = syptomsSelectedAux.indexOf(s.ID);
        if (index !== -1) {
            syptomsSelectedAux.splice(index, 1);
            setSyptomsSelected(syptomsSelectedAux);
        } else {
            setSyptomsSelected([...syptomsSelected, s.ID]);
        }
    }

    const isSelected = (s) => {
        return syptomsSelected.indexOf(s.ID) !== -1;
    }

    const getDiagnosis = async () => {
        const data = {
          symptoms: syptomsSelected,
        };
        const diagnosis = await getDiagnosisApi(data);
        if (diagnosis.ok) {
            setDiagnosis(diagnosis.diagnosis);
        } else {
            toast.info(diagnosis.message, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        }
    }
    
  return (
    <div>
      <Navbar />

      <div className="ml-10">
        <h2 className="mb-10 text-xl">Symptoms</h2>

        {syptompsToShow.length > 0 && (
          <>
            <div className="ml-20">
              {syptompsToShow.map(sypt => (
                <div className="flex" key={sypt.ID}>
                  {isSelected(sypt) ? (
                    <Checkbox
                      id={sypt.ID}
                      label={sypt.Name}
                      onClick={e => selectSymptoms(e, sypt)}
                      defaultChecked
                    />
                  ) : (
                    <Checkbox
                      id={sypt.ID}
                      label={sypt.Name}
                      onClick={e => selectSymptoms(e, sypt)}
                    />
                  )}
                </div>
              ))}
            </div>
            <Pagination page={page} setPage={setPage} maxPages={maxPages} />
          </>
        )}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={getDiagnosis}
        >
          Get Diagnosis
        </button>

        {diagnosis && (
          <ShowDiagnosis
            diagnosis={diagnosis}
            setDiagnosisHistory={setDiagnosisHistory}
            diagnosisHistory={diagnosisHistory}
          />
        )}

        {diagnosisHistory && (
          <ShowDiagnosisHistory diagnosisHistory={diagnosisHistory} />
        )}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
