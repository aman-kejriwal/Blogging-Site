import { z } from "zod";
export declare const SignInInputs: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const SignUpInputs: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const CreateBlogInputs: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export declare const UpdateBlogInputs: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export type SignInInputsType = z.infer<typeof SignInInputs>;
export type SignUpInputsType = z.infer<typeof SignUpInputs>;
export type CreateBlogInputsType = z.infer<typeof CreateBlogInputs>;
export type UpdateBlogInputsType = z.infer<typeof UpdateBlogInputs>;
//# sourceMappingURL=index.d.ts.map