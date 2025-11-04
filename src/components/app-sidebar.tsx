'use client';

import { ArrowLeftRight, Landmark, PiggyBank } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  sidebarMenuButtonVariants,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import RbIcon from '@/static/rb-icon.svg';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { UserAvatar } from './user-avatar';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { APP_CONFIG } from '@/lib/config';

const items = [
  {
    title: 'Contas',
    url: '/accounts',
    icon: Landmark,
  },
  {
    title: 'Investimentos',
    url: '/investments',
    icon: PiggyBank,
  },
  {
    title: 'Movimentações',
    url: '/transactions',
    icon: ArrowLeftRight,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="overflow-x-hidden">
        <SidebarMenu
          className={cn(
            state === 'expanded' &&
              'flex flex-row items-center justify-between gap-4',
          )}
        >
          <Link href="/">
            <RbIcon
              className={cn(
                state === 'collapsed' && 'mx-auto w-4/5',
                state === 'expanded' && 'px-2',
                'h-8 invert dark:invert-0',
              )}
            />
          </Link>
          <SidebarMenuItem key="trigger">
            <SidebarTrigger
              className={sidebarMenuButtonVariants({
                variant: 'default',
                size: 'default',
              })}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    data-active={pathname.startsWith(item.url)}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="items-center">
        <ThemeToggle triggerVariant="ghost" />
        {APP_CONFIG.withAuth && <UserAvatar icon={state === 'collapsed'} />}
      </SidebarFooter>
    </Sidebar>
  );
}
