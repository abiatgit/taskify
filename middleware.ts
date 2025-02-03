
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'


const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  "/",
  "/marketing"
])

export default clerkMiddleware(async (auth, request) => {
  console.log("request URL",request.url)
  const{ userId,orgId} =  await auth()
  const currentUrl=new URL(request.url)
  console.log("CurrentURL_request URL",currentUrl)

  if(userId && isPublicRoute(request)){
    let path = '/select-org'
    if(orgId){
       path=`/organization/${orgId}`
    }
    const orgSelection=new URL(path,currentUrl)
    return NextResponse.redirect(orgSelection)
  }
if(!userId && !isPublicRoute(request)){
  const signInUrl = new URL('/sign-in', request.url);
  signInUrl.searchParams.set('returnBackUrl',request.url);
  return NextResponse.redirect(signInUrl); 
}


  if(userId && ! orgId && currentUrl.pathname !=='/select-org'){
    const orgSelection=new URL('/select-org',currentUrl.origin)
    return NextResponse.redirect(orgSelection)

  }

  if ( !isPublicRoute(request)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}


