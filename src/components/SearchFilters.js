import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import * as Select from '@radix-ui/react-select';

const SearchFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedState, 
  setSelectedState, 
  selectedCity, 
  setSelectedCity, 
  states, 
  cities,
  onSearch 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    await onSearch();
    setIsLoading(false);
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow w-full">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="font-semibold leading-none tracking-tight flex items-center gap-2">
          <Filter size={18} />
          Search Doctors
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="grid gap-4 md:grid-cols-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent pl-10 pr-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Search by doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* State Dropdown */}
          <Select.Root value={selectedState} onValueChange={setSelectedState}>
            <Select.Trigger className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
              <Select.Value placeholder="Select State" />
              <Select.Icon>
                <ChevronDown size={16} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border">
                <Select.ScrollUpButton />
                <Select.Viewport className="p-1">
                  <Select.Item value="all" className="text-sm p-2 rounded hover:bg-gray-100 cursor-pointer">
                    <Select.ItemText>All States</Select.ItemText>
                  </Select.Item>
                  {states.map((state) => (
                    <Select.Item key={state} value={state} className="text-sm p-2 rounded hover:bg-gray-100 cursor-pointer">
                      <Select.ItemText>{state}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          {/* City Dropdown */}
          <Select.Root 
            value={selectedCity} 
            onValueChange={setSelectedCity}
            disabled={!selectedState || selectedState === 'all'}
          >
            <Select.Trigger className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
              <Select.Value placeholder={selectedState && selectedState !== 'all' ? "Select City" : "Select State first"} />
              <Select.Icon>
                <ChevronDown size={16} />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border">
                <Select.ScrollUpButton />
                <Select.Viewport className="p-1">
                  <Select.Item value="all" className="text-sm p-2 rounded hover:bg-gray-100 cursor-pointer">
                    <Select.ItemText>All Cities</Select.ItemText>
                  </Select.Item>
                  {cities.map((city) => (
                    <Select.Item key={city} value={city} className="text-sm p-2 rounded hover:bg-gray-100 cursor-pointer">
                      <Select.ItemText>{city}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;