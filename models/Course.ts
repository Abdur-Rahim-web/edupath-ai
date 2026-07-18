import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  category: string;
  instructor: string; // Could also be a reference to an Instructor or User model
  level: string;
  tags: string[];
  price: number;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    instructor: { type: String, required: true },
    level: { type: String, required: true },
    tags: [{ type: String }],
    price: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;
