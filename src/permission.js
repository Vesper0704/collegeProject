import router from './router';
import { getToken } from './utils/auth';

const whiteList = ['/login', '/', '/register','/changePassword','/checkAcc','/ShowPic'];

router.beforeEach(async (to, from, next) => {

	const token = getToken();
	if (token) {
		if (to.path === '/login') {
			next({ path: '/' });
		}
		next();
	} else {
		if (whiteList.indexOf(to.path) !== -1) {
			// in the free login whitelist, go directly
			next();
		}
		else {
			// other pages that do not have permission to access are redirected to the login page.
			//this.$message.warning('Please log in first')

			next(`/login?redirect=${to.path}`);

		}
	}
});
