import Image from 'next/image'
import React, { ReactNode } from 'react'
import TodoAppLogo from '../../public/Todo App.svg'
import logo from '../../public/rocket.svg'

interface LayoutProps {
    children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <main className="bg-foreground h-screen overflow-scroll overflow-x-hidden pb-0">
            <section className="bg-background flex justify-center py-10 mb-4 flex-col items-center">
                <div className="flex gap-2">
                    <Image src={logo} alt="Rocket Logo" />
                    <Image src={TodoAppLogo} alt="Todo App Logo" />
                </div>
            </section>
            {children}
        </main>
    )
}

export default Layout
