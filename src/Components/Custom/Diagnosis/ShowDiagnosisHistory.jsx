import React from "react";

export default function ShowDiagnosisHistory(props) {
  const { diagnosisHistory } = props;

	return (
    <div className="border-2 mt-10 mr-20 mb-20 p-3">
			<h2>History</h2>
      {diagnosisHistory.map(d => (
        <div className="mt-2" key={d.id}>
          <div className="flex">
            <p className="ml-5 mt-2">{d.accuracy} %</p>
            <p className="ml-5 mt-2">{d.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
