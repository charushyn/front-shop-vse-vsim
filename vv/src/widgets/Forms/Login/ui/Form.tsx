'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { setCookie, getCookie } from 'cookies-next';

import { login } from "@/shared/utils/api/requests";
import { useToast } from "@/shared/utils/hooks/use-toast";

import validator from 'validator'


import { Button } from "@/shared/uiShadcn/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/uiShadcn/form"

import { Input } from "@/shared/uiShadcn/input"

import { H1 } from "@/shared/ui/index";
import React from "react";
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"

 
const formSchema = z.object({
  name: z.string().min(1, 'Введіть щось.').max(20, '!'),
  password: z.string().min(1, 'Введіть щось.').max(40, '!')
})

const LoginForm = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const [err, setErr] = React.useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        password: "",
      },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res:any = await login(values.name, values.password)

        console.log(res)
        
        if(res.data.allow){
          setCookie('refreshToken', res.data.token, {maxAge: 60*60, httpOnly: true})
          router.push(`/admin`)
        } else {
          setErr(true)
        }
    }


    return (
        <div className="p-4 flex flex-col" id='login-form'>
            <hr className=" bg-black h-[1px] border-0 t-s:m-10"></hr>
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={` space-y-4 m-l:w-[80%] t-m:w-[50%] d-s:w-[33%] d-s:flex d-s:flex-col w-full mx-auto relative`}>
                    <H1 text="Login" className="text-center text-white"></H1>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-white">Логін</FormLabel>
                            <FormControl>
                                <Input placeholder="example@mail.com" className="bg-black text-white" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-white">Пароль</FormLabel>
                            <FormControl>
                                <Input placeholder="password" className="bg-black text-white" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className={`w-full h-fit p-2 bg-red-500 text-white text-center ${err ? 'flex' : 'hidden'}`}>
                          Неправильне імʼя або ж пароль!
                        </div>
                        <Button type="submit" className="w-full " variant={"secondary"}>Submit</Button>
                    </form>
            </Form>
        </div>
      )
    }

export default LoginForm;