export type AuthMethodType = 'phone' | 'email';

export type AuthType = 'login' | 'register';

export type AuthMethodProps = {
  method: AuthMethodType;
  setMethod: React.Dispatch<React.SetStateAction<'phone' | 'email'>>;
};

export type AuthCarouselType = {
  src: string;
  title: string;
  subtitle: string;
};
