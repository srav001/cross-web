import path from 'node:path';
import { readFileSync, writeFileSync, renameSync, rmSync } from 'node:fs';

const updateJsonFile = (filePath = 'package.json', keyValues = {}) => {
	if (filePath === '' || keyValues === {}) throw new Error('Invalid Parameters');

	const fileToEditPath = path.resolve(filePath);
	const dataToEdit = JSON.parse(readFileSync(fileToEditPath, { encoding: 'utf8' }));

	if (keyValues.toAdd) {
		// TODO: addition
	}
	if (keyValues.toDelete) {
		const toDelete = keyValues.toDelete;
		toDelete.forEach(key => {
			delete dataToEdit[key];
		});
	}
	if (keyValues.toReplace) {
		const toReplace = keyValues.toReplace;
		toReplace.forEach(keyValue => {
			if (keyValue.deep && keyValue.deep === true) {
				const keysToTraverse = keyValue.key.split('.');
				const keyToUpdate = keysToTraverse.pop();

				const depth = keysToTraverse.length;

				if (depth === 1) {
					const mainKey = keysToTraverse[0];
					const obj = dataToEdit[mainKey];
					obj[keyToUpdate] = keyValue.value;

					dataToEdit[mainKey] = obj;
				} else {
					// TODO: deep nested value
				}
			} else {
				dataToEdit[keyValue.key] = keyValue.value;
			}
		});
	}
 
	return writeFileSync(fileToEditPath, JSON.stringify(dataToEdit, null, 2));
};

const fsRename = (oldPath, newPath) => renameSync(oldPath, newPath);

const fsRm = pathToRemove => rmSync(pathToRemove, { recursive: true, force: true });

export { fsRm, fsRename, updateJsonFile };
