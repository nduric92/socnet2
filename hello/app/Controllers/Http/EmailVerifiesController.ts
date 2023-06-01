import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import Mail from '@ioc:Adonis/Addons/Mail'
//import { Response } from "@adonisjs/core/build/standalone"

export default class EmailVerifiesController {
    public async index({response, auth}:HttpContextContract){
        
        auth.user?.sendVerificationEmail()

        return response.redirect().back()
    }
}
