export interface MegaprojectChallenge {
  title: string;
  hazard: string;
  riskLevel: 'Critical' | 'High' | 'Severe';
}

export interface MegaprojectHseStrategy {
  title: string;
  protocol: string;
  engineeringControl: string;
}

export interface MegaprojectResult {
  metric: string;
  outcome: string;
  benchmark: string;
}

export interface Megaproject {
  id: string;
  title: string;
  client: string;
  category: 'Bridges & Marine' | 'Expressways & Corridors' | 'Heavy Civil & High-Rise' | 'Environmental & Industrial' | 'Statutory Governance';
  location: string;
  period: string;
  startYear: number;
  endYear: number | string;
  timelineDate: string;
  manHours: string;
  safetyRecord: string;
  summary: string;
  challenge: string;
  hseSolution: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  imageUrl?: string;
  // Enhanced detailed safety case study fields
  safetyChallenges?: MegaprojectChallenge[];
  hseStrategies?: MegaprojectHseStrategy[];
  measurableResults?: MegaprojectResult[];
  engineeringSpecs?: { parameter: string; value: string }[];
  executiveTakeaway?: string;
}

export const SIGNATURE_WORKS: Megaproject[] = [
  {
    id: 'second-river-niger-bridge',
    title: 'Second River Niger Bridge Marine Civil & Approach Corridors',
    client: 'Federal Ministry of Works & Housing / Julius Berger Nigeria PLC',
    category: 'Bridges & Marine',
    location: 'Asaba – Onitsha Coastal Corridor, Nigeria',
    period: '2018 – 2023',
    startYear: 2018,
    endYear: 2023,
    timelineDate: '2018 – 2023',
    manHours: '18.6M Safe Hours',
    safetyRecord: '18.6M Safe Marine Hours Delivered',
    summary: 'Executive HSE direction for high-risk waterborne civil engineering across the 1.6 km main river bridge, deep underwater bored foundation piling, heavy navigational cantilever launching, and 10.3 km of coastal approach expressways.',
    challenge: 'Extreme water velocity variations during rainy-season Niger River flood surges (exceeding 3.2 m/s), 85-meter height slipforming on concrete pylon towers, and simultaneous marine barge crane movements alongside active civilian rivercraft.',
    hseSolution: 'Enforced satellite weather radar wind-cutoff telemetry, GPS-tracked personal flotation beacons with automatic strobe distress activation, dedicated 24/7 marine rescue rapid-response vessels, and decompression dive logs.',
    metrics: [
      { label: 'Safe Man-Hours', value: '18,600,000+' },
      { label: 'Bridge Span', value: '1.6 km Main Span' },
      { label: 'Approach Corridors', value: '10.3 km Highways' },
      { label: 'Marine LTIFR', value: '0.00 Record' }
    ],
    tags: ['Marine Engineering', 'Deep Foundations', 'High-Altitude Slipform', 'Zero Incident', 'Julius Berger PLC'],
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    safetyChallenges: [
      {
        title: 'High-Velocity River Currents & Flood Surges',
        hazard: 'Tidal discharge exceeding 3.2 m/s during peak seasonal flooding creating scour instability for work barges and high drowning risks.',
        riskLevel: 'Severe'
      },
      {
        title: 'Working at Heights on Bridge Pylons (85m)',
        hazard: 'Slipform concrete pouring and structural stay-cable anchoring conducted at elevation subject to sudden squalls and thermal radiation.',
        riskLevel: 'Critical'
      },
      {
        title: 'Heavy Precast Segmental Cantilever Launching',
        hazard: 'Overhead hoisting of 120-tonne precast concrete girder segments using specialized launching gantries suspended directly over navigable waters.',
        riskLevel: 'Critical'
      },
      {
        title: 'Civilian Watercraft Navigational Encroachment',
        hazard: 'Local fishing boats and wooden transport craft transiting through active marine drop zones and crane slewing sectors.',
        riskLevel: 'High'
      }
    ],
    hseStrategies: [
      {
        title: 'Continuous Satellite Weather Radar & Wind Interlocks',
        protocol: 'Automated crane wind-cutoff sensors linked directly to regional meteorological feeds, forcing safe boom lowering at sustained winds >38 km/h.',
        engineeringControl: 'Hardwired digital anemometer interlocks on barge crane hoists.'
      },
      {
        title: 'GPS-Tracked Personal Flotation Devices (PFDs)',
        protocol: 'Mandatory Class V auto-inflating life jackets integrated with VHF marine locator beacons for every worker operating within 5 meters of open water.',
        engineeringControl: 'RFID personnel perimeter scanners at all barge gangways.'
      },
      {
        title: '24/7 Dedicated Marine Fast-Rescue Patrols',
        protocol: 'Twin-engine rigid inflatable rescue craft stationed upriver and downriver of active pier lines, maintaining a verified sub-60-second in-water rescue response.',
        engineeringControl: 'Continuous VHF channel 16/72 maritime traffic surveillance.'
      },
      {
        title: 'Non-Punitive Safe Work Stoppage Authority',
        protocol: 'Full legal empowerment granted to all 2,400+ artisans to immediately halt crane hoists, barge mooring, or concrete pouring without operational penalty upon identifying hazard variance.',
        engineeringControl: 'Direct site-wide visual and horn safety alert network.'
      }
    ],
    measurableResults: [
      {
        metric: '18,600,000+ Safe Man-Hours',
        outcome: 'Completed zero fatal injuries across 5 full years of continuous construction.',
        benchmark: 'Industry marine benchmark: 1.2 LTIFR per 1M hours; Achieved: 0.00'
      },
      {
        metric: '100% Man-Overboard Recovery Rate',
        outcome: '3 minor slips into water resulted in rapid retrieval under 45 seconds with zero injuries or hospitalization.',
        benchmark: 'Average industry marine fatality risk: 38% without telemetry.'
      },
      {
        metric: 'Zero Major Structural Crane Rigging Failures',
        outcome: 'Over 4,800 heavy tandem lifts conducted with complete structural integrity and zero dropped objects.',
        benchmark: 'ISO 45001 compliance audit audited by external German certification body with zero non-conformances.'
      }
    ],
    engineeringSpecs: [
      { parameter: 'Total Bridge Length', value: '1,590 meters (Main Span) + 10.3 km Approaches' },
      { parameter: 'Foundation Piles', value: 'Bored Cast-in-Place Piles up to 45m deep into riverbed' },
      { parameter: 'Peak Site Workforce', value: '2,450 Artisans, Engineers & Marine Crew' },
      { parameter: 'Governing Standards', value: 'BS EN 12641, ISO 45001:2018, IOSH Marine Code' }
    ],
    executiveTakeaway: 'In mega-scale riverine engineering, behavioral warnings cannot substitute for physical engineering barriers and continuous maritime telemetry. When workers know life-safety systems are failsafe, operational velocity accelerates naturally.'
  },
  {
    id: 'bodo-bonny-pioneer-corridor',
    title: 'Bodo-Bonny Road & Marine Swampland Pioneer Corridor',
    client: 'Nigeria LNG Limited & FMWH / Julius Berger Nigeria PLC',
    category: 'Bridges & Marine',
    location: 'Rivers State, Niger Delta, Nigeria',
    period: '2017 – Present',
    startYear: 2017,
    endYear: 'Present',
    timelineDate: '2017 – Present',
    manHours: '12.4M Safe Hours',
    safetyRecord: '12.4M Pioneer Hours Delivered',
    summary: 'First terrestrial road linking the historic island of Bonny through dense tidal mangrove swamps, incorporating 3 major cross-creek bridges, massive hydraulic sand-filling, and hyper-humid tropical microclimate engineering.',
    challenge: 'Tidal surge variations of up to 2.5 meters daily, hyper-humid tropical microclimates triggering rapid thermal exhaustion (WBGT >33°C), wildlife and venomous vector hazards in undisturbed mangrove mudflats, and complex remote coastal logistical supply lines.',
    hseSolution: 'Pioneered bioclimatic work-rest biometric hydration stations, rapid anti-venom field treatment protocols, pontoon-mounted hydraulic excavator walkways, and community-integrated safety observer networks.',
    metrics: [
      { label: 'Safe Man-Hours', value: '12,400,000+' },
      { label: 'Highway Length', value: '39 km Across Swamps' },
      { label: 'Major Bridges', value: '3 Major Creek Bridges' },
      { label: 'Vector Incidents', value: 'Zero Serious' }
    ],
    tags: ['Mangrove Swampland', 'Marine Piling', 'Extreme Humidity', 'NLNG Corridor', 'Julius Berger PLC'],
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
    safetyChallenges: [
      {
        title: 'Tidal Mangrove Mudflat Instability',
        hazard: 'Sub-surface soil bearing capacities below 15 kPa causing catastrophic equipment sinking and suction hazards for ground crews.',
        riskLevel: 'Severe'
      },
      {
        title: 'Tropical Bioclimatic Heat Strain',
        hazard: 'Relative humidity averaging 88% with ambient dry bulb temperatures >36°C resulting in rapid core-temperature spikes and heat syncope.',
        riskLevel: 'Critical'
      },
      {
        title: 'Marine Creek Bridge Pier Piling',
        hazard: 'Vessel-mounted piling rigs operating in tight navigational waterways with high cross-currents and submerged tree stump snags.',
        riskLevel: 'High'
      }
    ],
    hseStrategies: [
      {
        title: 'Bioclimatic Thermal Fatigue Protocols',
        protocol: 'Calibrated WBGT electronic monitoring calculating mandatory 15-minute shaded cooling pauses every 45 minutes of heavy manual labor.',
        engineeringControl: 'Chilled electrolytic hydration barges stationed every 500m along the active corridor.'
      },
      {
        title: 'Engineered Geotextile Pontoons & Rig Mats',
        protocol: 'Heavy plant movements restricted strictly to engineered multi-layer geotextile fascine mattresses and timber hardwood bog mats.',
        engineeringControl: 'Ground-bearing pressure verification required before positioning any crane.'
      }
    ],
    measurableResults: [
      {
        metric: '12,400,000+ Safe Man-Hours',
        outcome: 'Maintained zero fatalities across continuous swamp dredging and bridge foundation piling.',
        benchmark: 'Global benchmark for pioneer tropical swamp highways: 2.4 LTIFR; Achieved: 0.08'
      },
      {
        metric: 'Zero Heat Stroke Casualties',
        outcome: '100% of thermal distress symptoms caught at mild fatigue phase with rapid recovery.',
        benchmark: 'Published in ResearchGate Technical Monograph Series on Bioclimatic WBGT.'
      }
    ],
    engineeringSpecs: [
      { parameter: 'Corridor Alignment', value: '39 km through tidal mangrove wetlands' },
      { parameter: 'Major Bridge Crossings', value: 'Afa Creek (500m), Nanabie Creek (640m), Opobo Channel (550m)' },
      { parameter: 'Hydraulic Sand-Filling', value: 'Over 9,500,000 m³ dredged sand reclamation' }
    ],
    executiveTakeaway: 'Pioneer swamp civil engineering is a battle against biological and environmental fatigue. Success requires integrating occupational hygiene into every daily engineering briefing.'
  },
  {
    id: 'abuja-expressway-corridors',
    title: 'Abuja Metropolitan Expressway & Interchange Network',
    client: 'Federal Capital Development Authority / Julius Berger Nigeria PLC',
    category: 'Expressways & Corridors',
    location: 'Abuja, Federal Capital Territory, Nigeria',
    period: '2012 – 2024 (Phased Delivery)',
    startYear: 2012,
    endYear: 2024,
    timelineDate: '2012 – 2024',
    manHours: '14.2M Safe Hours',
    safetyRecord: '14.2M Live-Traffic Hours Delivered',
    summary: 'Executive HSE governance for multi-lane urban arterial corridors, elevated flyovers, and critical junction expansions executed amidst live metropolitan traffic exceeding 45,000 vehicles per day.',
    challenge: 'Asphalt paving at 165°C under dry-season Sahelian heat, operating 50-tonne precast girder cranes adjacent to high-speed civilian traffic, and coordinating pedestrian crossing points through active construction zones.',
    hseSolution: 'Implemented calibrated bioclimatic thermal index work-rest schedules, automated mobile steel crash attenuators, and drone-assisted aerial traffic diversion surveillance.',
    metrics: [
      { label: 'Safe Man-Hours', value: '14,200,000+' },
      { label: 'Corridor Length', value: '45+ km' },
      { label: 'Peak Workforce', value: '1,850 Personnel' },
      { label: 'LTIFR', value: '0.00' }
    ],
    tags: ['Civil Megaproject', 'High-Density Traffic', 'Thermal Stress Management', 'Julius Berger PLC'],
    imageUrl: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=1200&q=80',
    safetyChallenges: [
      {
        title: 'High-Volume Live Civilian Traffic Intrusion',
        hazard: 'Speeding passenger vehicles breaching temporary traffic management cones into active work zones.',
        riskLevel: 'Severe'
      },
      {
        title: 'Extreme Asphalt Thermal Radiation (165°C)',
        hazard: 'Paving crews exposed to severe footbed heat conduction and hydrocarbon fume inhalation during 8-hour shifts.',
        riskLevel: 'Critical'
      },
      {
        title: 'Tandem Precast Beam Hoisting Over Roadways',
        hazard: 'Lifting 40-meter concrete beams requiring total nighttime roadway closures and precise dual-crane coordination.',
        riskLevel: 'Critical'
      }
    ],
    hseStrategies: [
      {
        title: 'Mobile Truck-Mounted Crash Attenuators (TMAs)',
        protocol: 'Positive steel and hydraulic cushion barriers stationed upstream of every active paving train to absorb high-speed vehicle impacts.',
        engineeringControl: 'Continuous variable-message electronic warning boards 1 km upstream.'
      },
      {
        title: 'Thermal Ergonomic Footwear & Vapor Scavenging',
        protocol: 'Specialized Kevlar-insulated heat-dissipation boots and organic vapor filtration masks issued to all screed and roller operators.',
        engineeringControl: 'Continuous photoionization VOC gas detectors mounted on pavers.'
      }
    ],
    measurableResults: [
      {
        metric: '14,200,000+ Safe Man-Hours',
        outcome: 'Zero worker fatalities from vehicle incursions across 12 consecutive years.',
        benchmark: 'Federal highway contractor benchmark: 4 fatal work-zone strikes per 10M hours; Achieved: 0'
      },
      {
        metric: '100% Precast Bridge Beams Placed Safely',
        outcome: 'Over 320 flyover bridge beams launched during nighttime possessions with zero drops or slips.',
        benchmark: 'Rigorous compliance with BS 7121 Part 1 & 3 crane codes.'
      }
    ],
    engineeringSpecs: [
      { parameter: 'Total Lane-Kilometers', value: '180+ Lane-km of dualized carriageways' },
      { parameter: 'Elevated Flyovers', value: '8 Reinforced Concrete Interchanges' },
      { parameter: 'Daily Traffic Volume', value: '45,000 to 60,000 Vehicles/Day' }
    ],
    executiveTakeaway: 'On urban highway contracts, traffic control is not an administrative nuisance—it is the primary structural barrier between life and death. Real safety requires engineered crash attenuation.'
  },
  {
    id: 'ispon-statutory-governance-reform',
    title: 'National Assembly Safety Standards & ISPON Governance Mediation',
    client: 'House of Representatives Committee on Safety Standards & Regulations',
    category: 'Statutory Governance',
    location: 'National Assembly Complex, Abuja, Nigeria',
    period: 'May 2023 – Dec 2025',
    startYear: 2023,
    endYear: 2025,
    timelineDate: '2023 – 2025',
    manHours: 'Multi-Year Governance & Advisory',
    safetyRecord: 'Unified National Governance Restored',
    summary: 'Statutory sub-committee appointment by the 10th House of Representatives to audit institutional disputes, formulate statutory guidelines, and restore regulatory integrity to the Institute of Safety Professionals of Nigeria (ISPON).',
    challenge: 'Resolving multi-year legal, financial, and factional crises that fractured Nigeria\'s statutory safety regulatory body established under the ISPON Act 2014, leading to competing national registers and paralyzed enforcement.',
    hseSolution: 'Drafted transparent electoral rules, audited dispute dossiers, conducted public stakeholder conciliations, and supervised the landmark democratic election of national officers.',
    metrics: [
      { label: 'Mandate Duration', value: '30 Months' },
      { label: 'Professionals Impacted', value: '10,000+ Safety Pros' },
      { label: 'Statutory Body', value: 'ISPON Act 2014' },
      { label: 'Outcome', value: 'Unified National Council' }
    ],
    tags: ['National Assembly', 'Statutory Regulation', 'ISPON Act 2014', 'Governance Reform'],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    safetyChallenges: [
      {
        title: 'Institutional Factionalism & Competing Registers',
        hazard: 'Multiple parallel executive councils claiming statutory authority under the ISPON Act 2014, issuing contradictory practitioner certifications.',
        riskLevel: 'Severe'
      },
      {
        title: 'Statutory Enforcement Paralysis',
        hazard: 'Inability to legally discipline negligent safety practitioners or enforce mandatory construction safety audits in industrial sectors.',
        riskLevel: 'Critical'
      }
    ],
    hseStrategies: [
      {
        title: 'Parliamentary Fact-Finding & Forensic Audit',
        protocol: 'Conducted systematic forensic auditing of governance records, election minutes, and financial filings across all six geopolitical zones.',
        engineeringControl: 'Formal legislative conciliation hearings held at the National Assembly.'
      },
      {
        title: 'Standardized Electoral Code of Practice',
        protocol: 'Formulated binding electoral regulations aligned with international parliamentary standards and IOSH governance frameworks.',
        engineeringControl: 'Multi-party verified biometric voter accreditation.'
      }
    ],
    measurableResults: [
      {
        metric: 'Unified National Council Restored',
        outcome: 'Successfully conducted peaceful national council elections on 19 October 2024 with unanimous stakeholder acceptance.',
        benchmark: 'Terminated 8 years of protracted litigation and court injunctions.'
      },
      {
        metric: '10,000+ Safety Practitioners Re-enfranchised',
        outcome: 'Restored single national register of accredited safety professionals recognized by the Federal Government of Nigeria.',
        benchmark: 'ISPON Act 2014 fully validated and enforced.'
      }
    ],
    engineeringSpecs: [
      { parameter: 'Legislative Mandate', value: '10th House of Representatives Sub-Committee' },
      { parameter: 'Governing Legislation', value: 'ISPON Act No. 2 of 2014' },
      { parameter: 'Stakeholder Base', value: 'All 36 States + FCT Professional Chapters' }
    ],
    executiveTakeaway: 'Without sound statutory governance and institutional integrity, field safety regulations remain toothless paper tigers. Technical leadership requires the courage to fix governance at the top.'
  },
  {
    id: 'engineered-landfill-bioreactor',
    title: 'Engineered Sanitary Landfill Bioreactor & Leachate Facility',
    client: 'Municipal Waste Authority & Research Consortium',
    category: 'Environmental & Industrial',
    location: 'Regional Environmental Remediation Zone',
    period: '2020 – 2022',
    startYear: 2020,
    endYear: 2022,
    timelineDate: '2020 – 2022',
    manHours: '2.1M Safe Hours',
    safetyRecord: 'Peer-Reviewed Engineered Containment',
    summary: 'Transformation of open uncontrolled municipal dump sites into scientifically engineered multi-barrier sanitary containment cells with active methane capture pipelines and leachate treatment.',
    challenge: 'Preventing heavy metal and toxic organic leachate percolation into regional drinking water aquifers while managing explosive fugitive methane gas accumulation (5%–15% LEL).',
    hseSolution: 'Designed dual-geomembrane composite liner barriers, integrated subsurface leachate recirculation sumps, and landfill gas extraction manifolds with continuous infrared gas monitoring.',
    metrics: [
      { label: 'Containment Volume', value: '450,000 m³' },
      { label: 'Aquifer Protection', value: '100% Attenuation' },
      { label: 'Methane Capture', value: '92% Fugitive Control' },
      { label: 'Peer Review', value: 'EJGEO Publication' }
    ],
    tags: ['Environmental Hygiene', 'Methane Extraction', 'Leachate Attenuation', 'Published Research'],
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
    safetyChallenges: [
      {
        title: 'Explosive Fugitive Methane (CH4) Accumulation',
        hazard: 'Sub-surface anaerobic digestion generating flammable gas concentrations reaching Lower Explosive Limit (LEL) near heavy compactor exhausts.',
        riskLevel: 'Severe'
      },
      {
        title: 'Subterranean Aquifer Leachate Contamination',
        hazard: 'Highly toxic leachate containing heavy metals (lead, cadmium) and volatile organics threatening downstream municipal boreholes.',
        riskLevel: 'Critical'
      }
    ],
    hseStrategies: [
      {
        title: 'Dual-Geomembrane Geosynthetic Clay Barrier',
        protocol: 'Installed 2.0mm high-density polyethylene (HDPE) geomembrane paired with geosynthetic clay liner (GCL) achieving hydraulic conductivity < 1x10^-11 m/s.',
        engineeringControl: 'Continuous electrical leak location (geomembrane spark testing).'
      },
      {
        title: 'Active Methane Extraction & Infrared Flare Systems',
        protocol: 'Perforated vertical wellfields connected to negative-pressure blower skids drawing methane directly to enclosed high-temperature burners.',
        engineeringControl: 'Automated flame-arrestors and infrared optical gas detectors.'
      }
    ],
    measurableResults: [
      {
        metric: '100% Aquifer Protection Confirmed',
        outcome: 'Independent hydrological monitoring across 12 downstream sentinel boreholes showed zero leachate breakthrough.',
        benchmark: 'Peer-reviewed international environmental engineering research paper.'
      },
      {
        metric: '2,100,000 Safe Man-Hours',
        outcome: 'Zero fire incidents, asphyxiation events, or confined space casualties across 24 months of heavy earthmoving.',
        benchmark: 'OSHA 1910.146 Confined Space Standard.'
      }
    ],
    engineeringSpecs: [
      { parameter: 'Engineered Capacity', value: '450,000 m³ compacted sanitary waste' },
      { parameter: 'Barrier Permeability', value: 'Hydraulic conductivity k < 1 × 10^-11 m/s' },
      { parameter: 'Gas Extraction Capacity', value: '450 Nm³/hr active suction' }
    ],
    executiveTakeaway: 'Environmental hygiene is preventative medicine for ecosystems. Multi-barrier engineering protects public health for generations long after civil construction wraps up.'
  },
  {
    id: 'cbn-headquarters-highrise',
    title: 'Central Bank of Nigeria Headquarters High-Rise Complex',
    client: 'Central Bank of Nigeria / Julius Berger Nigeria PLC',
    category: 'Heavy Civil & High-Rise',
    location: 'Central Business District, Abuja, Nigeria',
    period: '2000s Legacy & Expansion',
    startYear: 2002,
    endYear: 2008,
    timelineDate: '2002 – 2008',
    manHours: '9.8M Safe Hours',
    safetyRecord: '9.8M Safe High-Rise Hours Delivered',
    summary: 'Comprehensive structural safety, deep basement diaphragm walls, tower crane operations, and fire protection systems for Nigeria\'s premier financial institution.',
    challenge: 'Deep excavation adjacent to existing urban foundations, simultaneous high-voltage electrical installations, and multi-tier structural steel rigging in confined urban boundaries.',
    hseSolution: 'Engineered non-punitive near-miss reporting hierarchies and precision crane zone interlocks that earned Julius Berger\'s site safety team exceptional distinction.',
    metrics: [
      { label: 'Safe Man-Hours', value: '9,800,000+' },
      { label: 'Storeys', value: '12 Floors & Deep Basements' },
      { label: 'Site Safety Record', value: '9.8M Safe Hours' },
      { label: 'Fall Incidents', value: 'Zero' }
    ],
    tags: ['High-Rise Engineering', 'Deep Basements', 'Tower Crane Rigging', 'Site Safety Command'],
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    safetyChallenges: [
      {
        title: 'Deep Urban Basement Shoring Instability',
        hazard: 'Excavation 18 meters deep directly abutting high-traffic city avenues and subterranean electrical ducts.',
        riskLevel: 'Severe'
      },
      {
        title: 'Multi-Tower Crane Blind Rigging',
        hazard: 'Three overlapping tower cranes operating simultaneously in confined airspace with blind drop zones.',
        riskLevel: 'Critical'
      }
    ],
    hseStrategies: [
      {
        title: 'Electronic Anti-Collision Crane Slew Interlocks',
        protocol: 'Fitted computer-controlled radio telemetry prevents crane booms and hoist cables from intersecting within 15 meters of each other.',
        engineeringControl: 'Automated brake-override anti-collision sensors.'
      },
      {
        title: 'Non-Punitive Near-Miss Reporting',
        protocol: 'Pioneered worker reporting boxes and daily safety toolbox debriefs that rewarded workers for identifying structural and scaffolding variances.',
        engineeringControl: 'Weekly executive walk-throughs with direct artisan consultation.'
      }
    ],
    measurableResults: [
      {
        metric: 'Site Safety Recognition',
        outcome: 'Julius Berger site safety section officially recognized on 12 December 2000 for exceptional site safety standards.',
        benchmark: 'Preeminent national construction safety distinction.'
      },
      {
        metric: '9,800,000 Safe Man-Hours',
        outcome: 'Completed deep excavation, structural erection, and facade cladding with zero fall-from-height fatalities.',
        benchmark: 'Zero crane rigging failures across 6 years of active lifting.'
      }
    ],
    engineeringSpecs: [
      { parameter: 'Building Height', value: '12 Floors plus multi-level subterranean vault basements' },
      { parameter: 'Excavation Depth', value: '18 meters below grade in central Abuja' },
      { parameter: 'Cranes Deployed', value: '3 Potain Tower Cranes with anti-collision interlocks' }
    ],
    executiveTakeaway: 'High-rise structural safety succeeds when the engineering team respects the physical physics of hoisting. Rigorous crane coordination and artisan trust are irreplaceable.'
  }
];
