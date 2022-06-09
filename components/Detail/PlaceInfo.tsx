import { Place } from '@/models/place'
import { Box, Chip, Divider, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { useStyles } from '@/styles/detail'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import { toAvgRating } from 'helpers/toAvgRating'
import useUser from '@/firebase/useUser'
import { addToSaved, removeFromSaved } from '@/services/user'
import LoginRequiredDialog from '../common/LoginRequiredDialog'
import FavoriteIcon from '@material-ui/icons/Favorite'

interface Props {
  place_data: Place
}

const PlaceInfo = ({ place_data }: Props) => {
  const classes = useStyles()
  const theme = useTheme()
  const { user } = useUser()
  const [openDialog, setOpenDialog] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const ratingsCount = place_data.rating
    ? Object.keys(place_data.rating).length
    : 0
  const avgRating = place_data.rating ? toAvgRating(place_data.rating) : 0

  const isSaved =
    user && user.id !== '' && user.saved && user.saved.includes(place_data.id)

  const handleToggleSave = () => {
    if (user.id !== '') {
      isSaved
        ? removeFromSaved(user.id, place_data.id)
        : addToSaved(user.id, place_data.id)
    } else {
      setOpenDialog(true)
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <Box className={classes.infoWrapper}>
      <Typography variant="h4" style={{ fontWeight: 'bold' }}>
        {place_data.name}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" className={classes.description}>
          <Typography variant="body2" color="textSecondary" noWrap>
            {`${place_data.type} ${isMobile ? '' : '•'}`}&nbsp;
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {` ${avgRating} ★ (${ratingsCount}) • 0.5km • $$`}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ gap: '2%' }}
        >
          <Chip
            label={
              <Box display="flex" alignItems="center" style={{ gap: '0.4rem' }}>
                <InfoOutlinedIcon fontSize="small" />
                {!isMobile && (
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    Chi tiết
                  </Typography>
                )}
              </Box>
            }
            clickable
            className={classes.chip}
          />
          <Chip
            label={
              <Box display="flex" alignItems="center" style={{ gap: '0.4rem' }}>
                {isSaved ? (
                  <FavoriteIcon color="primary" fontSize="small" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
                {!isMobile && (
                  <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                    {isSaved ? 'Đã lưu' : 'Lưu'}
                  </Typography>
                )}
              </Box>
            }
            clickable
            onClick={() => handleToggleSave()}
            className={classes.chip}
          />
        </Box>
      </Box>
      <LoginRequiredDialog open={openDialog} handleClose={handleCloseDialog} />
      <Divider style={{ marginTop: '2.3rem' }} />
    </Box>
  )
}

export default PlaceInfo
