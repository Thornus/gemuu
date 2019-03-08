const required = (value) => {
	if (!value.toString().trim().length) {
		return 'required';
	}
};

const email = (value) => {
	const isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

	if(!isValid) {
		return 'invalidEmail';
	}
};

const noSpecialChars = (value) => {
	const isValid = value.match(/^[a-zA-Z0-9 ]*$/);

	if(!isValid) {
		return 'noSpecialChars';
	}
};

const password = (value) => {
	const isValid = value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/);

	if(!isValid) {
		return 'invalidPassword';
	}
};

const passwordMatch = (password, passwordConfirm) => {
	if(password !== passwordConfirm) {
		return 'passwordsDontMatch';
	}
};

const phone = (value) => {
	const isValid = value ? value.match(/^[0-9 +-]+$/) : true;

	if(!isValid) {
		return 'invalidPhone';
	}
};

export { required, email, noSpecialChars, password, passwordMatch, phone };
