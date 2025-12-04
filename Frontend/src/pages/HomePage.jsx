import { useAuth } from '../hooks/useAuth';
import { HomePublic } from './HomePublic';
import { HomePrivate } from './HomePrivate';

export const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <HomePrivate /> : <HomePublic />;
};