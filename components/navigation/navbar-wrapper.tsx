import NavBar from './nav-bar';
import { getAuthInfo } from '@/utils/cookies';

export default async function NavBarWrapper() {
  const { isAuthenticated, role } = await getAuthInfo();

  return <NavBar isLoggedIn={isAuthenticated} role={role} />;
}
