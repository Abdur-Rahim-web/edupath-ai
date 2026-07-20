import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  shortDescription?: string;
  description: string;
  category: string;
  instructor: string; // Could also be a reference to an Instructor or User model
  level: string;
  duration?: string;
  imageUrl?: string;
  tags: string[];
  price: number;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    shortDescription: { type: String, required: false },
    description: { type: String, required: true },
    category: { type: String, required: true },
    instructor: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: String, required: false },
    imageUrl: { type: String, required: false },
    tags: [{ type: String }],
    price: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;
