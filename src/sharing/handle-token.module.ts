import * as jwt from 'jsonwebtoken';

export class HandleToken {

  sign(payload): string {
    return jwt.sign(
      {
        payload,
      },
      process.env.SECRET_KEY,
      { expiresIn: '7d' },
    );
  }
  
}
