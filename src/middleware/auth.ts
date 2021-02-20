import { isLoggedIn } from '@/modules/auth/logic/useAuth';

export default function auth({ next }: { next: any }) {
  if (!isLoggedIn.value) {
    return next({
      name: 'signin',
    });
  }

  return next();
}
