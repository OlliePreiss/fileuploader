const session = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');
const { application } = require('express');


const sessionConfig = session({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 // ms
  },
  secret: 'a santa at nasa',
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(
    new PrismaClient(),
    {
      checkPeriod: 2 * 60 * 1000,  //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }
  )
});



module.exports = sessionConfig
