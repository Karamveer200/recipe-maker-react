const { check, validationResult } = require('express-validator');

const express = require('express');
const router = express.Router();

//@route POST user/register
//desc - Post register user email

router.post(
  '/register',
  [check('email', 'Valid email is required').isEmail().not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { accountId = '', email } = req.body;

      const params = { [HCS_KEYS.user_account_id]: accountId, [HCS_KEYS.email]: email };
      await insertUserEmail(params);

      res.send('Success');
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
