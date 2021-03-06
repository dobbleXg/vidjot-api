const { body, param, checkSchema } = require('express-validator');

let schema = {
  "status": {
    in: "body",
    isIn: {
      options: [["public", "private", "unpublished"]],
      errorMessage: "Invalid status"
    }
  }
}

exports.validate = (details) => {
  switch (details) {
    case 'register': {
      return [
        body('name', 'Name is Required')
          .isLength({ min: 2 })
          .trim()
          .escape()
          .withMessage('Name should not be less than 2 characters'),
        body('email', 'Email is Required')
          .isEmail()
          .normalizeEmail()
          .withMessage('Enter a valid email'),
        body('password', 'Password is Required')
          .isLength({ min: 3 })
          .trim()
          .escape()
          .withMessage('Password must be at least 3 characters long'),
        checkSchema(schema)
      ];
    }

    case 'login': {
      return [
        body('email')
          .isEmail()
          .normalizeEmail()
          .withMessage('Enter a valid email'),
        body('password')
          .isLength({ min: 3 })
          .withMessage('Password is required'),
      ];
    }

    case 'delete': {
      return [
        param('userId')
          .optional()
          // .isMongoId()
          // .withMessage('ID should be a Mongo ID'),
      ];
    }

    case 'profileUpdate': {
      return [
        param('userId')
          .exists()
          .withMessage('ID is required')
          .isMongoId()
          .withMessage('ID should be a Mongo ID'),
        body('name').isLength({ min: 2 }).optional().withMessage('Name should not be less than 2 characters'),
        body('bio').optional().isString(),
        checkSchema(schema)
      ];
    }
  }
}
