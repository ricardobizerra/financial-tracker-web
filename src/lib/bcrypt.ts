import { genSalt, hash } from 'bcryptjs';

export async function saltAndHashPassword(
  password: string | undefined,
  saltRounds: number = 10,
): Promise<string> {
  if (!password) {
    throw new Error('Password cannot be empty');
  }

  const salt = await genSalt(saltRounds);
  const hashedPassword = await hash(password, salt);

  return hashedPassword;
}
