import { body, param, query } from 'express-validator';

/**
 * Task validation rules using express-validator
 * Validates incoming request payloads before reaching the controller.
 */

export const createTaskValidator = [
  body('title')
    .exists({ checkFalsy: true })
    .withMessage('Task title is required')
    .bail()
    .isString()
    .withMessage('Task title must be a string')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Task title must be between 3 and 100 characters'),

  body('description')
    .optional({ checkFalsy: false })
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),

  body('status')
    .optional()
    .trim()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be one of: Pending, In Progress, Completed'),

  body('priority')
    .optional()
    .trim()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be one of: Low, Medium, High'),

  body('dueDate')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage('Due date must be a valid ISO 8601 date string (e.g. YYYY-MM-DD)'),
];

export const updateTaskValidator = [
  body('title')
    .optional()
    .isString()
    .withMessage('Task title must be a string')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Task title must be between 3 and 100 characters'),

  body('description')
    .optional({ checkFalsy: false })
    .isString()
    .withMessage('Description must be a string')
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),

  body('status')
    .optional()
    .trim()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be one of: Pending, In Progress, Completed'),

  body('priority')
    .optional()
    .trim()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be one of: Low, Medium, High'),

  body('dueDate')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601()
    .withMessage('Due date must be a valid ISO 8601 date string (e.g. YYYY-MM-DD)'),
];

export const updateStatusValidator = [
  body('status')
    .exists({ checkFalsy: true })
    .withMessage('Status field is required for status update')
    .bail()
    .trim()
    .isIn(['Pending', 'In Progress', 'Completed'])
    .withMessage('Status must be one of: Pending, In Progress, Completed'),
];

export const taskIdValidator = [
  param('id')
    .trim()
    .isMongoId()
    .withMessage('Invalid Task ID format. Must be a 24-character hexadecimal MongoDB ObjectId'),
];

export const taskQueryValidator = [
  query('status')
    .optional()
    .trim()
    .isIn(['All', 'Pending', 'In Progress', 'Completed'])
    .withMessage('Status query must be All, Pending, In Progress, or Completed'),

  query('priority')
    .optional()
    .trim()
    .isIn(['All', 'Low', 'Medium', 'High'])
    .withMessage('Priority query must be All, Low, Medium, or High'),
];
