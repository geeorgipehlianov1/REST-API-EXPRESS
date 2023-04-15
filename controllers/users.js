const router = require('express').Router();

router.post('/register', async (req, res) => {
  console.log('Register');
  res.end();
});

router.post('/login', async (req, res) => {
  console.log('Login');
  res.end();
});

router.get('/logout', async (req, res) => {
  console.log('Log out');
  res.end();
});

module.exports = router;
