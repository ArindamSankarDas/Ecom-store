import bcrypt from 'bcrypt';

export async function createHashPWD(password) {
	try {
		const salt = await bcrypt.genSalt(10);

		const hash = await bcrypt.hash(password, salt);

		return hash;
	} catch (error) {
		throw error;
	}
}

export async function compareHashedPWD(availableHashedPWD, compareText) {
	try {
		const isValidPWD = await bcrypt.compare(compareText, availableHashedPWD);

		return isValidPWD;
	} catch (error) {
		throw new Error(error);
	}
}
