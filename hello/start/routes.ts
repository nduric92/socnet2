

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('home')
})


Route.on('/home').render('home')
Route.on('/about').render('about')

Route.on('/signup').render('auth/signup')
Route.on('/login').render('auth/login')

Route.post('/signup', 'AuthController.signup')
Route.post('/login', 'AuthController.login')

//Route.post('/signup', async (req)=> {
//  return 'heyy';
//})

//Route.post('/login', async (req)=> {
//  return 'heyy login';
//})