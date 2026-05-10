// Mock AI Prediction Utility

/**
 * Predicts the fair market value and gives a deal rating.
 * @param {number} currentPrice The seller's asking price
 * @param {number} originalPrice The original MRP
 * @param {string} condition 'New', 'Good', 'Used'
 * @param {number} ageInMonths How old the product is
 * @returns {object} { fairPriceMin, fairPriceMax, status, color }
 */
export const getPricePrediction = (currentPrice, originalPrice, condition, ageInMonths, category) => {
  if (!originalPrice) return null;

  // Basic depreciation logic
  let depreciationFactor = 1.0;

  if (ageInMonths <= 6) depreciationFactor = 0.8;
  else if (ageInMonths <= 12) depreciationFactor = 0.6;
  else if (ageInMonths <= 24) depreciationFactor = 0.4;
  else depreciationFactor = 0.3;

  if (condition === 'Good') depreciationFactor *= 0.9;
  if (condition === 'Used') depreciationFactor *= 0.7;

  const fairPrice = Math.round(originalPrice * depreciationFactor);
  const fairPriceMin = Math.round(fairPrice * 0.9);
  const fairPriceMax = Math.round(fairPrice * 1.1);
  const recommendedPrice = Math.round(fairPrice * 0.95); // Slightly below average for quick sale

  let status = 'Fair Price';
  let color = 'var(--text-main)';

  if (currentPrice && currentPrice < fairPriceMin) {
    status = 'Great Deal 🔥';
    color = 'var(--accent)';
  } else if (currentPrice && currentPrice > fairPriceMax) {
    status = 'Overpriced ⚠️';
    color = 'var(--danger)';
  }

  // Demand Logic
  let demandLevel = 'Medium';
  let demandInsights = [];
  
  if (category === 'first_year' || category === 'Books & Notes') {
    demandLevel = 'High';
    demandInsights = [
      'High demand among 1st year students',
      'Peak demand during semester start',
      `${Math.floor(Math.random() * 5) + 2} similar items sold this week`
    ];
  } else if (category === 'Electronics') {
    demandLevel = 'High';
    demandInsights = [
      'Constant demand across all years',
      'High resale value maintained',
      `${Math.floor(Math.random() * 3) + 1} similar items sold this week`
    ];
  } else if (category === 'Occasional' || category === 'Girls Fashion') {
    demandLevel = 'Seasonal';
    demandInsights = [
      'High demand during fest season',
      'Mostly rented rather than bought',
      '1 similar item rented this week'
    ];
  } else {
    demandInsights = [
      'Steady demand',
      'Average time to sell: 4 days',
      '2 similar items viewed today'
    ];
  }

  return {
    fairPriceMin,
    fairPriceMax,
    recommendedPrice,
    status,
    color,
    demandLevel,
    quickSaleTip: 'Best price for quick sale',
    demandInsights,
    suggestion: `AI suggests a price between ₹${fairPriceMin} - ₹${fairPriceMax}`
  };
};

/**
 * Returns a human readable age string.
 * @param {number} months 
 */
export const formatProductAge = (months) => {
  if (!months || months === 0) return 'Brand New';
  if (months < 12) return `${months} months old`;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  return remainingMonths > 0 ? `${years} yr ${remainingMonths} mo old` : `${years} yr old`;
};
