import { createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser, getAuth, signOut, onAuthStateChanged, updatePassword } from "firebase/auth";
import { auth, db } from "./Firebase";
import { doc, collection, setDoc, deleteDoc, getDoc, updateDoc, addDoc } from "firebase/firestore";
import { Tables, Result, LogTypes } from "./FirebaseEntities";
import { underAgeValidate } from "../Helpers/DateHelpers";
import { Error, Firebase } from "../Constants/Messages";
import { String } from "../Constants/Data";
import { Routes, StatusCode, Symbol } from "../Constants/Environment";

export async function handleRegistrationAsync(email, password, firstname, surname, confirmedPassword, gender, birthdate, country, countrycode, id) {
	if (!email || !password || !firstname || !surname || !confirmedPassword || !gender || gender === "" || !birthdate || !country || !countrycode || !id)
		return new Result(null, Error.ALL_FIELDS__REQUIRED);

	if (password !== confirmedPassword) return new Result(null, Error.CONFIRMED_PASSWORD_DOES_NOT_MATCH);

	if (!underAgeValidate(birthdate)) return new Result(null, Error.AGE_LIMITION);

	return createUserWithEmailAndPassword(auth, email, password)
		.then(async (userCredential) => {
			// Signed in
			const user = userCredential.user;

			await setDoc(doc(db, Tables.Accounts, user.uid), {
				firstname,
				surname,
				gender,
				birthdate,
			});

			await setDoc(doc(db, Tables.Countries, user.uid), {
				country,
				countrycode,
				id,
			});

			return new Result(user, StatusCode.SUCCESS);
		})
		.catch((error) => {
			let message = ReadFireBaseErrorCode(error.code);
			handleErrorAsync(LogTypes.Error, message);
			return new Result(false, message);
		});
}

export async function login(email, password) {
	const auth = getAuth();
	return await signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;

			if (user) {
				return new Result(user, StatusCode.SUCCESS);
			} else {
				return new Result(user, StatusCode.FAILED);
			}
		})
		.catch((error) => {
			let message = ReadFireBaseErrorCode(error.code);
			handleErrorAsync(LogTypes.Error, message);
			return new Result(false, message);
		});
}

export function logout() {
	const auth = getAuth();
	try {
		signOut(auth);
		return new Result(true, StatusCode.SUCCESS);
	} catch (error) {
		let message = ReadFireBaseErrorCode(error.code);
		handleErrorAsync(LogTypes.Error, message);
		return new Result(false, message);
	}
}

export async function deleteAsync(user) {
	return await Promise.resolve(
		await deleteUser(user)
			.then(async () => {
				await deleteDoc(doc(db, Tables.Accounts, user.uid));
				return new Result(true, StatusCode.SUCCESS);
			})
			.catch((error) => {
				let message = ReadFireBaseErrorCode(error.code);
				handleErrorAsync(LogTypes.Error, message);
				return new Result(false, message);
			})
	);
}

export function getAuthState() {
	const auth = getAuth();

	onAuthStateChanged(auth, (user) => {
		if (user) {
			return user;
		} else {
			return null;
		}
	});
}

export async function getAccount(uid) {
	try {
		const docRef = doc(db, Tables.Accounts, uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return new Result(docSnap.data(), StatusCode.SUCCESS);
		} else {
			return new Result(null, Firebase.DEFAULT);
		}
	} catch (error) {
		let message = ReadFireBaseErrorCode(error.code);
		handleErrorAsync(LogTypes.Error, message);
		return new Result(false, message);
	}
}

export async function getCountry(uid) {
	try {
		const docRef = doc(db, Tables.Countries, uid);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return new Result(docSnap.data(), StatusCode.SUCCESS);
		} else {
			return new Result(null, Firebase.DEFAULT);
		}
	} catch (error) {
		let message = ReadFireBaseErrorCode(error.code);
		handleErrorAsync(LogTypes.Error, message);
		return new Result(false, message);
	}
}

export async function updateAccountAsync(uid, firstname, surname, gender, birthdate) {
	try {
		if (!firstname || !surname || !gender || gender === String.Empty || !birthdate) return new Result(null, Error.ALL_FIELDS__REQUIRED);

		if (!underAgeValidate(birthdate)) return new Result(null, Error.AgeLimition);

		const docRef = doc(db, Tables.Accounts, uid);
		await updateDoc(docRef, {
			firstname,
			surname,
			gender,
			birthdate,
		});
		return new Result(true, StatusCode.SUCCESS);
	} catch (error) {
		let message = ReadFireBaseErrorCode(error.code);
		handleErrorAsync(LogTypes.Error, message);
		return new Result(false, message);
	}
}

export async function updateCountryAsync(uid, country, countrycode, id) {
	try {
		if (!country || !countrycode || !id) return new Result(null, Error.ALL_FIELDS__REQUIRED);

		const docRef = doc(db, Tables.Countries, uid);
		await updateDoc(docRef, {
			country,
			countrycode,
			id,
		});
		return new Result(true, StatusCode.SUCCESS);
	} catch (error) {
		let message = ReadFireBaseErrorCode(error.code);
		handleErrorAsync(LogTypes.Error, message);
		return new Result(false, message);
	}
}

export async function changePassword(user, newPassword, confirmedPassword) {
	if (newPassword !== confirmedPassword) return new Result(null, Error.CONFIRMED_PASSWORD_DOES_NOT_MATCH);

	return await Promise.resolve(
		await updatePassword(user, newPassword)
			.then(async () => {
				return new Result(true, StatusCode.SUCCESS);
			})
			.catch((error) => {
				let message = ReadFireBaseErrorCode(error.code);
				handleErrorAsync(LogTypes.Error, message);
				return new Result(false, message);
			})
	);
}

export async function handleTicketAsync(firstname, surname, email, subject, message) {
	try {
		if (!email || !firstname || !surname || !subject || !message) return new Result(null, Error.ALL_FIELDS__REQUIRED);

		var ticket = {
			firstname: firstname,
			surname: surname,
			email: email,
			subject: subject,
			message: message,
			createdDate: new Date().toUTCString(),
		};

		const docRef = await addDoc(collection(db, Tables.Tickets), ticket);

		if (window.location.hostname === Routes.DEV_BASE) {
			console.log("Ticket id:", docRef.id);
		}

		return new Result(docRef.id, StatusCode.SUCCESS);
	} catch (error) {
		let message = ReadFireBaseErrorCode(error.code);
		handleErrorAsync(LogTypes.Error, message);
		return new Result(false, message);
	}
}

export async function handleErrorAsync(logType, message) {
	try {
		if (window.location.hostname === Routes.DEV_BASE) {
			console.log(message);
		}

		var logData = {
			message: message,
			dateTime: new Date().toUTCString(),
			logType: logType,
		};

		const docRef = await addDoc(collection(db, Tables.Logs), logData);

		if (window.location.hostname === "localhost") {
			console.log("Log id:", docRef.id);
		}
	} catch (error) {
		let message = ReadFireBaseErrorCode(error.code);

		if (window.location.hostname === Routes.DEV_BASE) {
			console.log(message);
		}

		return new Result(false, message);
	}
}

function ReadFireBaseErrorCode(errorCode) {
	if (!errorCode) return Firebase.DEFAULT;

	return errorCode.replace(Firebase.PREFIX, String.Empty).split(Symbol.Dash).join(String.Space);
}
