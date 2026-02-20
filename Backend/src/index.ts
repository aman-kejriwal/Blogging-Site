import { Hono } from 'hono'
import { PrismaClient } from './generated/prisma/edge.js'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { userRoute } from './Routes/users.js'
import { blogRoute } from './Routes/blogs.js'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET_KEY:string
  }
}>()
app.use('/*', cors());
app.route('/api/v1/user',userRoute);
app.route('/api/v1/blog',blogRoute);


export default app

