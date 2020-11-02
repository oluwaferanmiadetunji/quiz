import jwtDecode from 'jwt-decode';
/**
 * Checks if a user is logged in
 */
export function isLoggedIn() {
	const token = localStorage.Token;
	if (token) {
		const decodedToken = jwtDecode(token);
		if (decodedToken.exp * 1000 < Date.now()) {
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
}
