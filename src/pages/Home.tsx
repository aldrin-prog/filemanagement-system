import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import LoadingBar from "@/components/LoadingBar";
export default function Home() {
  const { user } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      setIsLoading(false);
    }
    if(!isLoading && !user) {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, [user]);
  if(isLoading) {
    return (
      <LoadingBar/>
    );
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className=" flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold">FormFlow</h1>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium hover:underline"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium hover:underline"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <Link
                to="/dashboard"
                className="text-sm font-medium hover:underline"
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className=" py-12 md:py-24 lg:py-32">
          <div className=" px-4 md:px-6 w-full">
            <div className="flex flex-col  items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Streamline Your Form Submissions
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Easily collect and manage form submissions with file uploads.
                  Access your data through a powerful admin dashboard.
                </p>
              </div>
              <div className="space-x-4">
                <Link to="/submit">
                  <Button>
                    Submit a Form
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline">Admin Login</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className=" px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Secure Submissions</h3>
                <p className="text-muted-foreground">
                  All form submissions are securely stored with proper
                  authentication and authorization.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">File Management</h3>
                <p className="text-muted-foreground">
                  Upload and manage files with ease. All files are stored
                  securely in S3 buckets.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Admin Dashboard</h3>
                <p className="text-muted-foreground">
                  Access all submissions through a powerful admin dashboard with
                  filtering and search capabilities.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6">
        <div className=" flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            © 2025 FormFlow. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link to="#" className="text-sm font-medium hover:underline">
              Terms
            </Link>
            <Link to="#" className="text-sm font-medium hover:underline">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
