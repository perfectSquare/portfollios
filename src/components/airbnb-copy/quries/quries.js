import gql from 'graphql-tag'

export const GET_ISLANDS_COORDS = gql`query ($type: String!) {
  destinations(type: $type) {
    id
    nick
    images
    rent
    stars
    checkIn
    checkOut
    distance
    longitude
    latitude
  }
}`

export const GET_NICK = gql`
query getAll($type: String!){
  destinations(type: $type) {
    id
    nick
    images
    rent
    stars
    checkIn
    checkOut
    distance    
  }
}`

export const GET_DETAILS = gql`query getDetails($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {
    hostIntro
    nick
    cancelPolicy
    destinationIntro {    
      about  
      comment
      logo
    }
    checkIn
    checkOut
    nightsLimit 
    country    
    description    
    distance
    hostID
    id
    images
    name
    luxi
    luxIncluded {
      about
      image
    }
    luxServices {
      about
      image
    }
    offers {
      offsLength
      moreOffers {
        cat
        catOffers {
          about                
        }
      }
    }
    rent
    stars
    reviewsNum
    serviceCharges
    hospitalityFee
    weekDiscount
    cleaningFee        
    longitude
    latitude
  }
}`


////////////////////////////////////// HostDetails Q

export const GET_HOST = gql`query ($hostId: ID!) {
  host(id: $hostId) {
    description
    hostLogo
    id
    identity
    joinedDate
    language
    name
    reviewsNum
    lives
    speaks
    verified
    work
    listing {
      about
      cat
      destinationID
      image
      name
      reviewsNum
      stars
    }        
  }
}`

export const GET_REVIEWS = gql`query ($destinationId: ID!, $type: String!, $limit: Int!, $offset: Int!) {
  destination(id: $destinationId, type: $type) {
    reviews(limit: $limit, offset: $offset) {
     customer 
     comment
     commentDate
     customerImage
     
    }
  }
}`

export const GET_REVIEWS_LENGTH = gql`query ($destinationId: ID!, $type: String!) {
  destination(id: $destinationId, type: $type) {
    reviewsLength {
      customer
    }
  }
}`

export const GET_REVIEWS_MULTIPLE_LISTING = gql`query ($hostId: ID!, $limit: Int!, $offset: Int!) {
  host(id: $hostId) {
    hostReviews(limit: $limit, offset: $offset) {
      place
      placeDate
      placeLogo
      placeReviews {
        comment
        commentDate
        customer
        customerImage
      }
    }
  }
}`

export const GET_REVIEWS_MULTIPLE_LISTING_LENGTH = gql`query ($hostId: ID!) {
  host(id: $hostId) {
    hostReviewsLen {
      place
    }
  }
}`

