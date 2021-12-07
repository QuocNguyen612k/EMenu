import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import { Button } from '@material-ui/core'
import User from '../models/user'
import { useRouter } from 'next/router'

interface Props {
  user: User
  logout: () => Promise<void>
}

export default function UserMenu({ user, logout }: Props) {
  // const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const router = useRouter()

  const hasDisplayName = user.name !== null
  const hasProfilePic = user.profilePic !== null

  const displayName = hasDisplayName ? user.name : user.email
  const profilePic = hasProfilePic ? user.profilePic : displayName

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }
  const gotoProfile = () => router.push(`/user/${user.id}/profile`)

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
      anchorRef.current!.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <div style={{ marginLeft: '40%' }}>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        style={{ color: 'grey' }}
        // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
        endIcon={<Avatar src={profilePic!} alt={`${displayName}'logo`} />}
      >
        {displayName}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={() => gotoProfile()}>Thông tin</MenuItem>

                  <MenuItem onClick={() => logout()}>Đăng xuất</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}
