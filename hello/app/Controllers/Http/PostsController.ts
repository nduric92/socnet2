import Post from 'App/Models/Post'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
 


export default class PostsController {

    public async create({ view }:HttpContextContract) {
        return view.render('posts/create')
    }

    public async store({ request, auth, response }:HttpContextContract){
        const req = await request.validate({
            schema:schema.create({
                caption: schema.string({}),
                image: schema.file({
                    extnames: ['jpg', 'JPG', 'JPEG', 'gif', 'png'],
                })
            }),
            messages:{
                'caption.required': 'Email is required',
                'image.required': 'image is required',
            }
        });

        
        const imageName = new Date().getTime().toString() + `.${req.image.extname}`
        await req.image.move(Application.publicPath('images'), {
        name: imageName
        })
        const post = new Post()
        post.image = `images/${imageName}`
        post.caption = req.caption
        post.userId = auth.user!.id
        post.save()
        return response.redirect(`/${auth.user!.username}`)
        
        
    }



}
