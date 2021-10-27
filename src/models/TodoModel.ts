import { Schema, model } from 'mongoose';

export interface Todo {
	title: string;
	description: string;
}

const TodoSchema = new Schema<Todo>({
	title: {type: String, required: true},
	description: {type: String, required: true},
});

export const TodoModel  = model<Todo>("Todo", TodoSchema);
