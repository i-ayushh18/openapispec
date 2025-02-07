import { createRoute,OpenAPIHono } from '@hono/zod-openapi'
import { ParamSchema } from './inputs'
import { UserSchema } from './outputs'
import { Hono } from 'hono'
import { swaggerUI } from '@hono/swagger-ui'


const app=new OpenAPIHono()
const getUserRoute=createRoute({
  method:'get',
  path:'/user/{id}',
  request:{
    params:ParamSchema
  },
  responses:{
    200:{
      content:{
        "application/json":{
          schema:UserSchema
        }
      },
      description:"Get the user details"
    }
  }
})
app.openapi(getUserRoute,(c) => {
  const id = parseInt(c.req.valid("param").id, 10) 
  
  return c.json({
    id,
    age: 20,
    name: 'Ultra-man',
  })

})
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
})
app.get('/ui', swaggerUI({ url: '/doc' }))

export default app
