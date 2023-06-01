 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {

    public async signup({request}:HttpContextContract){
        
        const req = await request.validate({
            schema:schema.create({

                name: schema.string(),
                lastname: schema.string(),
                username: schema.string(),
                email: schema.string({},[
                    rules.email()
                ]),
                password: schema.string({},[
                    rules.minLength(8)
                ])
            }),
            messages:{
                'name.required': 'Name required',
                'lastname.required': 'Lastname required',
                'username.required': 'Username required',
                'email.required': 'email required',
                'password.required': 'password required',
            }
        })

        console.log(req);

        const user = new User()
        user.name = req.name
        user.lastname = req.lastname
        user.username = req.username
        user.email = req.email
        user.password = req.password
        await user.save();

        return response.redirect('/about')
    }


}
