import { z } from "zod";
// Sign in inputs
export const SignInInputs = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});
// Sign up inputs
export const SignUpInputs = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});
// Create blog inputs
export const CreateBlogInputs = z.object({
    title: z.string(),
    content: z.string(),
});
// Update blog inputs
export const UpdateBlogInputs = z.object({
    title: z.string(),
    content: z.string(),
});
//# sourceMappingURL=index.js.map