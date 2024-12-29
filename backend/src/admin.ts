import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const adminRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
    }
}>();

adminRouter.use('/*', async (c, next) => {
    const header = c.req.header("Authorization") || ""
    if(!header){
        c.status(401);
        return c.json({error : "unauthorized" });
    }
    const token = header  
        if (token == "admin"){
            await next()
        }else {
            c.status(402);
            return c.json({ error: "unauthorized" , token});
        }
        
})

adminRouter.get('/users', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const users = await prisma.user.findMany({
        select: {
            email: true,
            name: true,
            id: true
        }
    });

    return c.json({
        users
    })
})

adminRouter.get('/blogs', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const blogs = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})