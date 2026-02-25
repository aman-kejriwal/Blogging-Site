import { Hono } from "hono";
import { Prisma, PrismaClient } from "../generated/prisma";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { CreateBlogInputs, UpdateBlogInputs } from "akk-medium-common";


export const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET_KEY: string;
    },
    Variables: {
        userId: string
    }
}>()

blogRoute.use('/*', async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
    try {
        const user = await verify(token, c.env.JWT_SECRET_KEY, 'HS256');
        if (user) {
            c.set("userId", (user as { Id: string }).Id);
            await next();   
        }
        else {
            c.status(403);
            return c.json({
                error: "you are not logged In"
            });
        }
    } catch (error) {
        c.status(403);
        return c.json({
            error: "you are not logged In"
        });
    }
})

blogRoute.post('/', async (c) => {
    const body = await c.req.json();
    const parsed = CreateBlogInputs.safeParse(body);
    if (!parsed.success) {
        c.status(411);
        return c.json({
            error: 'Check the Inputs'
        })
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId,
            }
        });
        return c.json({
            blog
        });
    } catch (error) {
        c.status(400);
        return c.json({
            error: "Error while creating a blog post"
        });
    }
})
blogRoute.put('/', async (c) => {
    const body = await c.req.json();
    const parsed = UpdateBlogInputs.safeParse(body);
    if (!parsed.success) {
        c.status(411);
        return c.json({
            error: 'Check the Inputs'
        })
    }
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })

        return c.json({
            blog
        });
    } catch (error) {
        c.status(400);
        return c.json({
            error: 'Error while updating the Blog post'
        });
    }
})
// TODO: Add pagination to get the n blogs at first and as the user scroll down they will get more blogs
blogRoute.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.blog.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        }
        );
        return c.json({
            blog
        });
    } catch (error) {
        c.status(400);
        return c.json({
                error: 'Error while fetching the all blog posts'
        })
    }
})

blogRoute.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });
        return c.json({
            blog
        });
    } catch (error) {
        c.status(400);
        return c.json({
            error: 'Error while fetching the first blog post'
        })
    }
})



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjdiM2I4NGExLTdkZGItNGZhZS1iZjU0LTMwNTJhY2QzNjQwZiJ9.BUGW3RgUwVEQvKJVcJhfP62lVM1zXnoWAZqBbmIozQw