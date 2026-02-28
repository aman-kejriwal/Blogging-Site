import { Hono } from "hono";
import { PrismaClient } from '../generated/prisma/edge.js'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from "hono/jwt";
import { SignInInputs } from "akk-medium-common";
import { SignUpInputs } from "akk-medium-common";

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  }
}>();

userRoute.post('/signup', async (c) => {
  const body = await c.req.json();
  const parsed = SignUpInputs.safeParse(body);
  if (!parsed.success) {
    c.status(403);
    return c.json({
      error: 'Check the Inputs'
    })
  }
  const name = body.name;
  const username = body.email;
  const password = body.password;
  if (!username || !password) {
    c.status(400);
    return c.json({
      error: 'username and password are required',
      received: { hasUsername: !!username, hasPassword: !!password },
    });
  }
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      c.status(403);
      return c.json({ error: 'User already exists' });
    }
    const user = await prisma.user.create({
      data: {
        username,
        password,
        name
      },
    });

    const jwt = await sign({ Id: user.id }, c.env.JWT_SECRET_KEY);
    return c.text(jwt);
  } catch (error) {
    console.log("Error", error);
    c.status(403);
    return c.json({ error: 'Invalid Credentials' });
  }
});

userRoute.post('/signin', async (c) => {
  const body = await c.req.json();
  const parsed = SignInInputs.safeParse(body);
  if (!parsed.success) {
    c.status(411);
    return c.json({
      error: 'Check the Inputs'
    })
  };
  const username = body?.email;
  const password = body?.password;
  if (!username || !password) {
    c.status(400);
    return c.json({ error: 'username and password are required' });
  }
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user || user.password !== password) {
      c.status(403);
      return c.json({ error: 'Either username or password is incorrect' });
    }
    const jwt = await sign({ Id: user.id }, c.env.JWT_SECRET_KEY);
    return c.text(jwt);
  } catch (error) {
    c.status(403);
    console.log(error);
    return c.json({ error: 'Invalid JWT' });
  }
});
userRoute.get('/me', async (c) => {
  const authHeader = c.req.header("Authorization") || "";
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  try {
    const payload = await verify(token, c.env.JWT_SECRET_KEY, "HS256") as { Id: string };
    if (!payload) {
      c.status(403);
      return c.json({
        error: "You are not logged In"
      })
    }
    const prisma = new PrismaClient({
      accelerateUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const user = await prisma.user.findUnique({
      where: {
        id: payload.Id
      },
      select: {
        name: true,
        username: true
      }
    });
    return c.json({
      user
    });
  } catch (error) {
    c.status(403);
    return c.json({
      error: "You are not logged In"
    })
  }
}); 
