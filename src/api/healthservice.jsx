import { getAccessTokenApi } from "./auth";

export async function getSymptomsApi() {
  const url = `${process.env.REACT_APP_HOST_API}/api/symptoms`;
	const token = getAccessTokenApi();

	if (!token) return null;

	const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
			Authorization: token,
    },
  };

  return fetch(url, params)
    .then(response => {
      if (response.status === 501) {
        return null;
      } else {
        return response.json();
      }
    })
    .then(result => {
      return result;
    })
    .catch(_ => {
      return {
        ok: false,
        message: "App error",
      };
    });
}

export async function getDiagnosisApi(data) {
  const url = `${process.env.REACT_APP_HOST_API}/api/diagnosis`;
	const token = getAccessTokenApi();

	if (!token) return null;

	const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
			Authorization: token,
    },
		body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then(response => {
      if (response.status === 501) {
        return null;
      } else {
        return response.json();
      }
    })
    .then(result => {
      return result;
    })
    .catch(_ => {
      return {
        ok: false,
        message: "App error",
      };
    });
}
