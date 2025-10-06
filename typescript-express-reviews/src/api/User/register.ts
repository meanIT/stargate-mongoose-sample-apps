import express, { Request, Response } from 'express';
import Authentication from '../../models/authentication';
import User from '../../models/user';
import bcrypt from 'bcryptjs';

async function register(request: Request, response: Response): Promise<void> {
  if (!request.body) {
    response.status(400).json({ error: 'No body was sent' });
    return;
  }
  if (!request.body.password || request.body.password.length < 6) {
    response.status(400).json({ error: 'password is too short' });
    return;
  }

  const user = await User.create({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email
  });

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(request.body.password, salt);
  await Authentication.create({
    type: 'password',
    userId: user._id,
    secret: hash
  });
  response.status(200).json({ user: user });
}

export default register;
