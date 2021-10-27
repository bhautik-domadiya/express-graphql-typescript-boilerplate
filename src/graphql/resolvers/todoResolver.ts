import {Query, Resolver, Mutation, Arg} from 'type-graphql'
import {Todo, TodoInput} from '../schemas/Todo'
import {TodoModel} from "../../models/TodoModel";

@Resolver(() => Todo)
export class TodoResolver {

    @Query(() => [Todo], {nullable: true})
    async getTodos(): Promise<any> {
        return TodoModel.find();
    }

    @Mutation(() => Todo)
    async addTodo(
        @Arg('todoInput') {title, description}: TodoInput
    ): Promise<any> {
        const todo = {
            title,
            description,
        }
        const todoCreate = new TodoModel(todo);
        return new Promise((resolve, reject) => {
            todoCreate.save(err => {
                if (err) reject(err);
                else resolve(todoCreate);
            });
        });
    }
}
