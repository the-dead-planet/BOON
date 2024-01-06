import mongoose from 'mongoose';

const User = mongoose.model('User');

const createUser = ({ email, password, team }: { email: string; password: string; team: string; }) =>
    User.register(new User({ username: email, publicName: email, team }), password);

const createUsers = (users: { email: string; password: string; team: string; }[]) => Promise.all(users.map(user => createUser(user)));

export { createUser, createUsers };
