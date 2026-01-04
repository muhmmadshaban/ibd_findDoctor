import React, { useState, useEffect } from 'react';
import { fetchDoctors, extractLocations } from './utils/api';
import SearchFilters from './components/SearchFilters';
import DoctorCard from './components/DoctorCard';
import DoctorDetailsModal from './components/DoctorDetailsModal';
import { ExternalLink, Twitter } from 'lucide-react';
import { Linkedin } from "lucide-react";

function App() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial data
  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchDoctors();
      setDoctors(data);
      setFilteredDoctors(data);
      
      // Extract locations for filters
      const locations = extractLocations(data);
      setStates(locations.states);
      setCities(locations.cities);
    } catch (err) {
      setError('Failed to load doctors. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter doctors based on search criteria
  const filterDoctors = () => {
    let filtered = doctors;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by state (skip if "all")
    if (selectedState && selectedState !== "all") {
      filtered = filtered.filter(doctor =>
        doctor.location.includes(selectedState)
      );
    }
    
    // Filter by city (skip if "all")
    if (selectedCity && selectedCity !== "all") {
      filtered = filtered.filter(doctor =>
        doctor.location.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }
    
    setFilteredDoctors(filtered);
  };

  // Handle search
  const handleSearch = () => {
    filterDoctors();
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedState('all');
    setSelectedCity('all');
    setFilteredDoctors(doctors);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={loadDoctors}
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-6 max-w-7xl px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">IBD Doctors Directory</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Find and review IBD specialists across India
            </p>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd2SY5WcVhFtDHEybC3RGs0vdpLrc18nFDw895-Ht891YzLTw/viewform?usp=sharing&ouid=117483857499560129697"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            <ExternalLink size={16} />
            Add Doctor or Review
          </a>
        </div>


<p className="text-sm text-muted-foreground mb-8">
  Made by{" "}
  <a
    href="https://www.linkedin.com/in/muhmmadshaban/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary hover:underline inline-flex items-center gap-1"
  >
    <Linkedin size={14} />
    Muhmmad Shaban
  </a>{" "}
  for{" "}
  <a
    href="https://ibdindia.co.in/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary hover:underline"
  >
    IBD India
  </a>
</p>


        <div className="space-y-6 min-h-screen">
          {/* Search & Filters */}
          <SearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            states={states}
            cities={cities}
            onSearch={handleSearch}
          />

          {/* Clear Filters Button */}
          {(searchTerm || selectedState !== 'all' || selectedCity !== 'all') && (
            <div className="flex justify-end">
              <button
                onClick={handleClearFilters}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Results Count */}
          <div className="text-sm text-muted-foreground">
            {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'} found
          </div>

          {/* Doctors Grid */}
          {filteredDoctors.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
              {filteredDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onViewDetails={setSelectedDoctor}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No doctors found matching your criteria.</p>
              <button
                onClick={handleClearFilters}
                className="mt-4 text-primary hover:underline"
              >
                Clear filters and show all doctors
              </button>
            </div>
          )}
        </div>

        {/* Doctor Details Modal */}
        <DoctorDetailsModal
          doctor={selectedDoctor}
          isOpen={!!selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />

        {/* Footer */}
        <p className="text-sm text-muted-foreground mt-16 mb-8 text-center">
          © Copyright IBD Patient Support Foundation (India)
        </p>
      </main>
    </div>
  );
}

export default App;