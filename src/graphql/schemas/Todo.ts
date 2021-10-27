
import { Field, ObjectType, InputType } from 'type-graphql'

@ObjectType()
export class Todo {
  @Field()
  _id: string

  @Field()
  title: string

  @Field()
  description: string
}

@InputType()
export class TodoInput implements Partial<Todo> {
  @Field()
  title: string

  @Field()
  description: string
}
