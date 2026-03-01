import { z } from "zod";
export declare const SignInInputs: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const SignUpInputs: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const CreateBlogInputs: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export declare const UpdateBlogInputs: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export declare const GoogleAuthInput: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    picture: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SignInInputs = z.infer<typeof SignInInputs>;
export type SignUpInputs = z.infer<typeof SignInInputs>;
export type CreateBlogInputs = z.infer<typeof CreateBlogInputs>;
export type UpdateBlogInputs = z.infer<typeof UpdateBlogInputs>;
export type GoogleAuthInput = z.infer<typeof GoogleAuthInput>;
//# sourceMappingURL=index.d.ts.map