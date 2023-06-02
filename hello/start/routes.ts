

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('home')
})


Route.on('/home').render('home')
Route.on('/about').render('about')

Route.on('/signup').render('auth/signup').middleware('guest')
Route.on('/login').render('auth/login').middleware('guest')


Route.get('/verify-email/:email', 'EmailVerifiesController.confirm').as('verifyEmail')
Route.post('/verify-email', 'EmailVerifiesController.index').middleware('auth')

Route.post('/signup', 'AuthController.signup')
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout')



Route.get('/:username','ProfilesController.index').middleware('auth')

