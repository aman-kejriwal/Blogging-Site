import { z } from "zod";


//Singin Inputs
export const SignInInputs = z.object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string().optional()
});

//SingUp Inputs
export const SignUpInputs = z.object({
    email: z.email(),
    password: z.string().min(6),
    name: z.string().optional()
});

//Create Blog inputs
export const CreateBlogInputs = z.object({
    title: z.string(),
    content: z.string(),
})

//Update Blog Inputs
export const UpdateBlogInputs = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
})

//Google Auth Inputs
export const GoogleAuthInput = z.object({
    name: z.string(),
    email: z.email(),
    picture: z.string().optional()
})


export type SignInInputs = z.infer<typeof SignInInputs>
export type SignUpInputs = z.infer<typeof SignInInputs>
export type CreateBlogInputs = z.infer<typeof CreateBlogInputs>
export type UpdateBlogInputs = z.infer<typeof UpdateBlogInputs>
export type GoogleAuthInput = z.infer<typeof GoogleAuthInput>
