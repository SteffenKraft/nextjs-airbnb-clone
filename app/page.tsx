import Container from "@/app/components/Container"
import ListingCard from "@/app/components/listings/ListingCard"
import EmptyState from "@/app/components/EmptyState"

import getListings from "@/app/actions/getListings"
import getCurrentUser from "@/app/actions/getCurrentUser"

const Home = async () => {
  const listings = await getListings()
  const currentUser = await getCurrentUser()
  
  if (listings.length === 0) {
    return <EmptyState showReset />
  }

  return (
    <Container>
      <div
        className="
            pt-24
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
      >
        {listings.map((listing: any) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  )
}

export default Home
