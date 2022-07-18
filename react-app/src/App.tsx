/* eslint-disable */
import { useState } from 'react';
import InputFileLive from './component/InputFileLive';
import InputFilesLive from './component/InputFilesLive';
import { sendContact } from './Api/fileHandle';

function App() {
	const [formInputs, setFormInputs] = useState<any>({
		name: { value: '', error: '' },
		attachment1: { value: '', error: '', files: [], total: 0 },
		attachment2: { value: '', error: '', files: [], total: 0 },
		attachment3: { value: '', error: '', files: [], total: 0 },
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log('great one!', formInputs, formInputs.attachment3.value);

		// console.log('ri', formInputs.attachment3.files.length);

		sendContact(formInputs.attachment3.files.length, formInputs.attachment3.files).then(
			(reponse) => {
				console.log('responsavel');
			},
		);
	};

	return (
		<>
			<pre>{JSON.stringify(formInputs, null, 1)}</pre>
			<form onSubmit={handleSubmit}>
				<InputFileLive
					inputValue={formInputs}
					inputValueFile="attachment1"
					setInputValue={setFormInputs}
					maxSize={1000}
				/>
				<br />
				<InputFileLive
					inputValue={formInputs}
					inputValueFile="attachment2"
					setInputValue={setFormInputs}
				/>
				<br />
				<InputFilesLive
					inputValue={formInputs}
					maxFiles={3}
					inputValueFile="attachment3"
					setInputValue={setFormInputs}
				/>
				<br />
				<button type="submit">Submit</button>
			</form>
		</>
	);
}

export default App;
