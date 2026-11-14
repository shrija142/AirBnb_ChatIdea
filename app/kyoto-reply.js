export const kyotoReply = [
  {
    cardType: 'stay',
    details: {
      listingTitle: 'Restored machiya townhouse near Gion',
      neighbourhood: 'Gion',
      dates: '11–13 Apr 2025',
      nights: 2,
      nightlyPriceUsd: 168,
      description: 'Private garden and cedar soaking tub',
    },
  },
  {
    cardType: 'experience',
    details: {
      activityName: 'Tea ceremony in a 100-year-old machiya',
      hostFirstName: 'Mei',
      date: 'Sat 12 Apr',
      startTime: '10:30',
      durationHours: 2,
      pricePerGuestUsd: 58,
      meetingPoint: 'Outside Gion-Shijo Station, exit 6',
    },
  },
  {
    cardType: 'food',
    details: {
      restaurantName: 'Menya Inoichi',
      mealType: 'Dinner',
      priceRange: '$',
      cuisine: 'Ramen',
      neighbourhood: 'Gion',
      estimatedCostForTwoUsd: 34,
      bookingNote: 'No reservations · arrive before 18:00',
    },
  },
];

const saganoYudofuTei = {
  restaurantName: 'Sagano Yudofu-tei',
  mealType: 'Lunch',
  priceRange: '$$',
  cuisine: 'Tofu',
  neighbourhood: 'Arashiyama',
  estimatedCostForTwoUsd: 64,
  bookingNote: '',
};

export function getKyotoReply(foodOption) {
  if (foodOption !== 'F2') return kyotoReply;

  return kyotoReply.map(card =>
    card.cardType === 'food' ? { ...card, details: saganoYudofuTei } : card,
  );
}
