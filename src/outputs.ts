import {z} from '@hono/zod-openapi'

export const UserSchema=z.object({
    name:z.string().min(1).max(10).openapi({
        example:"John"
    }),
    age:z.number().int().openapi({
        example:12
    }),
    id:z.number().int().openapi({
        example:24
    })
})