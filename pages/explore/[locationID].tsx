import { Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import PlaceList from '@/components/Explore/PlaceList'
import { GetStaticProps } from 'next'
import { getAllLocations, getLocationBySlug } from '@/services/location'
import { Location } from '@/models/location'
import { getPlacesByIDList } from '@/services/place'
import { Coordinate, Place } from '@/models/place'
import DefaultErrorPage from 'next/error'
import { NextSeo } from 'next-seo'
import CategoryList from '@/components/Explore/CategoryList'
import FilterButtons from '@/components/Explore/FilterButtons'
import { orderByDistance, orderByRating } from '@/functions/sortPlace'
import { Address } from '@/models/address'
import isEqual from 'lodash/isEqual'
import { toAvgRating } from '@/helpers/toAvgRating'
import calcCrow from '@/functions/distanceCalc'
import { toAvgPriceNum } from '@/helpers/toAvgPrice'

interface Props {
  status: number
  location: Location
  places: Place[]
}

const index = ({ status, location, places }: Props) => {
  const locationFound = status === 200
  const [currentAddress, setCurrentAddress] = useState<Address>({} as Address)

  useEffect(() => {
    setCurrentAddress(
      JSON.parse(sessionStorage.getItem('currentAddress') || '{}') as Address
    )
  }, [])

  const noAddressProvided = isEqual(currentAddress, {})
  const currentPosition: Coordinate = locationFound
    ? noAddressProvided
      ? location.coordinate
      : currentAddress.coordinate
    : {
        lat: 1,
        lng: 1,
      }

  const [selectedCategory, setSelectedCategory] = useState('')
  const [ratingFilter, setRatingFilter] = useState({ show: false, rating: 4 })
  const [distanceFilter, setDistanceFilter] = useState({
    show: false,
    distance: 1,
  })
  const [priceFilter, setPriceFilter] = useState({ show: false, price: 50000 })
  const [results, setResults] = useState<Place[]>([])

  const showResults =
    selectedCategory !== '' ||
    ratingFilter.show ||
    distanceFilter.show ||
    priceFilter.show
  const filterResults = () => {
    let res = [...places]
    if (selectedCategory !== '') {
      res = res.filter((place) => place.tags.includes(selectedCategory))
    }
    if (ratingFilter.show) {
      res = res.filter(
        (place) => toAvgRating(place.rating) >= ratingFilter.rating
      )
    }
    if (distanceFilter.show) {
      res = res.filter(
        (place) =>
          calcCrow(
            currentPosition.lat,
            currentPosition.lng,
            place.location.lat,
            place.location.lng
          ) <= distanceFilter.distance
      )
    }
    if (priceFilter.show) {
      res = res.filter(
        (place) => toAvgPriceNum(place.menu) <= priceFilter.price
      )
    }
    return res
  }

  useEffect(() => {
    showResults && setResults(filterResults())
  }, [selectedCategory, ratingFilter, distanceFilter, priceFilter])

  return locationFound ? (
    <Container maxWidth="md" style={{ minWidth: '80vw', minHeight: '85vh' }}>
      <NextSeo
        title={`Khám phá các địa điểm ở ${location.name}`}
        description={`Khám phá các địa điểm ở ${location.name}`}
        openGraph={{
          type: 'website',
          url: 'https://emenu-green.vercel.app/',
          title: `Khám phá các địa điểm ở ${location.name}`,
          description: `Khám phá các địa điểm ở ${location.name}`,
          images: [
            {
              url: 'https://firebasestorage.googleapis.com/v0/b/emenu-43dc6.appspot.com/o/emenu%2Flogo.png?alt=media&token=7d77c9ca-efa5-41be-8070-7d28a9999938',
              alt: 'EMenu logo',
            },
          ],
        }}
      />
      <CategoryList
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <FilterButtons
        ratingFilter={ratingFilter}
        setRatingFilter={setRatingFilter}
        distanceFilter={distanceFilter}
        setDistanceFilter={setDistanceFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
      />
      {showResults && (
        <PlaceList
          title={`${results.length} kết quả`}
          places={results}
          currentPosition={currentPosition}
        />
      )}
      {!noAddressProvided && (
        <PlaceList
          title={`Gần ${currentAddress.street}, ${currentAddress.ward}`}
          places={orderByDistance(places, currentAddress.coordinate)}
          currentPosition={currentPosition}
        />
      )}

      <PlaceList
        title={`Nổi bật ở ${location.name}`}
        places={orderByRating(places)}
        currentPosition={currentPosition}
      />
      <PlaceList
        title={`Gần trung tâm ${location.name}`}
        places={orderByDistance(places, location.coordinate)}
        currentPosition={currentPosition}
      />
    </Container>
  ) : (
    <DefaultErrorPage statusCode={status} />
  )
}

export default index

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locationID = params ? `${params.locationID}` : ''
  let location = {} as Location
  let places = [] as Place[]
  let status = 200

  if (locationID !== '') {
    try {
      location = await getLocationBySlug(locationID)
      places = await getPlacesByIDList(location.places)
    } catch {
      status = 404
    }
  } else {
    status = 404
  }

  return {
    props: { places, location, status },
    revalidate: 600,
  }
}

export async function getStaticPaths() {
  const locations = await getAllLocations()

  const paths = locations.map((location) => ({
    params: { locationID: location.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
}
