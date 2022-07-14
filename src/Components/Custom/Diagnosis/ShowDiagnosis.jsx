import React from "react";
import { ToastContainer, toast } from "react-toastify";

import { addDiagnosisApi } from "../../../api/user";

export default function ShowDiagnosis(props) {
  const { diagnosis, diagnosisHistory, setDiagnosisHistory } = props;

  const confirmDiagnosis = async d => {
    const data = {
      name: d.Issue.Name,
      accuracy: d.Issue.Accuracy,
    };
    const added = await addDiagnosisApi(data, d.Issue.ID);
    if (added.ok) {
      const newDiagnosis = {
        id: added.diagnosis.id,
        name: added.diagnosis.Name,
        accuracy: added.diagnosis.Accuracy
      }
      setDiagnosisHistory([...diagnosisHistory, newDiagnosis]);

      toast.info('Diagnosis added to your history', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.info(added.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="border-2 mt-10 mr-20 mb-20 p-3">
      {diagnosis.map(d => (
        <div className="mt-2" key={d.Issue.ID}>
          <div className="flex">
            <button
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              onClick={() => confirmDiagnosis(d)}
            >
              Confirm
            </button>
            <p className="ml-5 mt-2">{d.Issue.Accuracy} %</p>
            <p className="ml-5 mt-2">{d.Issue.Name}</p>
          </div>
        </div>
      ))}

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
