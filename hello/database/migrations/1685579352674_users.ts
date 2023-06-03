import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('lastname')
      table.string('username',20).index()
      table.string('avatar').nullable()
      table.text('details').nullable()
      table.string('email').index()
      table.dateTime('email_verified_at').nullable()
      table.string('password')
      table.timestamps()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
