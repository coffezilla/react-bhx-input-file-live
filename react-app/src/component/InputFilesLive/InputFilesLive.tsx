import React from 'react';
import './InputFilesLive.css';

interface IProps {
	inputValue: any;
	setInputValue: any;
	inputValueFile: any;
	customClass?: string;
	maxSize?: number;
	maxFiles?: number;
	fileTypes?: string[];
}

const InputFilesLive = ({
	customClass,
	inputValue,
	setInputValue,
	inputValueFile,
	maxSize = 5000,
	maxFiles = 1,
	fileTypes = ['jpg', 'jpeg', 'png', 'zip'],
}: IProps) => {
	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement> | any) => {
		const currentName: string = e.target.name;
		let totalSizeFile = 0;
		const totalFiles: number = e.target.files.length;

		let canUploadExtension = true;

		if (totalFiles > maxFiles) {
			canUploadExtension = false;
			e.target.value = null;
			setInputValue({
				...inputValue,
				[currentName]: {
					...inputValue[currentName],
					error: `Ops, Máximo de ${maxFiles} arquivos.`,
					value: '',
					files: [],
					total: 0,
				},
			});
		}

		if (canUploadExtension) {
			for (let i = 0; i < totalFiles; i += 1) {
				const nameFile = e.target.files[i].name;
				const lastDot = nameFile.lastIndexOf('.');
				const ext = nameFile.substring(lastDot + 1);
				totalSizeFile += parseInt(e.target.files[i].size, 10);

				if (!fileTypes.includes(ext)) {
					canUploadExtension = false;
				}
			}
		}

		// eslint-disable-next-line
		totalSizeFile /= 1000;
		if (canUploadExtension) {
			if (totalSizeFile > maxSize) {
				console.log('Max size');
				e.target.value = null;
				setInputValue({
					...inputValue,
					[currentName]: {
						...inputValue[currentName],
						error: 'Max size',
						value: '',
						files: [],
						total: 0,
					},
				});
			} else if (!canUploadExtension) {
				console.log('Ops, extension not allowed');
				e.target.value = null;
				setInputValue({
					...inputValue,
					[currentName]: {
						...inputValue[currentName],
						error: 'Ops, extension not allowed',
						value: '',
						files: [],
						total: 0,
					},
				});
			} else if (totalSizeFile <= maxSize && canUploadExtension) {
				setInputValue({
					...inputValue,
					[currentName]: {
						...inputValue[currentName],
						error: '',
						total: totalFiles,
						value: e.target.value,
						files: e.target.files,
					},
				});
			}
		}
	};

	const handleDeleteFile = (e: any, inputName: string) => {
		e.preventDefault();
		e.target.value = null;
		setInputValue({
			...inputValue,
			[inputName]: {
				...inputValue[inputName],
				error: '',
				value: '',
				files: [],
				total: 0,
			},
		});
	};

	return (
		<>
			<div className={`input-file-live__wraper ${customClass && customClass}`}>
				<div
					className={`input-file-live__full ${
						inputValue[inputValueFile].value.length > 0
							? 'input-file-live--empty'
							: 'input-file-live--full'
					}`}
				>
					<button type="button" onClick={(e: any) => handleDeleteFile(e, inputValueFile)}>
						Excluir arquivos
					</button>
					<p className="input-file-live__label">
						{inputValue[inputValueFile].total}
						arquivo(s) carregado(s)
					</p>
				</div>
				<input
					type="file"
					name={inputValueFile}
					value={inputValue[inputValueFile].value}
					onChange={handleChangeFile}
					multiple
				/>
				<div
					className={`input-file-live ${
						inputValue[inputValueFile].value.length > 0
							? 'input-file-live--full'
							: 'input-file-live--empty'
					}`}
				>
					<p className="input-file-live__label">Carregue seu arquivo</p>
				</div>
			</div>
		</>
	);
};

export default InputFilesLive;
