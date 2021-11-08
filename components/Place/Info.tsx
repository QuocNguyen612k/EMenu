import { Place } from '../../models/place'
import { Box, Typography, Breadcrumbs } from '@material-ui/core'
import { nonAccentVietnamese, moneyFormatter } from '../../functions'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined'
import PlaceRating from './PlaceRating'
import Link from 'next/link'
import moment from 'moment'

interface Props {
  place: Place
}

export default function Info({ place }: Props) {
  const now = moment([])

  // Khánh Hòa -> khanh-hoa
  const normalizeText = (text: string) =>
    nonAccentVietnamese(text).toLowerCase().replace(' ', '-')

  const isOpen = now.isBetween(
    moment(place.time.open, 'h:mma'),
    moment(place.time.close, 'h:mma')
  )

  const menu = place.menu
  const menuItems = Object.keys(menu).map(Number)

  const maxItemID = menuItems.reduce((prev, curr) =>
    menu[prev].price > menu[curr].price ? prev : curr
  )

  const minItemID = menuItems.reduce((prev, curr) =>
    menu[prev].price < menu[curr].price ? prev : curr
  )

  const maxPrice = moneyFormatter.format(menu[maxItemID].price)
  const minPrice = moneyFormatter.format(menu[minItemID].price)

  return (
    <Box maxWidth="60%">
      <Breadcrumbs
        separator="››"
        aria-label="breadcrumb"
        style={{ marginBottom: '2%' }}
      >
        <Link as="/" href="/">
          <a>Home</a>
        </Link>
        <Link
          as={`/${normalizeText(place.address.province)}`}
          href="/[location]"
        >
          <a>{place.address.province}</a>
        </Link>
        <Link
          as={`/${normalizeText(place.address.province)}/${place.id}`}
          href="/[location]/[place]"
        >
          <a>{place.name}</a>
        </Link>
      </Breadcrumbs>

      <Typography>{place.type}</Typography>

      <Typography variant="h4">{place.name}</Typography>
      <Typography variant="body2">
        {`${place.address.street}, P.${place.address.ward},  ${place.address.city}, ${place.address.province}`}
      </Typography>

      <PlaceRating />

      <Box display="flex" style={{ color: 'gray' }}>
        <AccessTimeIcon />
        <Typography variant="body1">{`${place.time.open} - ${place.time.close}`}</Typography>
      </Box>

      {isOpen ? (
        <Box display="flex" style={{ color: '#6CC942' }}>
          <FiberManualRecordIcon fontSize="small" />
          <Typography variant="body1">Đang mở</Typography>
        </Box>
      ) : (
        <Box display="flex" style={{ color: 'grey' }}>
          <FiberManualRecordIcon fontSize="small" />
          <Typography variant="body1">Đã đóng</Typography>
        </Box>
      )}

      <Box display="flex" style={{ color: 'gray' }}>
        <MonetizationOnOutlinedIcon />
        <Typography variant="body1">{`${minPrice} - ${maxPrice}`}</Typography>
      </Box>
    </Box>
  )
}
