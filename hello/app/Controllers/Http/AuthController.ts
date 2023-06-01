 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import { schema, rules } from '@ioc:Adonis/Core/Validator'
 import User from 'App/Models/User'
 //import Mail from '@ioc:Adonis/Addons/Mail'

export default class AuthController {

    public async signup({request, response}:HttpContextContract){
        
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

        //verification email

        user?.sendVerificationEmail()

        return response.redirect('/login')
    }

    public async login({request, auth, response}:HttpContextContract){
        const req = await request.validate({schema:schema.create({
            email: schema.string({}, [
                rules.email()
            ]),
            password: schema.string({},[
                rules.minLength(8)
            ])
        }),
        messages:{
            'email.required': 'Email is required',
            'password.required': 'Password is required',
            'password.minLength': 'Password is too short',
        }
        })

        const email= req.email
        const password = req.password
        const user = await auth.attempt(email,password)


        return response.redirect('/profile')


    }

    public async logout({auth, response}:HttpContextContract){
        auth.logout()
        return response.redirect('/home')
    }

}
