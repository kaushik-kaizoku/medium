import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput } from "@kaushikkaizoku/common/dist"

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const success = signupInput.safeParse(body)
    if(!success){
      c.status(411)
      return c.json({
        msg:"wrong inputs"
      })
    }
    try{
      const user = await prisma.user.create({
        data : {
          email: body.email,
          password: body.password,
          name: body.name
        }    
      })
      const token = await sign({id: user.id}, c.env.JWT_SECRET)
      return c.json({token})
    }catch(e){
      return c.status(403)
    }	
  })
  
userRouter.post('/signin',async (c) => {
   const prisma = new PrismaClient({
     datasourceUrl: c.env?.DATABASE_URL,
   }).$extends(withAccelerate())
  
   const body = await c.req.json()

   const user = await prisma.user.findUnique({
       where:{
         email: body.email,  
         password: body.password   
     }
   })
   if(!user){
     return c.status(403)
   }else{
     const token = await sign({id: user.id}, c.env.JWT_SECRET)
     return c.text(token)
   }
})