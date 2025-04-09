import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { decrypt } from '@/lib/session';
import { getUserById } from '@/data-access/users';
import { Providers } from '../providers';
import '../globals.css'


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = (await cookies()).get('session')?.value;

    if (!session) {
        redirect('/login');
    }

    const payload = await decrypt(session);
    if (!payload) {
        redirect('/login');
    }

    const user = await getUserById(payload.userId);
    if (!user.length) {
        redirect('/login');
    }

    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
