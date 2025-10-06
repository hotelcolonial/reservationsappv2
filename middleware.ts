// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define las rutas que quieres proteger.
// '/admin(.*)' significa '/admin' y cualquier ruta dentro de ella (ej. /admin/reservas).
const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

// Define las rutas que son públicas y no deben ser protegidas.
// La página de login DEBE ser pública para evitar un bucle de redirección infinito.
const isPublicRoute = createRouteMatcher(["/admin/login(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Si la ruta actual NO es una ruta pública...
  if (!isPublicRoute(req)) {
    // Y SÍ es una ruta protegida...
    if (isProtectedRoute(req)) {
      // ...entonces ejecuta la protección de Clerk.
      // Esto comprueba si el usuario está autenticado. Si no lo está,
      // lo redirigirá automáticamente a la página de login que tienes
      // configurada en tus variables de entorno (NEXT_PUBLIC_CLERK_SIGN_IN_URL).
      await auth.protect();
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
