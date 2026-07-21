import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import FloatingActions from "../components/FloatingActions";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "YUGA Tech Academy — Learn. Build. Excel." },
      { name: "description", content: "Premier IT training institute in Visakhapatnam. Master AI, Cloud, Cybersecurity, Full Stack & Kids Coding with expert trainers, live projects, internships & 95% placement support." },
      { name: "keywords", content: "IT Training Institute Visakhapatnam, Software Courses Vizag, Java Full Stack Course, MERN Stack Developer, Python Programming, AWS Cloud Certification, DevOps Training, Cyber Security Classes, Kids Coding Vizag" },
      { name: "author", content: "YUGA Tech Academy" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      
      // Open Graph / Facebook / WhatsApp Meta Tags
      { property: "og:title", content: "YUGA Tech Academy — Premier IT & Kids Coding Institute" },
      { property: "og:description", content: "Master AI, Cloud, Cyber Security, Full Stack & Kids Coding with expert trainers, live projects & 95% placement support in Visakhapatnam." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "YUGA Tech Academy" },
      { property: "og:url", content: "https://www.yugatechacademy.com" },
      { property: "og:image", content: "https://www.yugatechacademy.com/yugaacademy-logo.jpeg" },
      { property: "og:image:secure_url", content: "https://www.yugatechacademy.com/yugaacademy-logo.jpeg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "YUGA Tech Academy Visakhapatnam" },
      { property: "og:locale", content: "en_US" },
      
      // Twitter Card Meta Tags
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "YUGA Tech Academy — Premier IT & Kids Coding Institute" },
      { name: "twitter:description", content: "Master AI, Cloud, Cyber Security, Full Stack & Kids Coding with live projects & placement support." },
      { name: "twitter:image", content: "https://www.yugatechacademy.com/yugaacademy-logo.jpeg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" },
      { rel: "icon", href: "/yugaacademy-logo.jpeg", type: "image/jpeg" },
      { rel: "canonical", href: "https://yugatechacademy.com" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        
        {/* Google Search Console Site Verification */}
        <meta name="google-site-verification" content="ENTER_YOUR_GSC_VERIFICATION_CODE_HERE" />
        
        {/* Google Analytics (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CD9P8B1YKB" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CD9P8B1YKB');
          `
        }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <FloatingActions />
    </QueryClientProvider>
  );
}
