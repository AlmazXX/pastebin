export type JwtPayload = {
  email: string;
  sub: number;
  iat: number;
  exp: number;
};

export type RawJwtPayload = Omit<JwtPayload, 'iat' | 'exp'>;
