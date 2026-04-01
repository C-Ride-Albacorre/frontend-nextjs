

import AdminLayoutClient from '@/features/admin/layout-client'
import { getCurrentUser } from '@/utils/auth'


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  console.log('Admin User:', user);

  return (
    <AdminLayoutClient user={user}>
      {children}
    </AdminLayoutClient>
  )
}