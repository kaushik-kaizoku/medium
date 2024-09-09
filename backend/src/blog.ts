import { Hono } from "hono"
import { verify } from "hono/jwt"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate' 


export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	},
    Variables : {
		userId: string
	}
}>();

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header("Authorization") || ""
    if(!header){
        c.status(401);
        return c.json({error : "unauthorized" });
    }
    const token = header.split(" ")[1]
  
    const payload = await verify(token, c.env.JWT_SECRET)
    if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id as string);
	await next()
})
  
blogRouter.post('/', async (c) => {
    const userId = c.get('userId')
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const post = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })

    return c.json({
        id: post.id
    })
})
  
blogRouter.put('/',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    
    const post = await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
         }
    })

    return c.json({
        id: post.id
    })
})
  
blogRouter.get('/:id',async (c)=> {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const postId = c.req.param('id');
    try{
        const post = await prisma.post.findUnique({
            where:{
                id: postId
            }
        })
        return c.json({
            post
        })
    }catch(e){
        console.log(e);
        c.status(411);
        return c.json({
            msg:"Error while fetching blog post"
        })
    }
    
})
  
blogRouter.get('/bulk',async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const post = await prisma.post.findMany()
    return c.json({
        post
    })
})
  