import { useState, useEffect } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarInset,
} from "@/components/ui/sidebar";
import { useAppContext } from "@/context/AppContext";
import Header from "@/components/Header";
import SidebarFooterMenu from "@/components/SidebarFooterMenu";
import SidebarMenuItems from "@/components/SidebarMenuItems";
import { Link } from "react-router-dom";

const MainLayout = ({ children }: { readonly children: React.ReactNode }) => {
  const pathname = "/dashboard";
  const [mounted, setMounted] = useState(false);
  const { user } = useAppContext();

  useEffect(() => {
    setMounted(true);
  }, [user]);

  if (!mounted) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen border border-red-100 w-full">
        <Sidebar>
          <SidebarHeader >
            <Link to="/">
            <div className="flex items-center gap-2 px-4 py-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                FF
              </div>
              <span className="font-semibold text-lg">FormFlow</span>
            </div>
            </Link>
            
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItems pathname={pathname} user={user} />
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarFooterMenu user={user} />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <Header />
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
