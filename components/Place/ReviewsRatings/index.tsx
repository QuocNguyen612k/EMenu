import { Box } from '@material-ui/core'
import { useState } from 'react'
import UserReview from './UserReview'
import RatingOverview from './RatingOverview'
import ReviewsInfo from './ReviewsInfo'
import ReviewModal from './ReviewModal'
import LoginRequiredDialog from '../../common/LoginRequiredDialog'
import useUser from '../../../firebase/useUser'

const ReviewsRatings = () => {
  const { user } = useUser()
  const [openModal, setOpenModal] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenModal = () => {
    user.id !== null ? setOpenModal(true) : setOpenDialog(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  return (
    <>
      <Box display="flex" flexDirection="column" flex={1}>
        <RatingOverview />
        <UserReview />
      </Box>
      <ReviewsInfo handleOpenModal={handleOpenModal} />
      <ReviewModal openModal={openModal} handleCloseModal={handleCloseModal} />
      <LoginRequiredDialog open={openDialog} handleClose={handleCloseDialog} />
    </>
  )
}

export default ReviewsRatings
