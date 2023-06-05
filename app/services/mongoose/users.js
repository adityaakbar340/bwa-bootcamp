const Users = require('../../api/v1/users/model');
const Organizer = require('../../api/v1/organizers/model');
const { BadRequestError } = require('../../errors');
const { StatusCodes } = require('http-status-codes');

const createOrganizer = async (req) => {
  const { organizer, email, password, confirmPassword, name, role } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan konfirmasi password tidak cocok');
  }

  const result = await Organizer.create({ organizer });


  const users = await Users.create({
    email,
    name,
    password,
    role,
    organizer: result._id,
  });

  // untuk menghapus key dan value password pas result 200
  delete users._doc.password;
  return users;
};


const createUsers = async (req, res) => {
  const { name, password, role, confirmPassword, email } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan konfirmasi password tidak cocok');
  }

  const result = await Users.create({
    name,
    email,
    organizer: req.user.organizer,
    password,
    role,
  });
  // res.status(StatusCodes.CREATED).json({
  //   data: result
  // });
  return result;
};

const getAllUsers = async (req) => {
  const result = await Users.find();

  return result;
};

module.exports = { createOrganizer, createUsers, getAllUsers };