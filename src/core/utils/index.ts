import * as fs from 'fs';
import * as dotenv from 'dotenv';

export const eskizSMS = (code: number) => {
  return `ClinicsPlus platformasiga ro‘yxatdan o‘tish uchun tasdiqlash kodi: ${code}`;
};

export const updateEnvFile = (key: string, newValue: string) => {
  try {
    const envFile = fs.readFileSync('.env', 'utf8');
    const lines = envFile.split('\n');

    const updatedLines = lines.map((line) =>
      line.startsWith(`${key}=`) ? `${key}=${newValue}` : line,
    );

    fs.writeFileSync('.env', updatedLines.join('\n'));
    dotenv.config({ override: true });
  } catch (error) {
    console.error('Error updating env file:', error);
  }
};

export const getEnvValue = (key: string): string | undefined => {
  const env = fs.readFileSync('.env', 'utf8');
  const line = env.split('\n').find((line) => line.startsWith(`${key}=`));
  return line?.split('=')[1];
};
