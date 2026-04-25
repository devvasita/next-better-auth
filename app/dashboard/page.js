import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SignOutButton } from "@/components/auth/sign-out-button";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { user } = session;
  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "U";

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Navbar */}
      <header className="border-b bg-background">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <svg
                className="w-4 h-4 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <span className="font-semibold text-sm">MyApp</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image ?? ""} alt={user.name} />
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <SignOutButton />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-semibold">
            Good to see you, {user.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Here's your account overview.
          </p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your Profile</CardTitle>
            <CardDescription>Signed in via Google OAuth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={user.image ?? ""} alt={user.name} />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{user.name}</p>
                  <Badge variant="secondary" className="text-xs">
                    Google
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <svg
                    className="w-3 h-3 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Email verified
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: "Account Status",
              value: "Active",
              color: "text-green-600",
            },
            { label: "Auth Provider", value: "Google" },
            { label: "Session", value: "Valid" },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-5">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className={`text-xl font-semibold mt-1 ${stat.color ?? ""}`}>
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
