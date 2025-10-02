'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Users, User, LogOut, Settings, Plus, Info, MessageCircle, Sparkles, Menu, X } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { href: '/projects', label: 'Проекты', icon: Users },
    { href: '/about', label: 'О нас', icon: Info },
    { href: '/contact', label: 'Контакты', icon: MessageCircle },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-1 sm:space-x-2 group"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                <span className="hidden sm:inline">Proj•Link</span>
                <span className="sm:hidden">P•L</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
            
            <ThemeToggle />

            {user ? (
              <>
                <Link href="/projects/create">
                  <Button className="flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Создать проект</span>
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/profile/${user.id}`} className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Профиль</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Настройки</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={logout}
                      className="text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Выйти</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">
                    Войти
                  </Button>
                </Link>
                <Link href="/register">
                  <Button>
                    Регистрация
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-1">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Открыть меню</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Меню</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setIsOpen(false)}
                      className="p-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Navigation Links */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {navigationItems.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-3 py-3 rounded-md hover:bg-accent transition-colors"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    ))}

                    {/* User Section */}
                    <div className="border-t pt-4">
                      {user ? (
                        <>
                          <Link 
                            href="/projects/create"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center space-x-3 px-3 py-3 rounded-md hover:bg-accent transition-colors mb-3"
                          >
                            <Plus className="w-5 h-5" />
                            <span className="text-sm font-medium">Создать проект</span>
                          </Link>
                          
                          <div className="px-3 py-2">
                            <div className="flex items-center space-x-3 mb-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
                                  {user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{user.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-1">
                              <Link 
                                href={`/profile/${user.id}`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
                              >
                                <User className="w-4 h-4" />
                                <span className="text-sm">Профиль</span>
                              </Link>
                              <Link 
                                href="/settings"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
                              >
                                <Settings className="w-4 h-4" />
                                <span className="text-sm">Настройки</span>
                              </Link>
                              <button
                                onClick={() => {
                                  logout();
                                  setIsOpen(false);
                                }}
                                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent transition-colors w-full text-left text-destructive"
                              >
                                <LogOut className="w-4 h-4" />
                                <span className="text-sm">Выйти</span>
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="space-y-2">
                          <Link 
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center px-4 py-3 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            <span className="text-sm font-medium">Войти</span>
                          </Link>
                          <Link 
                            href="/register"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center px-4 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            <span className="text-sm font-medium">Регистрация</span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
