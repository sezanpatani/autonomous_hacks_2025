// City Data Configuration - Change these values to update your app's data
// This is the central location for all city ESG data

export interface CityData {
  cityName: string
  esgScore: number
  population: number
  area: number // in sq km
  
  // Environment Data
  environment: {
    airQuality: {
      aqi: number // Air Quality Index (0-500)
      pm25: number // PM2.5 level
      zones: {
        name: string
        aqi: number
        status: 'Good' | 'Moderate' | 'Unhealthy' | 'Hazardous'
      }[]
    }
    energy: {
      totalConsumption: number // in MWh
      renewable: number // percentage
      solarCapacity: number // in MW
      windCapacity: number // in MW
    }
    waste: {
      totalWaste: number // tons per day
      recycled: number // percentage
      landfill: number // percentage
      composted: number // percentage
    }
    water: {
      consumption: number // million liters per day
      quality: number // quality index (0-100)
      wastewaterTreated: number // percentage
      groundwaterLevel: number // in meters
    }
  }
  
  // Social Data
  social: {
    education: {
      literacyRate: number // percentage
      schools: number
      studentTeacherRatio: number
      digitalLiteracy: number // percentage
    }
    healthcare: {
      hospitals: number
      doctors: number
      beds: number
      vaccination: number // percentage
      maternalHealth: number // index 0-100
    }
    employment: {
      rate: number // percentage
      avgIncome: number // in ₹
      informalSector: number // percentage
      womenParticipation: number // percentage
    }
    housing: {
      slumPopulation: number // percentage
      housingShortage: number // number of units
      affordableHousing: number // percentage
    }
  }
  
  // Governance Data
  governance: {
    transparency: {
      score: number // 0-100
      openDatasets: number
      citizenPortals: number
    }
    participation: {
      voterTurnout: number // percentage
      citizenComplaints: number
      resolvedComplaints: number
      engagedCitizens: number
    }
    digitalGovernance: {
      eGovernanceServices: number
      digitalPayments: number // percentage
      onlineApplications: number
    }
  }
  
  // Budget Data (in Crores ₹)
  budget: {
    total: number
    environment: number
    social: number
    governance: number
    infrastructure: number
  }
}

// DEFAULT CITY DATA - Mumbai
// Change these values to update your app
export const CITY_DATA: CityData = {
  cityName: 'Mumbai',
  esgScore: 72,
  population: 20_000_000,
  area: 603,
  
  environment: {
    airQuality: {
      aqi: 156,
      pm25: 89,
      zones: [
        { name: 'South Mumbai', aqi: 142, status: 'Unhealthy' },
        { name: 'Andheri', aqi: 168, status: 'Unhealthy' },
        { name: 'Bandra', aqi: 151, status: 'Unhealthy' },
        { name: 'Borivali', aqi: 145, status: 'Unhealthy' },
      ]
    },
    energy: {
      totalConsumption: 2340, // MWh
      renewable: 18, // %
      solarCapacity: 450, // MW
      windCapacity: 120, // MW
    },
    waste: {
      totalWaste: 450, // tons/day
      recycled: 25,
      landfill: 65,
      composted: 10,
    },
    water: {
      consumption: 4200, // million liters/day
      quality: 76,
      wastewaterTreated: 82,
      groundwaterLevel: 35, // meters
    }
  },
  
  social: {
    education: {
      literacyRate: 78,
      schools: 1245,
      studentTeacherRatio: 28,
      digitalLiteracy: 65,
    },
    healthcare: {
      hospitals: 12,
      doctors: 8500,
      beds: 15000,
      vaccination: 89,
      maternalHealth: 76,
    },
    employment: {
      rate: 89,
      avgIncome: 45000,
      informalSector: 35,
      womenParticipation: 42,
    },
    housing: {
      slumPopulation: 42,
      housingShortage: 85000,
      affordableHousing: 18,
    }
  },
  
  governance: {
    transparency: {
      score: 76,
      openDatasets: 145,
      citizenPortals: 8,
    },
    participation: {
      voterTurnout: 58,
      citizenComplaints: 10234,
      resolvedComplaints: 7856,
      engagedCitizens: 42000,
    },
    digitalGovernance: {
      eGovernanceServices: 78,
      digitalPayments: 65,
      onlineApplications: 125000,
    }
  },
  
  budget: {
    total: 500, // ₹500 Crores
    environment: 125,
    social: 200,
    governance: 75,
    infrastructure: 100,
  }
}

// ALTERNATIVE CITY DATA - Delhi
// Uncomment and use this for Delhi
export const DELHI_DATA: CityData = {
  cityName: 'Delhi',
  esgScore: 68,
  population: 32_000_000,
  area: 1484,
  
  environment: {
    airQuality: {
      aqi: 287,
      pm25: 178,
      zones: [
        { name: 'Central Delhi', aqi: 302, status: 'Hazardous' },
        { name: 'South Delhi', aqi: 268, status: 'Hazardous' },
        { name: 'East Delhi', aqi: 295, status: 'Hazardous' },
        { name: 'West Delhi', aqi: 285, status: 'Hazardous' },
      ]
    },
    energy: {
      totalConsumption: 3800,
      renewable: 12,
      solarCapacity: 280,
      windCapacity: 45,
    },
    waste: {
      totalWaste: 680,
      recycled: 18,
      landfill: 75,
      composted: 7,
    },
    water: {
      consumption: 5200,
      quality: 68,
      wastewaterTreated: 75,
      groundwaterLevel: 28,
    }
  },
  
  social: {
    education: {
      literacyRate: 82,
      schools: 2145,
      studentTeacherRatio: 32,
      digitalLiteracy: 71,
    },
    healthcare: {
      hospitals: 18,
      doctors: 12500,
      beds: 22000,
      vaccination: 86,
      maternalHealth: 79,
    },
    employment: {
      rate: 85,
      avgIncome: 52000,
      informalSector: 38,
      womenParticipation: 38,
    },
    housing: {
      slumPopulation: 35,
      housingShortage: 125000,
      affordableHousing: 15,
    }
  },
  
  governance: {
    transparency: {
      score: 72,
      openDatasets: 168,
      citizenPortals: 12,
    },
    participation: {
      voterTurnout: 62,
      citizenComplaints: 15678,
      resolvedComplaints: 11234,
      engagedCitizens: 58000,
    },
    digitalGovernance: {
      eGovernanceServices: 85,
      digitalPayments: 72,
      onlineApplications: 185000,
    }
  },
  
  budget: {
    total: 750,
    environment: 180,
    social: 320,
    governance: 100,
    infrastructure: 150,
  }
}

// Function to get current city data
export const getCurrentCityData = (): CityData => {
  // Change this to DELHI_DATA to switch cities
  // Or create your own city data object
  return CITY_DATA
}

// Helper function to calculate ESG score from components
export const calculateESGScore = (data: CityData): number => {
  const envScore = (
    (100 - data.environment.airQuality.aqi / 5) * 0.3 +
    data.environment.energy.renewable * 0.3 +
    data.environment.waste.recycled * 0.2 +
    data.environment.water.quality * 0.2
  )
  
  const socialScore = (
    data.social.education.literacyRate * 0.3 +
    data.social.healthcare.vaccination * 0.3 +
    data.social.employment.rate * 0.2 +
    (100 - data.social.housing.slumPopulation) * 0.2
  )
  
  const govScore = (
    data.governance.transparency.score * 0.4 +
    data.governance.participation.voterTurnout * 0.3 +
    (data.governance.digitalGovernance.eGovernanceServices / 100 * 100) * 0.3
  )
  
  return Math.round((envScore + socialScore + govScore) / 3)
}
