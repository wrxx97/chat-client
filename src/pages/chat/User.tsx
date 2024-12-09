import type { UserInfo } from '@/index'
import { getUsers } from '@/api/user'
import UserDetails from '@/components/UserDetail'
import UserList from '@/components/UserList'
import { useChatStore } from '@/store'
import { useEffect, useState } from 'react'

export default function User() {
  const users = useChatStore(store => store.users)
  const setUsers = useChatStore(store => store.setUsers)
  const currentUser = useChatStore(store => store.currentUser)

  const [selectUser, setSelectUser] = useState<UserInfo | null>(null)

  useEffect(() => {
    // Fetch users
    if (currentUser) {
      getUsers(currentUser?.ws_id).then((users) => {
        setUsers(users)
      })
    }
  }, [currentUser, setUsers])

  return (
    <>
      <UserList users={users} onSelect={setSelectUser} />
      <UserDetails user={selectUser} />
    </>
  )
}
