import mongoose from 'mongoose';

/**
 * Task Mongoose Schema
 * Demonstrates:
 * 1. Schema enforcement
 * 2. Field-level validation rules (required, minlength, maxlength, enum)
 * 3. Default values
 * 4. Automatic timestamps (createdAt, updatedAt)
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [3, 'Task title must be at least 3 characters long'],
      maxlength: [100, 'Task title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },
    status: {
      type: String,
      required: [true, 'Task status is required'],
      enum: {
        values: ['Pending', 'In Progress', 'Completed'],
        message: '{VALUE} is not a valid task status. Must be Pending, In Progress, or Completed',
      },
      default: 'Pending',
    },
    priority: {
      type: String,
      required: [true, 'Task priority is required'],
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: '{VALUE} is not a valid priority. Must be Low, Medium, or High',
      },
      default: 'Medium',
    },
    dueDate: {
      type: Date,
      default: null,
      validate: {
        validator: function (value) {
          // If value is provided, ensure it's a valid date
          if (value === null || value === undefined || value === '') return true;
          return !isNaN(new Date(value).getTime());
        },
        message: 'Due date must be a valid date format',
      },
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // Provide both id and _id for maximum client compatibility
        ret.id = ret._id;
        return ret;
      },
    },
  }
);

// Indexes for optimized searching and filtering
taskSchema.index({ status: 1 });
taskSchema.index({ priority: 1 });
taskSchema.index({ createdAt: -1 });
taskSchema.index({ title: 'text', description: 'text' });

const Task = mongoose.model('Task', taskSchema);

export default Task;
