'use client'
import { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import {Spinner} from "@heroui/react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {data: session, isPending} = useSession();

  if(isPending) {
    return <div className="flex items-center gap-4">
      <Spinner />
    </div>;
  }

  console.log("Session Data:", session);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <Link href="/"><p className="font-bold">Better Auth</p></Link>
          </div>
        </div>
        <ul className="hidden items-center gap-4 md:flex">
          <li>
            <Link href="/features">Features</Link>
          </li>
          <li>
                {session?.user && (
                  <Link href="/dashboard" className="font-medium text-accent" aria-current="page">
                    Dashboard
                  </Link>
                )}
          </li>
          <li>
            {session?.user && <Link href="/profile">Profile</Link>}
          </li>
        </ul>
        {session?.user? <div className="hidden items-center gap-4 md:flex">
          <p>Welcome, {session.user.name}</p>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div> : <div className="hidden items-center gap-4 md:flex">
          <Link href="/sign-in" className="block py-2">
            Login
          </Link>
          <Button className="w-full"><Link href="/sign-up">Sign Up</Link></Button>
        </div>}
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link href="#" className="block py-2">
                Features
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2 font-medium text-accent">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2">
                Pricing
              </Link>
            </li>
            <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
              {session?.user? <div className="flex flex-col gap-2">
                <p>Welcome, {session.user.name}</p>
                <Button onClick={() => signOut()}>Sign Out</Button>
              </div> : <div className="flex flex-col gap-2">
                <Link href="/sign-in" className="block py-2">
                  Login
                </Link>
                <Button className="w-full"><Link href="/sign-up">Sign Up</Link></Button>
              </div>}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}