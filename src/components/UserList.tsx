import type { UserInfo } from '..'
import SearchIcon from '@mui/icons-material/Search'
import {
  Avatar,
  Box,
  Divider,
  InputAdornment,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  OutlinedInput,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import React, { Fragment } from 'react'

interface UserListProps {
  users: UserInfo[]
  onSelect: (user: UserInfo) => void
}

function UserList({ users, onSelect }: UserListProps) {
  const [selected, setSelected] = React.useState(-1)

  const handleSelect = (index: number) => {
    const user = users[index]
    setSelected(index)
    onSelect(user)
  }

  return (
    <Box
      sx={{
        width: 300,
        height: '100%',
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      <OutlinedInput
        id="input-with-icon-adornment"
        placeholder="Search"
        startAdornment={(
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )}
        sx={{
          'width': 'auto',
          'm': 2,
          '.MuiOutlinedInput-input': {
            padding: '4px 14px',
          },
        }}
      />
      <List
        sx={{
          height: '100%',
          overflowY: 'auto',
        }}
      >
        {users.map((user, index) => (
          <Fragment key={user.id}>
            <ListItemButton
              alignItems="flex-start"
              onClick={() => handleSelect(index)}
              selected={selected === index}
            >
              <ListItemAvatar>
                <Avatar alt={user.fullname} src={user.fullname} />
              </ListItemAvatar>
              <ListItemText
                primary={(
                  <Typography variant="subtitle1" noWrap>
                    {user.fullname}
                  </Typography>
                )}
                secondary={(
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      noWrap
                    >
                      {user.fullname}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      color="text.secondary"
                      style={{ float: 'right' }}
                    >
                      {dayjs(user.created_at).format('DD MMM YYYY')}
                    </Typography>
                  </>
                )}
              />
            </ListItemButton>
            <Divider variant="inset" component="li" />
          </Fragment>
        ))}
      </List>
    </Box>
  )
}

export default UserList
