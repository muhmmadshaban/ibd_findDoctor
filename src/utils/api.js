// Your Google Apps Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyn9c3VBCx80jPb-sqc4rTTVcIc3E92frsoxhijyiMiygUlqmvUSp1sHaKjlt3YZYhZ/exec';

export const fetchDoctors = async () => {
  try {
    console.log("Fetching from Google Script:", GOOGLE_SCRIPT_URL);
    
    // Add timestamp to prevent caching
    const url = GOOGLE_SCRIPT_URL + '?t=' + Date.now();
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const text = await response.text();
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return [];
    }
    
    console.log("Raw data received:", data);
    
    if (!Array.isArray(data)) {
      console.error("Response is not an array:", data);
      return [];
    }
    
    if (data.length === 0) {
      console.log("Empty array returned");
      return [];
    }
    
    // Format the data before returning
    const formattedData = data.map(doctor => formatDoctorData(doctor));
    console.log("Formatted data:", formattedData);
    
    return formattedData;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
};

// Format doctor data
function formatDoctorData(doctor) {
  if (!doctor) return doctor;
  
  return {
    ...doctor,
    name: formatName(doctor.name),
    specialty: formatSpecialty(doctor.specialty),
    hospital: formatText(doctor.hospital),
    location: formatLocation(doctor.location),
    // Reviews also need formatting
    reviews: doctor.reviews ? doctor.reviews.map(review => ({
      ...review,
      comment: formatReview(review.comment),
      reviewer: formatName(review.reviewer)
    })) : []
  };
}

// SIMPLE Title Case for any text
function formatText(text) {
  if (!text || typeof text !== 'string') return text || '';
  
  return text
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word.length === 0) return '';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

// Format names (Dr. John Doe)
function formatName(name) {
  if (!name || typeof name !== 'string') return name || '';
  
  let formatted = name.trim();
  
  // Handle "Dr" prefix - keep it as Dr. (with dot)
  formatted = formatted.replace(/^dr\.?\s*/i, 'Dr. ');
  
  // Simple Title Case for the rest
  return formatted
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      // Keep "Dr." as is if it's the first word
      if (index === 0 && (word === 'dr' || word === 'dr.')) {
        return 'Dr.';
      }
      if (word.length === 0) return '';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

// Format hospital names - SIMPLE Title Case
function formatHospital(hospital) {
  return formatText(hospital);
}

// Format location (City, State) - SIMPLE Title Case
function formatLocation(location) {
  if (!location || typeof location !== 'string') return location || '';
  
  return location
    .split(', ')
    .map(part => formatText(part))
    .join(', ');
}

// Format specialty - SIMPLE Title Case
function formatSpecialty(specialty) {
  if (!specialty || typeof specialty !== 'string') return specialty || '';
  
  return formatText(specialty);
}

// Format review text - Clean and capitalize first letter
function formatReview(review) {
  if (!review || typeof review !== 'string') return review || '';
  
  let formatted = review.trim();
  
  // Remove extra spaces
  formatted = formatted.replace(/\s+/g, ' ');
  
  // Capitalize first letter
  if (formatted.length > 0) {
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
  
  // Ensure it ends with punctuation
  if (formatted.length > 0) {
    const lastChar = formatted.charAt(formatted.length - 1);
    if (!/[.!?]$/.test(lastChar)) {
      formatted += '.';
    }
  }
  
  return formatted;
}

export const extractLocations = (doctors) => {
  if (!Array.isArray(doctors) || doctors.length === 0) {
    return { states: [], cities: [] };
  }
  
  const states = new Set();
  const cities = new Set();
  
  doctors.forEach(doctor => {
    if (doctor.location) {
      const [city, state] = doctor.location.split(', ').map(s => s.trim());
      if (state) states.add(state);
      if (city) cities.add(city);
    }
  });
  
  return {
    states: Array.from(states).sort(),
    cities: Array.from(cities).sort()
  };
};