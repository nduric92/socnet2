import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import Post from 'App/Models/Post'
import { DateTime } from 'luxon'


export const UserFactory = Factory
  .define(User, ({ faker }) => {
    return {

        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        details: faker.lorem.paragraph(),
        avatar: faker.image.avatar(),
        email_verified_at: DateTime.local()
    }
  }).relation('posts', () => PostFactory)  .build()

  export const PostFactory = Factory
  .define(Post, ({ faker }) => {
    return {
        caption: faker.lorem.paragraph(),
        image: faker.image.urlPicsumPhotos()

    }
  }).relation('user', () => UserFactory)  .build()
