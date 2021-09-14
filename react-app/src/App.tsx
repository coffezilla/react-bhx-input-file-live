import { useState } from 'react';
import InputFileLive from './component/InputFileLive';

function App() {
	const [formInputs, setFormInputs] = useState<any>({
		name: { value: '', error: '' },
		attachment1: { value: '', error: '', files: [], total: 0 },
		attachment2: { value: '', error: '', files: [], total: 0 },
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log('great one!', formInputs);
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
				<button type="submit">Submit</button>
			</form>
		</>
	);
}

export default App;
