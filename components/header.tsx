'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
interface HeaderProps {
  onSearch: (query: string) => void,
  session: Session | null
}

export function Header({ onSearch, session }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <div className='bg-gradient-to-r from-purple-600 to-pink-600'>
      <div className='flex justify-end '>
        {session ? (
          <div className='mr-5 mt-5'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image ?? ''} alt={session.user?.name ?? ''} />
                    <AvatarFallback>{session.user?.name ? session.user?.name[0] : ''}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className='mr-5 mt-5'>
            <Button onClick={() => {
              try {
                signIn()
              }
              catch (err) {
                console.error(err);
              }
            }}>登录</Button>
          </div>
        )}
      </div>
      <div className="relative py-12 mb-8">
        {/* <wb:login-button type="3,2" onlogin="login" onlogout="logout">登录按钮</wb:login-button> */}
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white animate-fade-in flex justify-center">
            Photos Gallery
          </h1>
          {/* 自定义微博登录按钮 弃用）*/}
          {/* {createElement('wb:login-button', {
            type: '3,2',
            onlogin: 'login',
            onlogout: 'logout',
          })} */}

          <p className="text-white/90 text-center mb-8 text-lg">
            You can see many interesting photos on this page.
          </p>
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto flex gap-2 relative"
          >
            <Input
              type="search"
              placeholder="Search for photos..."
              className="bg-white/95 h-12 pr-12 text-lg text-black"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className='h-12 flex items-center'>
              <Button
                type="submit"
                size="icon"
                className="h-10 w-10 absolute right-0 bg-transparent mr-3"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] -z-10" />
      </div>
    </div>

  )
}

