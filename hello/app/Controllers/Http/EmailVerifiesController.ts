import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
//import Mail from '@ioc:Adonis/Addons/Mail'
//import { Response } from "@adonisjs/core/build/standalone"

export default class EmailVerifiesController {
    public async index({response, auth}:HttpContextContract){
        
        auth.user?.sendVerificationEmail()

        return response.redirect().back()
    }
    
    
    public async confirm({response,request, params}:HttpContextContract){
        if(request.hasValidSignature()){
            const user = await User.findByOrFail('email', params.email)
            user.email_verified_at = DateTime.local()
            user.save()
            return response.redirect('/profile')
        }else{
            return 'Invalid Token'
        }
        

    }


}
