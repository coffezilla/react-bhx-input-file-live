import axios from 'axios';

// POST
export const sendContact = async (totalFiles, userFile) => {
	let serverResponse = { data: { status: 0 } };
	const formData = new FormData();
	formData.append('userFile1', userFile[0]);
	formData.append('userFile2', userFile[1]);
	formData.append('userFile3', userFile[2]);
	formData.append('userFile4', userFile[3]);
	formData.append('userFile5', userFile[4]);
	formData.append('userFile6', userFile[5]);
	formData.append('userFile7', userFile[6]);
	formData.append('userFile8', userFile[7]);
	formData.append('userFile9', userFile[8]);
	formData.append('userFile10', userFile[9]);
	formData.append('total', totalFiles);

	console.log('fuck me', userFile);

	//
	// prettier-ignore
	const END_POINT = '/api/app/file_upload.php';
	await axios(
		{
			method: 'post',
			url: END_POINT,
			data: formData,
		},
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		},
	)
		.then((response) => {
			console.log('finalizado', response);
			serverResponse = {
				data: {
					status: response.data.status,
					message: response.data.message,
				},
			};
		})
		.catch(() => {});
	return serverResponse;
};

export const fullname = () => {
	'my name is Joelba';
};
