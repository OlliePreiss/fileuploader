const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create

async function addUser(name, email, password) {
  try {
    const user = await prisma.user.create({ data:
      {
        name: name,
        email: email,
        password: password
      }
    })
    console.log('Successfully added' + user)
    return user;
  } catch (err) {
    throw err;
  }
};

// Read

async function findUser(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    return user
  } catch (err) {
    throw err;
  }
}

async function findUserById(id) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    return user;
  } catch (err) {
    throw err;
  }
}

async function findAllUsers() {
  try {
    const users = await prisma.user.findMany()
    return users
  } catch (err) {
    throw err;
  }
}

// Delete

async function deleteUser(id) {
  const deleteUser = await prisma.user.delete({
    where: {
      id: id
    }
  })
}

async function deleteAllUsers() {
  const deleteUser = await prisma.user.deleteMany({})
}

module.exports = {
  addUser,
  findUser,
  findUserById
}
