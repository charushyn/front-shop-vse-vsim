// 'use server'

// import { NextResponse } from 'next/server'
// import type { NextFetchEvent, NextRequest } from 'next/server'
// import { cookies } from 'next/headers';
// import { CustomMiddleware } from './chain';

// async function verifyAuth(request: NextRequest) {
//     const cookieStore = cookies()
//     if(request.nextUrl.pathname.includes('admin')){
//           if(!cookieStore.get('refreshToken')?.value){
//             return NextResponse.redirect(`${process.env.FRONTEND}/login`)
//           }
//           let headers = new Headers();
//           headers.append('Content-Type', 'application/json');
//           headers.append('Accept', 'application/json');
//           headers.append('Cookie', `${cookieStore}`)
//           const res = await fetch(`${process.env.BACKEND}/verify`, {
//             method: 'GET',
//             mode: 'cors',
//             credentials: 'include',
//             headers: headers
//           }).then(data => {
//             if(data.ok){
//                return data.json()
//             }
//             throw new Error()
//           }).catch((e) => console.log(e))

//           if(!res?.allow){
//             return NextResponse.redirect(`${process.env.FRONTEND}/login`)
//           }

//     }

//     if(request.nextUrl.pathname.includes('login')){
//       if(cookieStore.get('refreshToken')?.value){
//         let headers = new Headers();
//           headers.append('Content-Type', 'application/json');
//           headers.append('Accept', 'application/json');
//           headers.append('Cookie', `${cookieStore}`)
//           const response = await fetch(`${process.env.BACKEND}/verify`, {
//             method: 'GET',
//             mode: 'cors',
//             credentials: 'include',
//             headers: headers
//           }).then(data => {
//             if(data.ok){
//                return data.json()
//             }
//             throw new Error()
//           }).catch((e) =>
//               console.log(e)
//             )

//           if(response?.allow){
//             return NextResponse.redirect(`${process.env.FRONTEND}/admin`)
//           }
//         }
//     }
// }
