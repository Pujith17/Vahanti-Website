import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  ArrowRight,
  BarChart2,
  ArrowLeftRight,
  Gauge,
  Brain,
  PieChart,
  Info,
  Truck,
  Database,
  Boxes,
  Receipt,
  FileCheck,
  Layers,
  Radar,
  Eye,
  Sparkles,
  Maximize2,
  Minimize2,
  RefreshCw,
  Play,
  TrendingUp,
  Calendar,
  MapPin,
  Plane,
  Activity,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import './ProductsPage.css';
import skylinkLogo from '../assets/skylnk-logo.png';
import cargoPulseDashboard from '../assets/cargo-pulse-dashboard.jpeg';

const PBI_URL = 'https://app.powerbi.com/view?zAwLWJhNjItMTk0ZjU1NTU2ODU0IiwidCI6IjllNTM4MjU0LTlmYzgtNGM1OC04MDE3LWVkYTg4MWY0ZDIxZiJ9';

const PREDICTION_SCENARIOS = [
  {
    title: 'Q4 Peak Holiday Season',
    dateRange: 'Nov 15 - Dec 31, 2026',
    weight: '85.4T',
    pieces: '1,280 pcs',
    confidence: '96.8% (High)',
    confidenceClass: 'confidence-high',
    yoy: '+18.4%',
    yoyClass: 'yoy-up',
    chartPoints: [35, 42, 38, 55, 62, 75, 85.4],
    chartLabels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'],
    airlines: [
      { name: 'Apex Air Freighters', val: '29.9T', pct: 35 },
      { name: 'AeroLink Cargo', val: '25.6T', pct: 30 },
      { name: 'Nova Sky Freight', val: '17.1T', pct: 20 },
      { name: 'Summit Air Logistics', val: '12.8T', pct: 15 }
    ],
    commodities: [
      { name: 'Electronics', val: '38.4T', pct: 45 },
      { name: 'E-commerce', val: '29.9T', pct: 35 },
      { name: 'General Cargo', val: '17.1T', pct: 20 }
    ]
  },
  {
    title: 'Monsoon Season Disruption',
    dateRange: 'Jul 01 - Jul 31, 2026',
    weight: '38.2T',
    pieces: '540 pcs',
    confidence: '88.5% (Medium)',
    confidenceClass: 'confidence-medium',
    yoy: '-14.2%',
    yoyClass: 'yoy-down',
    chartPoints: [65, 58, 44, 49, 41, 35, 38.2],
    chartLabels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'],
    airlines: [
      { name: 'Horizon Cargo Express', val: '15.3T', pct: 40 },
      { name: 'SwiftWing Freighters', val: '9.6T', pct: 25 },
      { name: 'Beacon Cargo Lines', val: '7.6T', pct: 20 },
      { name: 'Other Carriers', val: '5.7T', pct: 15 }
    ],
    commodities: [
      { name: 'General Cargo', val: '22.9T', pct: 60 },
      { name: 'Industrial Parts', val: '11.5T', pct: 30 },
      { name: 'Perishables', val: '3.8T', pct: 10 }
    ]
  },
  {
    title: 'Pharmaceutical Export Surge',
    dateRange: 'Sep 01 - Sep 30, 2026',
    weight: '64.8T',
    pieces: '920 pcs',
    confidence: '94.5% (High)',
    confidenceClass: 'confidence-high',
    yoy: '+22.1%',
    yoyClass: 'yoy-up',
    chartPoints: [42, 45, 48, 52, 58, 61, 64.8],
    chartLabels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'],
    airlines: [
      { name: 'Summit Air Logistics', val: '29.2T', pct: 45 },
      { name: 'Nova Sky Freight', val: '16.2T', pct: 25 },
      { name: 'AeroLink Cargo', val: '13.0T', pct: 20 },
      { name: 'Other Carriers', val: '6.4T', pct: 10 }
    ],
    commodities: [
      { name: 'Pharmaceuticals', val: '45.4T', pct: 70 },
      { name: 'Temp-Controlled', val: '13.0T', pct: 20 },
      { name: 'Chemical Materials', val: '6.4T', pct: 10 }
    ]
  },
  {
    title: 'Air Cargo Capacity Expansion',
    dateRange: 'Oct 01 - Oct 31, 2026',
    weight: '112.5T',
    pieces: '1,650 pcs',
    confidence: '95.2% (High)',
    confidenceClass: 'confidence-high',
    yoy: '+14.8%',
    yoyClass: 'yoy-up',
    chartPoints: [88, 92, 95, 102, 108, 110, 112.5],
    chartLabels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'],
    airlines: [
      { name: 'Nova Sky Freight', val: '39.4T', pct: 35 },
      { name: 'Vanguard Freighters', val: '33.8T', pct: 30 },
      { name: 'Pacific Cargo Lines', val: '22.5T', pct: 20 },
      { name: 'Global Freightways', val: '16.8T', pct: 15 }
    ],
    commodities: [
      { name: 'Textiles & Garments', val: '45.0T', pct: 40 },
      { name: 'General Cargo', val: '39.4T', pct: 35 },
      { name: 'E-commerce', val: '28.1T', pct: 25 }
    ]
  },
  {
    title: 'Post-Festival Slowdown',
    dateRange: 'Jan 15 - Feb 15, 2026',
    weight: '42.6T',
    pieces: '590 pcs',
    confidence: '91.0% (High)',
    confidenceClass: 'confidence-high',
    yoy: '-8.5%',
    yoyClass: 'yoy-down',
    chartPoints: [58, 52, 48, 45, 43, 40, 42.6],
    chartLabels: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7'],
    airlines: [
      { name: 'AeroLink Cargo', val: '12.8T', pct: 30 },
      { name: 'Nova Sky Freight', val: '10.7T', pct: 25 },
      { name: 'Apex Air Freighters', val: '10.7T', pct: 25 },
      { name: 'Other Carriers', val: '8.4T', pct: 20 }
    ],
    commodities: [
      { name: 'General Cargo', val: '21.3T', pct: 50 },
      { name: 'Electronics', val: '12.8T', pct: 30 },
      { name: 'Retail Goods', val: '8.5T', pct: 20 }
    ]
  }
];

const RISE_DIP_SCENARIOS = [
  {
    title: 'Cargo Increase During Festival Season',
    status: 'Significant Rise',
    statusType: 'rise',
    confidence: 'HIGH CONFIDENCE',
    yoy: '+24.8%',
    yoyClass: 'yoy-up',
    selectedPeriod: 'Oct 15 - Nov 10, 2026',
    previousPeriod: 'Same period last year',
    absoluteChange: '+5,420 pieces',
    selectedMetricVal: '27,240',
    previousMetricVal: '21,820',
    contextName: 'WINTER SALE PROMOTIONS',
    aiSummary: 'Year-over-year cargo volume at BLR increased by 24.8%, driven by a significant 3,120-piece rise from SZX and a 1,850-piece rise from HKG, primarily due to peak seasonal e-commerce demand. Domestic inbound shipments from DEL also saw a substantial rise of 450 pieces. Managers should ensure adequate landside capacity to handle elevated inbound sorting volumes.',
    signals: [
      { type: 'route', text: 'SZX → BLR: +3,120pcs (+185.0% YoY)', impact: 'HIGH', impactType: 'high' },
      { type: 'route', text: 'HKG → BLR: +1,850pcs (+120.4% YoY)', impact: 'HIGH', impactType: 'high' },
      { type: 'event', text: 'E-Commerce Peak: Winter Sale logistics window', impact: 'HIGH', impactType: 'high' },
      { type: 'route', text: 'DEL → BLR: +450pcs (+32.1% YoY)', impact: 'MEDIUM', impactType: 'medium' }
    ],
    routes: [
      { route: 'SZX → BLR', val: '4,808 pcs', prev: '1,688 pcs', change: '+3,120 pcs', yoy: '+185.0%', contrib: '57.5%' },
      { route: 'HKG → BLR', val: '3,386 pcs', prev: '1,536 pcs', change: '+1,850 pcs', yoy: '+120.4%', contrib: '34.1%' },
      { route: 'DEL → BLR', val: '1,850 pcs', prev: '1,400 pcs', change: '+450 pcs', yoy: '+32.1%', contrib: '8.3%' }
    ],
    airports: [
      { airport: 'SZX (Shenzhen)', role: 'Origin', performance: '+185.0% YoY', status: 'High Growth' },
      { airport: 'HKG (Hong Kong)', role: 'Origin', performance: '+120.4% YoY', status: 'High Growth' },
      { airport: 'DEL (Delhi)', role: 'Origin', performance: '+32.1% YoY', status: 'Moderate Growth' },
      { airport: 'BLR (Bengaluru Terminal)', role: 'Destination / Hub', performance: '+24.8% YoY', status: 'Overall Destination Growth' }
    ]
  },
  {
    title: 'Cargo Decline Due to Weather Disruption',
    status: 'Significant Dip',
    statusType: 'dip',
    confidence: 'HIGH CONFIDENCE',
    yoy: '-18.5%',
    yoyClass: 'yoy-down',
    selectedPeriod: 'Jul 01 - Jul 15, 2026',
    previousPeriod: 'Same period last year',
    absoluteChange: '-3,240 pieces',
    selectedMetricVal: '14,270',
    previousMetricVal: '17,510',
    contextName: 'TYPHOON CORRIDOR CLOSED',
    aiSummary: 'Year-over-year cargo volume at BLR decreased by 18.5% due to severe weather conditions in East Asia disrupting inbound flights. Shipments from TPE and PVG dropped by a combined 2,800 pieces, offsetting a minor gain of 450 pieces from LHR. Flight delays at BLR landside have led to a temporary capacity deficit.',
    signals: [
      { type: 'route', text: 'TPE → BLR: -1,950pcs (-100% YoY)', impact: 'HIGH', impactType: 'high' },
      { type: 'route', text: 'PVG → BLR: -850pcs (-45.2% YoY)', impact: 'HIGH', impactType: 'high' },
      { type: 'event', text: 'Typhoon Gaemi air corridor closures in Taiwan Strait', impact: 'HIGH', impactType: 'high' },
      { type: 'route', text: 'LHR → BLR: +450pcs (+22.5% YoY)', impact: 'MEDIUM', impactType: 'medium' }
    ],
    routes: [
      { route: 'TPE → BLR', val: '0 pcs', prev: '1,950 pcs', change: '-1,950 pcs', yoy: '-100%', contrib: '60.1%' },
      { route: 'PVG → BLR', val: '1,030 pcs', prev: '1,880 pcs', change: '-850 pcs', yoy: '-45.2%', contrib: '26.2%' },
      { route: 'LHR → BLR', val: '2,450 pcs', prev: '2,000 pcs', change: '+450 pcs', yoy: '+22.5%', contrib: '-13.9%' }
    ],
    airports: [
      { airport: 'TPE (Taipei)', role: 'Origin', performance: '-100.0% YoY', status: 'Cessation of Shipments' },
      { airport: 'PVG (Shanghai)', role: 'Origin', performance: '-45.2% YoY', status: 'Significant Decline' },
      { airport: 'LHR (London)', role: 'Origin', performance: '+22.5% YoY', status: 'Moderate Growth' },
      { airport: 'BLR (Bengaluru Terminal)', role: 'Destination / Hub', performance: '-18.5% YoY', status: 'Overall Destination Decline' }
    ]
  },
  {
    title: 'Pharmaceutical Export Growth',
    status: 'Significant Rise',
    statusType: 'rise',
    confidence: 'HIGH CONFIDENCE',
    yoy: '+16.2%',
    yoyClass: 'yoy-up',
    selectedPeriod: 'May 01 - May 31, 2026',
    previousPeriod: 'Same period last year',
    absoluteChange: '+2,890 pieces',
    selectedMetricVal: '20,730',
    previousMetricVal: '17,840',
    contextName: 'GLOBAL API PEAK DEMAND',
    aiSummary: 'Year-over-year cargo volume at BLR increased by 16.2%, driven by a major spike in pharmaceutical exports to FRA and ORD. Temp-controlled shipments grew by 35% compared to the prior year. General cargo remained flat. Additional warehouse cold-chain capacity is recommended for these routes.',
    signals: [
      { type: 'route', text: 'BLR → FRA: +1,650pcs (+42.5% YoY)', impact: 'HIGH', impactType: 'high' },
      { type: 'route', text: 'BLR → ORD: +980pcs (+31.8% YoY)', impact: 'HIGH', impactType: 'high' },
      { type: 'event', text: 'Peak Demand: Temp-sensitive Pharma API cargo', impact: 'HIGH', impactType: 'high' },
      { type: 'route', text: 'BLR → SIN: +260pcs (+12.0% YoY)', impact: 'MEDIUM', impactType: 'medium' }
    ],
    routes: [
      { route: 'BLR → FRA', val: '5,530 pcs', prev: '3,880 pcs', change: '+1,650 pcs', yoy: '+42.5%', contrib: '57.1%' },
      { route: 'BLR → ORD', val: '4,060 pcs', prev: '3,080 pcs', change: '+980 pcs', yoy: '+31.8%', contrib: '33.9%' },
      { route: 'BLR → SIN', val: '2,420 pcs', prev: '2,160 pcs', change: '+260 pcs', yoy: '+12.0%', contrib: '9.0%' }
    ],
    airports: [
      { airport: 'FRA (Frankfurt)', role: 'Destination', performance: '+42.5% YoY', status: 'High Growth' },
      { airport: 'ORD (Chicago)', role: 'Destination', performance: '+31.8% YoY', status: 'High Growth' },
      { airport: 'SIN (Singapore)', role: 'Destination', performance: '+12.0% YoY', status: 'Moderate Growth' },
      { airport: 'BLR (Bengaluru Terminal)', role: 'Origin / Hub', performance: '+16.2% YoY', status: 'Overall Origin Growth' }
    ]
  },
  {
    title: 'Airline Capacity Increase',
    status: 'Significant Rise',
    statusType: 'rise',
    confidence: 'HIGH CONFIDENCE',
    yoy: '+11.5%',
    yoyClass: 'yoy-up',
    selectedPeriod: 'Mar 01 - Mar 31, 2026',
    previousPeriod: 'Same period last year',
    absoluteChange: '+1,920 pieces',
    selectedMetricVal: '18,610',
    previousMetricVal: '16,690',
    contextName: 'NOVA B777F FREIGHTER UPGRADE',
    aiSummary: 'Year-over-year cargo volume at BLR rose 11.5% due to Nova Sky Freight adding a daily freighter route from DOH. This increased capacity led to an additional 1,450 pieces of general cargo. Minor increases were also noted on AeroLink Cargo routes.',
    signals: [
      { type: 'route', text: 'DOH → BLR: +1,450pcs (+65.4% YoY)', impact: 'HIGH', impactType: 'high' },
      { type: 'route', text: 'DXB → BLR: +380pcs (+12.5% YoY)', impact: 'MEDIUM', impactType: 'medium' },
      { type: 'event', text: 'Freighter Upgrade: Daily DOH route added', impact: 'HIGH', impactType: 'high' }
    ],
    routes: [
      { route: 'DOH → BLR', val: '3,666 pcs', prev: '2,216 pcs', change: '+1,450 pcs', yoy: '+65.4%', contrib: '75.5%' },
      { route: 'DXB → BLR', val: '3,420 pcs', prev: '3,040 pcs', change: '+380 pcs', yoy: '+12.5%', contrib: '19.8%' }
    ],
    airports: [
      { airport: 'DOH (Doha)', role: 'Origin', performance: '+65.4% YoY', status: 'Significant Capacity Spike' },
      { airport: 'DXB (Dubai)', role: 'Origin', performance: '+12.5% YoY', status: 'Moderate Growth' },
      { airport: 'BLR (Bengaluru Terminal)', role: 'Destination / Hub', performance: '+11.5% YoY', status: 'Overall Destination Growth' }
    ]
  },
  {
    title: 'Seasonal Export Slowdown',
    status: 'Significant Dip',
    statusType: 'dip',
    confidence: 'MEDIUM CONFIDENCE',
    yoy: '-7.2%',
    yoyClass: 'yoy-down',
    selectedPeriod: 'Jan 05 - Jan 25, 2026',
    previousPeriod: 'Same period last year',
    absoluteChange: '-1,150 pieces',
    selectedMetricVal: '14,820',
    previousMetricVal: '15,970',
    contextName: 'POST-NEW YEAR WINTER SLUMP',
    aiSummary: 'Year-over-year cargo volume decreased by 7.2%, reflecting a typical post-New Year manufacturing slowdown in Europe and Asia. Inbound cargo from FRA fell by 820 pieces, while outbound shipments to regional hubs remained stable. This dip is within expected seasonal variance range (±10%).',
    signals: [
      { type: 'route', text: 'FRA → BLR dropped 820pcs (-22.4% YoY), contributing 71.3% to total change', impact: 'HIGH', impactType: 'high' },
      { type: 'route', text: 'SIN → BLR dropped 280pcs (-9.5% YoY), contributing 24.3% to total change', impact: 'MEDIUM', impactType: 'medium' },
      { type: 'event', text: 'Post-holiday factory closures and reduced scheduled freighter frequencies', impact: 'MEDIUM', impactType: 'medium' }
    ],
    routes: [
      { route: 'FRA → BLR', val: '2,840 pcs', prev: '3,660 pcs', change: '-820 pcs', yoy: '-22.4%', contrib: '71.3%' },
      { route: 'SIN → BLR', val: '2,660 pcs', prev: '2,940 pcs', change: '-280 pcs', yoy: '-9.5%', contrib: '24.3%' }
    ],
    airports: [
      { airport: 'FRA (Frankfurt)', role: 'Origin', performance: '-22.4% YoY', status: 'Seasonal Drop' },
      { airport: 'SIN (Singapore)', role: 'Origin', performance: '-9.5% YoY', status: 'Minor Drop' },
      { airport: 'BLR (Bengaluru Terminal)', role: 'Destination / Hub', performance: '-7.2% YoY', status: 'Overall Destination Drop' }
    ]
  }
];

const PRODUCTS = [
  {
    id: 'skylnk',
    name: 'Skylnk',
    tagline: 'Operational & Financial Intelligence for Air Cargo',
    platformNote: 'Skylnk combines operational dashboards, business intelligence, predictive analytics, and AI-powered insights into one intelligent cargo platform.',
    description: 'Skylnk unifies operational dashboards, business intelligence, predictive forecasting, and AI-powered insights into a single platform for air cargo operations. Monitor performance, forecast demand, measure station efficiency, and understand operational trends—all from one source of truth.',
    logo: <img src={skylinkLogo} alt="Skylink logo" width={36} height={36} style={{ objectFit: 'contain' }} loading="lazy" />,
    tabLogo: <img src={skylinkLogo} alt="Skylink" width={20} height={20} style={{ objectFit: 'contain' }} loading="lazy" />,
    tag: 'Cargo Intelligence Platform',
    audience: [
      { name: 'Cargo Terminal Managers', benefit: 'Terminal performance & cargo visibility' },
      { name: 'Executive Teams', benefit: 'Track business health & revenue trends' },
      { name: 'Ground Handling Agents', benefit: 'Improve turnaround efficiency' },
      { name: 'Airport Operators', benefit: 'Monitor station operations' }
    ],
    stats: [
      { value: 'Business Intelligence', label: 'Analytics' },
      { value: 'Live Operations', label: 'Monitoring' },
      { value: 'Predictive Forecasting', label: 'AI Models' },
      { value: 'AI Insights', label: 'AI Powered' }
    ],
    outcomes: [
      {
        title: 'Monitor Airline Performance',
        how: 'Tracks airline tonnage, revenue and market share across stations.',
        impact: 'Quickly identify high-performing and underperforming airline operations.'
      },
      {
        title: 'Benchmark Cargo Agents',
        how: 'Compare agent performance, tonnage contribution and growth trends.',
        impact: 'Benchmark partners and support better commercial decisions.'
      },
      {
        title: 'Measure Station Efficiency',
        how: 'Measure station performance using Station Performance Intelligence (S-Score) across landside and airside operations.',
        impact: 'Identify operational inefficiencies and improve station productivity.'
      },
      {
        title: 'Forecast Cargo Demand',
        how: 'Predict manifested cargo weight and shipment pieces for future periods.',
        impact: 'Optimize workforce, warehouse, and capacity planning.'
      },
      {
        title: 'Understand Cargo Trends',
        how: 'AI explains significant cargo rises and dips automatically with AI Root Cause Analysis.',
        impact: 'Reduce investigation time and accelerate root cause analysis.'
      },
      {
        title: 'Improve Operational Decisions',
        how: 'Combine analytics, monitoring, forecasting, and AI insights in one platform.',
        impact: 'Enable faster, data-driven operational decisions.'
      }
    ],
    features: [
      {
        icon: <BarChart2 size={25} />,
        title: 'Business Intelligence & Analytics',
        description: 'Explore airline, agent, commodity, revenue, and tonnage performance with station and regional drill-down analysis.',
        bullets: [
          <>Airline Performance Analytics</>,
          <>Cargo Agent Benchmarking</>,
          <>Commodity Analytics</>,
          <>Regional & Station Drill-downs</>
        ],
      },
      {
        icon: <Gauge size={25} />,
        title: 'Operations Dashboard',
        description: 'Monitor SLA milestones, EDI message health, and warehouse operations in real time.',
        bullets: [
          <>SLA monitoring</>,
          <>EDI message monitoring</>,
          <>Live operational dashboards</>,
          <>Cargo processing visibility</>,
          <>Exception monitoring</>
        ],
      },
      {
        icon: <Brain size={25} />,
        title: 'Predictive Analytics',
        description: 'Forecast future cargo demand using historical operational data.',
        bullets: [
          <>Manifested weight forecasting</>,
          <>Shipment pieces forecasting</>,
          <>Airline demand forecasting</>,
          <>Commodity forecasting</>,
          <>Date and period-based predictions</>
        ],
      },
      {
        icon: <Sparkles size={25} />,
        title: 'AI Operational Insights',
        description: 'Understand why cargo trends change using AI-powered insights.',
        bullets: [
          <>AI Root Cause Analysis (Rise/Dip)</>,
          <>AI-generated operational explanations</>,
          <>Trend interpretation</>,
          <>Decision support</>,
          <>Faster root cause analysis</>
        ],
      },
      {
        icon: <Layers size={25} />,
        title: 'Station Performance Intelligence',
        description: 'Powered by Skylnk\'s proprietary Station Performance Intelligence (S-Score) framework with drill-down visibility into landside and airside activities.',
        bullets: [
          <>Station efficiency scoring</>,
          <>Landside performance analysis</>,
          <>Airside performance analysis</>,
          <>Activity-level drill-downs</>,
          <>Performance benchmarking</>
        ],
        wide: true,
      }
    ]
  },
  {
    id: 'rfs',
    name: 'RFS',
    tagline: 'A cargo operations platform that streamlines shipments through the warehouse lifecycle.',
    platformNote: 'RFS is Vahanti\'s cargo operations platform, designed to reduce manual operational effort, improve logistics visibility, and ensure smooth cargo handling across the warehouse lifecycle.',
    description: 'From manifest processing and shipment breakdown to billing, customs clearance, and cargo release, RFS provides a centralized system for managing cargo operations efficiently and accurately.',
    logo: <div className="product-logo-fallback"><Truck size={24} /></div>,
    tabLogo: <div className="tab-icon-fallback"><Truck size={16} /></div>,
    tag: 'Cargo Operations Platform',
    audience: [
      { name: 'Cargo Handlers', benefit: 'Streamline breakdown and sorting.' },
      { name: 'Warehouse Operators', benefit: 'Reduce manual effort and track layout.' },
      { name: 'Logistics Teams', benefit: 'Optimize coordination and clearance.' }
    ],
    stats: [
      { value: '99.9%', label: 'Processing Accuracy', icon: <FileCheck size={18} /> },
      { value: '-40%', label: 'Manual Effort', icon: <Boxes size={18} /> },
      { value: '100%', label: 'Cargo Visibility', icon: <Eye size={18} /> },
      { value: 'Real-Time', label: 'Clearance Alerts', icon: <Radar size={18} /> }
    ],
    outcomes: [
      {
        title: 'Accelerate Manifest Processing',
        how: 'Uses automated data extraction and validation rules to parse incoming messages.',
        impact: 'Eliminates manual input errors and lets warehouse staff prep for intake early.'
      },
      {
        title: 'Optimize Shipment Breakdown',
        how: 'Provides digital checklist guiding sorting staff based on cargo weight, shape, and SHCs.',
        impact: 'Reduces damage risks and speeds up availability times.'
      },
      {
        title: 'Automate Billing & Invoicing',
        how: 'Integrates billing engine directly with weight receipt and dwell time tracking.',
        impact: 'Prevents manual billing errors and secures payment before cargo release.'
      },
      {
        title: 'Streamline Customs Clearance',
        how: 'Directly interfaces with local customs systems to query release permissions.',
        impact: 'Prevents delays, reduces storage dwell time, and avoids compliance penalties.'
      },
      {
        title: 'Ensure Smooth Cargo Release',
        how: 'Uses digital gate-passes and barcode scans to confirm identity and payment status.',
        impact: 'Decreases truck waiting times and ensures cargo is delivered to the correct vehicle.'
      },
      {
        title: 'Reduce Manual Warehouse Effort',
        how: 'Replaces clipboards with mobile terminal applications for real-time status updates.',
        impact: 'Increases staff productivity and keeps the warehouse layout clean.'
      }
    ],
    features: [
      {
        icon: <Database size={25} />,
        title: 'Manifest & Cargo Intake',
        bullets: [
          <>Automatically ingest and parse inbound air cargo manifests</>,
          <>Instantly identify data anomalies and mismatched shipping bills</>,
        ],
      },
      {
        icon: <Boxes size={25} />,
        title: 'Shipment Breakdown & Sorting',
        bullets: [
          <>Track physical breakdown of shipments inside the warehouse</>,
          <>Verify piece counts and locate inventory locations</>,
        ],
      },
      {
        icon: <Receipt size={25} />,
        title: 'Automated Billing Engine',
        bullets: [
          <>Calculate accurate handling, storage, and accessorial fees</>,
          <>Generate ready-to-pay invoices directly from operational data</>,
        ],
      },
      {
        icon: <FileCheck size={25} />,
        title: 'Customs Clearance & Compliance',
        bullets: [
          <>Monitor customs release status and clearance paperwork in real-time</>,
          <>Ensure full compliance with airport cargo regulations</>,
        ],
      },
      {
        icon: <Layers size={25} />,
        title: 'Intelligent Cargo Release',
        bullets: [
          <>Manage deliver-to-truck handoffs with digital signature validation</>,
          <>Ensure seamless transfer of custody from warehouse to carrier</>,
        ],
        wide: true,
      }
    ]
  },
  {
    id: 'control-tower',
    name: 'Control Tower',
    tagline: 'An agentic cargo control center that gives stakeholders a live, shared view of operations.',
    platformNote: 'Vahanti\'s Control Tower actively drives the internal workforce toward checkpoints, SLAs, and daily goals, keeping teams aligned from handoff to milestone.',
    description: 'Control Tower combines real-time visibility, workflow orchestration, predictive alerts, and centralized communication so warehouse teams, agents, and airlines stay aligned from the first handoff to the final milestone.',
    logo: <div className="product-logo-fallback"><Radar size={24} /></div>,
    tabLogo: <div className="tab-icon-fallback"><Radar size={16} /></div>,
    tag: 'Agentic Control Center',
    audience: [
      { name: 'Warehouse Teams', benefit: 'Align workforce dynamically with SLAs.' },
      { name: 'Ground Handling Agents', benefit: 'Enforce compliance and audit histories.' },
      { name: 'Airline Operators', benefit: 'Live shared view of milestone statuses.' }
    ],
    stats: [
      { value: '100%', label: 'SLA Alignment', icon: <FileCheck size={18} /> },
      { value: '<5 min', label: 'Alert Latency', icon: <Radar size={18} /> },
      { value: 'Shared', label: 'Stakeholder View', icon: <Eye size={18} /> },
      { value: 'Agentic', label: 'Workforce Engine', icon: <Layers size={18} /> }
    ],
    outcomes: [
      {
        title: 'Establish Live Shared View',
        how: 'Aggregates disparate data systems into a unified status board.',
        impact: 'Replaces constant status phone calls and emails with trustable self-serve metrics.'
      },
      {
        title: 'Enforce SLA Checkpoints',
        how: 'Sounds alerts and highlights shipments as they approach milestone deadlines.',
        impact: 'Avoids costly carrier penalties and builds customer confidence.'
      },
      {
        title: 'Orchestrate Warehouse Workflows',
        how: 'Directs tasks dynamically based on queue sizes and shipment priorities.',
        impact: 'Optimizes labor allocation and improves daily terminal handling capacity.'
      },
      {
        title: 'Predict Critical Bottlenecks',
        how: 'Uses history models to identify queues building at specific work centers.',
        impact: 'Lets managers reallocate resources proactively to keep shipments moving.'
      },
      {
        title: 'Centralize Team Communications',
        how: 'Pins contextual messaging threads directly to shipment records.',
        impact: 'Ensures the entire team shares the same operational context when resolving issues.'
      },
      {
        title: 'Accelerate Handout Milestones',
        how: 'Signals readiness alerts to operators and transport teams automatically.',
        impact: 'Minimizes idle time between logistics legs, improving cargo transit speeds.'
      }
    ],
    features: [
      {
        icon: <Eye size={25} />,
        title: 'Live Shared Visibility',
        bullets: [
          <>A single, <strong>live shared operations view</strong> for all internal and external stakeholders</>,
          <>Instantly sync real-time cargo status across airlines, agents and warehouses</>,
        ],
      },
      {
        icon: <Layers size={25} />,
        title: 'Workflow Orchestration',
        bullets: [
          <>Actively direct workforce assignments to meet operational milestones</>,
          <>Automate chore assignments based on queue length and SLA pressure</>,
        ],
      },
      {
        icon: <Radar size={25} />,
        title: 'Predictive SLA Alerting',
        bullets: [
          <>Surface proactive exception alerts before SLA breaches occur</>,
          <>Identify cargo bottlenecks before they impact terminal performance</>,
        ],
      },
      {
        icon: <CheckCircle size={25} />,
        title: 'Centralized Coordination Hub',
        bullets: [
          <>Keep operators, supervisors and airlines in full alignment</>,
          <>Contextual team communication pinned directly to target shipments</>,
        ],
      },
      {
        icon: <BarChart2 size={25} />,
        title: 'End-to-End SLA Auditing',
        bullets: [
          <>Comprehensive tracking from first physical handoff to final milestone</>,
          <>Enforce check-in SLA standards dynamically to prevent cargo delays</>,
        ],
        wide: true,
      }
    ]
  }
];

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeProduct = PRODUCTS[activeTab];
  const [activeOutcomePopover, setActiveOutcomePopover] = useState(null);
  const [popoverAlign, setPopoverAlign] = useState('center');

  const triggerPopover = (el, index) => {
    setActiveOutcomePopover(index);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const spaceOnLeft = rect.left + rect.width / 2;
    const spaceOnRight = screenWidth - (rect.left + rect.width / 2);
    
    if (spaceOnLeft < 170) {
      setPopoverAlign('left');
    } else if (spaceOnRight < 170) {
      setPopoverAlign('right');
    } else {
      setPopoverAlign('center');
    }
  };

  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveOutcomePopover(null);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash.slice(1);
      const matchedIdx = PRODUCTS.findIndex(p => p.id === hashId);
      if (matchedIdx !== -1) {
        setActiveTab(matchedIdx);
        setTimeout(() => {
          const el = document.getElementById(hashId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // App active tab state
  const [appActiveTab, setAppActiveTab] = useState('cargo-pulse');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Business Intelligence states
  const [biLoading, setBiLoading] = useState(false);
  const [biLoaded, setBiLoaded] = useState(false);
  const [biFullscreen, setBiFullscreen] = useState(false);
  const [biLoadingStep, setBiLoadingStep] = useState('');

  // Predictive Analytics states
  const [predLoading, setPredLoading] = useState(false);
  const [predLoaded, setPredLoaded] = useState(false);
  const [predScenario, setPredScenario] = useState(null);
  const [predLoadingStepIndex, setPredLoadingStepIndex] = useState(-1);
  const [predRevealStep, setPredRevealStep] = useState(0);
  const [predTab, setPredTab] = useState('airlines');

  // AI Rise/Dip states
  const [rdLoading, setRdLoading] = useState(false);
  const [rdLoaded, setRdLoaded] = useState(false);
  const [rdScenario, setRdScenario] = useState(null);
  const [rdLoadingStepIndex, setRdLoadingStepIndex] = useState(-1);
  const [rdTab, setRdTab] = useState('overview');
  const [rdRevealStep, setRdRevealStep] = useState(0);

  // Handlers
  const handleLaunchBI = () => {
    setBiLoading(true);
    setBiLoaded(false);
    const steps = [
      'Establishing secure gateway connection...',
      'Loading Power BI visualization workspace...',
      'Fetching live operational datasets...',
      'Optimizing chart layouts and widgets...',
      'Finalizing dashboard tile rendering...'
    ];
    let currentStep = 0;
    setBiLoadingStep(steps[currentStep]);
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setBiLoadingStep(steps[currentStep]);
      } else {
        clearInterval(interval);
        setBiLoading(false);
        setBiLoaded(true);
      }
    }, 300); // 1.5s total
  };

  const handleResetBI = () => {
    setBiLoaded(false);
    setBiLoading(false);
    setBiFullscreen(false);
  };

  const handleRunPredict = () => {
    setPredLoading(true);
    setPredLoaded(false);
    setPredScenario(null);
    setPredLoadingStepIndex(0);
    setPredRevealStep(0);

    const stepsCount = 5;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < stepsCount) {
        setPredLoadingStepIndex(currentStep);
      } else {
        clearInterval(interval);
        const randomIndex = Math.floor(Math.random() * PREDICTION_SCENARIOS.length);
        setPredScenario(PREDICTION_SCENARIOS[randomIndex]);
        setPredLoading(false);
        setPredLoaded(true);

        // Staggered reveal steps (150ms delay each)
        let reveal = 0;
        const revealInterval = setInterval(() => {
          reveal++;
          setPredRevealStep(reveal);
          if (reveal >= 4) {
            clearInterval(revealInterval);
          }
        }, 150);
      }
    }, 500); // 2.5s total
  };

  const handleRunAnalysis = () => {
    setRdLoading(true);
    setRdLoaded(false);
    setRdScenario(null);
    setRdLoadingStepIndex(0);
    setRdRevealStep(0);
    setRdTab('overview');

    const stepsCount = 5;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < stepsCount) {
        setRdLoadingStepIndex(currentStep);
      } else {
        clearInterval(interval);
        const randomIndex = Math.floor(Math.random() * RISE_DIP_SCENARIOS.length);
        setRdScenario(RISE_DIP_SCENARIOS[randomIndex]);
        setRdLoading(false);
        setRdLoaded(true);

        // Staggered reveal steps (150ms delay each)
        let reveal = 0;
        const revealInterval = setInterval(() => {
          reveal++;
          setRdRevealStep(reveal);
          if (reveal >= 5) {
            clearInterval(revealInterval);
          }
        }, 150);
      }
    }, 500); // 2.5s total
  };

  return (
    <div className="products-page">
      {/* ── Dark Hero ── */}
      <div className="products-page-hero">
        <div className="products-hero-inner">
          <h1 className="products-title">
            Software built for aviation.
            <br />
            <span className="products-title-muted">Not adapted for it.</span>
          </h1>
          <p className="products-subtitle">
            Designed specifically for airlines, cargo terminals and ground handling operations.
            Vahanti's products transform operational data into actionable intelligence that
            improves visibility, efficiency and decision-making.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="products-content">
        <div className="product-tabs" role="tablist">
          {PRODUCTS.map((prod, idx) => (
            <button
              key={prod.id}
              role="tab"
              aria-selected={activeTab === idx}
              className={`product-tab${activeTab === idx ? ' active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <div className="product-tab-inner">
                {prod.tabLogo}
                <span>{prod.name}</span>
              </div>

              <span className="product-tab-tag">
                {prod.tag}
              </span>
            </button>
          ))}

          <button className="product-tab coming-soon" disabled>
            <div className="product-tab-inner">
              <span className="tab-soon-dot" />
              <span>More coming soon</span>
            </div>

            <span className="product-tab-tag">
              In development
            </span>
          </button>
        </div>

        <div className="product-panel" id={activeProduct.id}>
          <div className="product-hero-row">
            <div className="product-hero-left">
              <div className="skylink-logo-wrap">
                {activeProduct.logo}
                <span className="skylink-wordmark">
                  {activeProduct.name}
                </span>
              </div>

              <p className="product-tagline">
                {activeProduct.tagline}
              </p>

              <div className="product-platform-note">
                <Info size={18} className="platform-note-icon" />
                <p>
                  {activeProduct.platformNote}
                </p>
              </div>

              <p className="product-description">
                {activeProduct.description}
              </p>

              <div className="product-cta-row">
                <a href="/#contact" className="btn-primary">
                  Request a Demo
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="product-hero-right">
              <div className="product-audience-section">
                <span className="section-eyebrow">
                  Ideal For
                </span>
                <div className="product-audience-grid">
                  {activeProduct.audience.map((aud, i) => (
                    <div key={i} className="audience-card">
                      <strong className="audience-name">{aud.name}</strong>
                      <p className="audience-benefit">{aud.benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="business-outcomes">
            <span className="section-eyebrow">
              Business Outcomes
            </span>

            <div className="outcomes-grid">
              {activeProduct.outcomes.map((out, i) => (
                <div
                  key={i}
                  className={`outcome-card ${activeOutcomePopover === i ? 'active' : ''}`}
                  onMouseEnter={(e) => triggerPopover(e.currentTarget, i)}
                  onMouseLeave={() => setActiveOutcomePopover(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeOutcomePopover === i) {
                      setActiveOutcomePopover(null);
                    } else {
                      triggerPopover(e.currentTarget, i);
                    }
                  }}
                >
                  <div className="outcome-card-clip">
                    <span className="outcome-card-line" />
                  </div>
                  <span className="outcome-card-text">{out.title}</span>

                  {activeOutcomePopover === i && (
                    <div className={`outcome-popover popover-${popoverAlign}`} onClick={(e) => e.stopPropagation()}>
                      <div className="outcome-popover-arrow" />
                      <h4 className="outcome-popover-title">{out.title}</h4>
                      
                      <div className="popover-row">
                        <span className="popover-label">How {activeProduct.name} Helps</span>
                        <span className="popover-value">{out.how}</span>
                      </div>
                      
                      <div className="popover-row">
                        <span className="popover-label">Business Impact</span>
                        <span className="popover-value">{out.impact}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {activeProduct.id === 'skylnk' && (
            <div className="skylnk-app-simulation-section">
              <span className="section-eyebrow">Interactive Demonstration</span>
              <h2 className="demo-section-title">Experience Skylnk in Real-Time</h2>
              <p className="demo-section-subtitle">
                The interactive demo below replicates the look and feel of the Skylnk enterprise SaaS product. Switch between modules using the left sidebar.
              </p>

              {/* Compact Top Info Banner */}
              <div className="demo-top-info-banner">
                <div className="banner-text-content">
                  <Info size={16} className="banner-info-icon" />
                  <div className="banner-text-inner">
                    <span className="banner-title-text">Interactive Product Demo</span>
                    <p>
                      Explore a guided demonstration of Skylnk using realistic sample operational data. This experience showcases selected Business Intelligence dashboards, predictive forecasting, and AI-powered operational insights. The complete platform includes additional analytics, drill-down reports, enterprise capabilities, and many more.
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulated App Shell Viewport */}
              <div className="skylnk-app-shell">
                {/* Left Sidebar */}
                <div className="app-shell-sidebar">
                  {/* Brand Row */}
                  <div className="sidebar-logo-row">
                    <img src={skylinkLogo} alt="Skylnk Logo" className="sidebar-logo-img" />
                    <span className="sidebar-brand-name">SkyLnk</span>
                  </div>

                  {/* Profile Info */}
                  <div className="sidebar-profile-card">
                    <div className="profile-avatar">SR</div>
                    <div className="profile-info">
                      <span className="profile-name">Sam Rogers</span>
                      <span className="profile-role">Operations Hub • BLR</span>
                    </div>
                  </div>

                  {/* Nav Links */}
                  <div className="sidebar-nav-links">
                    {[
                      { id: 'cargo-pulse', label: 'Business Intelligence & Cargo Pulse' },
                      { id: 'predictions', label: 'Cargo Forecasting' },
                      { id: 'rise-dip', label: 'AI Root Cause Analysis' }
                    ].map((link) => {
                      const stepState = 
                        link.id === 'cargo-pulse' ? (biLoaded ? 'completed' : (appActiveTab === 'cargo-pulse' ? 'active' : 'upcoming')) :
                        link.id === 'predictions' ? (predLoaded ? 'completed' : (appActiveTab === 'predictions' ? 'active' : 'upcoming')) :
                        (rdLoaded ? 'completed' : (appActiveTab === 'rise-dip' ? 'active' : 'upcoming'));
                      
                      const indicatorChar = 
                        link.id === 'cargo-pulse' ? (biLoaded ? '✓' : (appActiveTab === 'cargo-pulse' ? '●' : '○')) :
                        link.id === 'predictions' ? (predLoaded ? '✓' : (appActiveTab === 'predictions' ? '●' : '○')) :
                        (rdLoaded ? '✓' : (appActiveTab === 'rise-dip' ? '●' : '○'));

                      return (
                        <button
                          key={link.id}
                          className={`sidebar-nav-item ${appActiveTab === link.id ? 'active' : ''}`}
                          onClick={() => setAppActiveTab(link.id)}
                        >
                          <div className="nav-item-inner">
                            <span className={`nav-progress-dot state-${stepState}`}>
                              {indicatorChar}
                            </span>
                            <span>{link.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Main workspace */}
                <div className="app-shell-main">
                  {/* Internal top navbar */}
                  <div className="app-main-topbar">
                    <div className="topbar-left">
                      <span className="topbar-page-title">
                        {appActiveTab === 'cargo-pulse' && 'Business Intelligence & Cargo Pulse'}
                        {appActiveTab === 'predictions' && 'Cargo Forecasting'}
                        {appActiveTab === 'rise-dip' && 'AI Root Cause Analysis'}
                      </span>
                    </div>
                    <div className="topbar-right">
                      <span className="topbar-demo-indicator">Interactive Demo • Sample Operational Data</span>
                      <div className="topbar-avatar">SR</div>
                    </div>
                  </div>

                  {/* Page view content container */}
                  <div className="app-main-workspace">

                    {/* 2. Cargo Pulse View (BI) */}
                    {appActiveTab === 'cargo-pulse' && (
                      <div className="app-page-cargo-pulse">
                        {!biLoading && !biLoaded && (
                          <div className="app-launch-card">
                            <div className="launch-card-icon-wrap"><BarChart2 size={32} /></div>
                            <h3>Launch BI & Cargo Pulse Dashboard</h3>
                            <p>
                              Explore airline, agent, commodity, revenue, and tonnage performance with station and regional drill-down analysis.
                            </p>
                            <button className="btn-primary btn-demo-launch" onClick={handleLaunchBI}>
                              <Play size={14} />
                              Launch BI Demo
                            </button>
                          </div>
                        )}

                        {biLoading && (
                          <div className="app-loading-container">
                            <div className="app-loading-spinner-wrap">
                              <div className="loading-spinner"></div>
                            </div>
                            <p className="app-loading-step-text">{biLoadingStep}</p>
                          </div>
                        )}

                        {biLoaded && (
                          <div className="bi-preview-container">
                            <div className="bi-preview-header">
                              <div className="bi-preview-header-left">
                                <h4 className="bi-preview-title">Cargo Pulse Dashboard</h4>
                                <span className="bi-preview-subtitle">Business Intelligence Preview</span>
                              </div>
                              <div className="bi-preview-header-right">
                                <span className="bi-preview-badge">Sample Operational Data</span>
                              </div>
                            </div>
                            <div className="bi-preview-viewport">
                              <img
                                src={cargoPulseDashboard}
                                alt="Skylnk Business Intelligence & Cargo Pulse Dashboard Preview"
                              />
                            </div>
                            <p className="bi-preview-caption">
                              Explore airline, agent, commodity, revenue, and cargo performance through interactive Business Intelligence dashboards with regional, country, and station-level drill-down analytics.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 3. Predictions View */}
                    {appActiveTab === 'predictions' && (
                      <div className="app-page-predictions">
                        {!predLoading && !predLoaded && (
                          <div className="app-launch-card">
                            <div className="launch-card-icon-wrap"><Brain size={32} /></div>
                            <h3>Cargo Forecasting Engine</h3>
                            <p>
                              Forecast manifested cargo weight and pieces using historical shipment patterns across airlines and commodities.
                            </p>
                            <button className="btn-primary btn-demo-launch" onClick={handleRunPredict}>
                              <Sparkles size={14} />
                              Forecast Cargo Demand
                            </button>
                          </div>
                        )}

                        {predLoading && (
                          <div className="app-loading-container">
                            <div className="app-checklist-loading">
                              {[
                                'Loading historical cargo data...',
                                'Processing historical trends',
                                'Running forecasting model',
                                'Computing confidence interval',
                                'Generating forecast'
                              ].map((step, idx) => {
                                const isDone = predLoadingStepIndex > idx;
                                const isCurrent = predLoadingStepIndex === idx;
                                return (
                                  <div key={idx} className={`app-checklist-item-row ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
                                    <div className="app-check-marker">
                                      {isDone ? <CheckCircle size={14} /> : <div className="app-check-spinner" />}
                                    </div>
                                    <span>{step}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {predLoaded && predScenario && (
                          <div className="app-results-container">
                            {/* Actions bar at the top */}
                            <div className="predictions-top-actions">
                              <button className="btn-embed-action btn-reset" onClick={handleRunPredict}>
                                <RefreshCw size={14} />
                                <span>Run Another Forecast</span>
                              </button>
                            </div>

                            {/* Purple Header Bar (matching screenshot) */}
                            <div className="predictions-purple-header">
                              <div className="purple-header-left">
                                <div className="purple-date-badge">
                                  <Calendar size={14} />
                                  <span>{predScenario.dateRange}</span>
                                </div>
                                <span className="purple-filter-pill">All Airlines</span>
                                <span className="purple-filter-pill">All Commodities</span>
                              </div>
                              <div className="purple-header-right">
                                <div className="purple-stat-badge">
                                  <span className="purple-stat-lbl">DAYS</span>
                                  <span className="purple-stat-val">7</span>
                                </div>
                                <div className="purple-stat-badge">
                                  <span className="purple-stat-lbl">OK</span>
                                  <span className="purple-stat-val">7</span>
                                </div>
                              </div>
                            </div>

                            {/* Sub-tabs Navigation */}
                            <div className="predictions-subtabs-bar">
                              <button className={`pred-subtab-btn ${predTab === 'airlines' ? 'active' : ''}`} onClick={() => setPredTab('airlines')}>
                                Airlines ({predScenario.airlines.length + 6})
                              </button>
                              <button className={`pred-subtab-btn ${predTab === 'totals' ? 'active' : ''}`} onClick={() => setPredTab('totals')}>
                                Totals
                              </button>
                              <button className={`pred-subtab-btn ${predTab === 'commodities' ? 'active' : ''}`} onClick={() => setPredTab('commodities')}>
                                Commodities ({predScenario.commodities.length + 5})
                              </button>
                              <button className={`pred-subtab-btn ${predTab === 'daily' ? 'active' : ''}`} onClick={() => setPredTab('daily')}>
                                Daily (7)
                              </button>
                            </div>

                            {/* Tab CONTENT: Airlines */}
                            {predTab === 'airlines' && (
                              <div className="predictions-tab-content fade-in-up">
                                <div className="table-title-row">
                                  <h5>Airline Breakdown</h5>
                                  <span className="row-count-badge">23 rows</span>
                                </div>
                                <div className="pred-table-wrap">
                                  <table className="pred-data-table">
                                    <thead>
                                      <tr>
                                        <th>AIRLINE</th>
                                        <th>MANIFESTED PIECES ⇅</th>
                                        <th>MANIFESTED WEIGHT (KG) ▼</th>
                                        <th>RECEIVED PIECES ⇅</th>
                                        <th>RECEIVED WEIGHT (KG) ⇅</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {[
                                        { name: 'Apex Air Freighters', mp: 872, mw: '29,335', rp: 2336, rw: '68,953' },
                                        { name: 'Summit Air Logistics', mp: 2157, mw: '26,063', rp: 6927, rw: '73,756' },
                                        { name: 'AeroLink Cargo', mp: 496, mw: '23,324', rp: 3565, rw: '58,098' },
                                        { name: 'Nova Sky Freight', mp: 976, mw: '22,653', rp: 5810, rw: '59,304' },
                                        { name: 'Pacific Cargo Lines', mp: 1062, mw: '19,545', rp: 1731, rw: '42,356' },
                                        { name: 'Beacon Cargo Lines', mp: 479, mw: '15,500', rp: 1254, rw: '29,714' },
                                        { name: 'SwiftWing Freighters', mp: 125, mw: '14,990', rp: 2265, rw: '34,719' },
                                        { name: 'Vanguard Freighters', mp: 663, mw: '14,548', rp: 1515, rw: '49,374' },
                                        { name: 'Global Freightways', mp: 475, mw: '10,408', rp: 1188, rw: '27,639' },
                                        { name: 'Horizon Cargo Express', mp: 709, mw: '10,050', rp: 785, rw: '39,464' }
                                      ].map((row, idx) => (
                                        <tr key={idx}>
                                          <td className="airline-name-cell"><strong>{row.name}</strong></td>
                                          <td>{row.mp}</td>
                                          <td className="bold-weight-cell">{row.mw}</td>
                                          <td>{row.rp}</td>
                                          <td>{row.rw}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                                <button className="pred-table-footer-btn">
                                  ▼ Show all 23 rows
                                </button>
                              </div>
                            )}

                            {/* Tab CONTENT: Totals */}
                            {predTab === 'totals' && (
                              <div className="predictions-tab-content fade-in-up">
                                <div className="results-metrics-grid">
                                  <div className="results-metric-card-inner">
                                    <span className="rm-lbl">Forecast Weight</span>
                                    <span className="rm-val">{predScenario.weight}</span>
                                  </div>
                                  <div className="results-metric-card-inner">
                                    <span className="rm-lbl">Forecast Pieces</span>
                                    <span className="rm-val">{predScenario.pieces}</span>
                                  </div>
                                  <div className="results-metric-card-inner">
                                    <span className="rm-lbl">Confidence</span>
                                    <span className={`confidence-badge-val ${predScenario.confidenceClass}`}>
                                      {predScenario.confidence}
                                    </span>
                                  </div>
                                  <div className="results-metric-card-inner">
                                    <span className="rm-lbl">YoY Change</span>
                                    <span className={`yoy-badge-val ${predScenario.yoyClass}`}>
                                      {predScenario.yoy}
                                    </span>
                                  </div>
                                </div>

                                <div className="results-chart-container" style={{ marginTop: '1.5rem' }}>
                                  <span className="chart-header-title"><TrendingUp size={14} /> 7-Week Manifest Tonnage Trend</span>
                                  <div className="results-svg-wrapper">
                                    <svg viewBox="0 0 500 150" className="animated-svg-linechart">
                                      <defs>
                                        <linearGradient id="chartGradApp" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25"/>
                                          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0"/>
                                        </linearGradient>
                                      </defs>
                                      <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(31, 61, 58, 0.08)" strokeDasharray="3,3" />
                                      <line x1="0" y1="75" x2="500" y2="75" stroke="rgba(31, 61, 58, 0.08)" strokeDasharray="3,3" />
                                      <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(31, 61, 58, 0.08)" strokeDasharray="3,3" />
                                      
                                      <path
                                        d={`M 0 150 L 0 ${150 - predScenario.chartPoints[0]*1.4} L 83 ${150 - predScenario.chartPoints[1]*1.4} L 166 ${150 - predScenario.chartPoints[2]*1.4} L 249 ${150 - predScenario.chartPoints[3]*1.4} L 332 ${150 - predScenario.chartPoints[4]*1.4} L 415 ${150 - predScenario.chartPoints[5]*1.4} L 500 ${150 - predScenario.chartPoints[6]*1.4} L 500 150 Z`}
                                        fill="url(#chartGradApp)"
                                      />
                                      <path
                                        d={`M 0 ${150 - predScenario.chartPoints[0]*1.4} L 83 ${150 - predScenario.chartPoints[1]*1.4} L 166 ${150 - predScenario.chartPoints[2]*1.4} L 249 ${150 - predScenario.chartPoints[3]*1.4} L 332 ${150 - predScenario.chartPoints[4]*1.4} L 415 ${150 - predScenario.chartPoints[5]*1.4} L 500 ${150 - predScenario.chartPoints[6]*1.4}`}
                                        fill="none"
                                        stroke="var(--color-primary)"
                                        strokeWidth="3.5"
                                        className="svg-line-path"
                                      />
                                      {predScenario.chartPoints.map((pt, pidx) => (
                                        <circle
                                          key={pidx}
                                          cx={pidx * 83}
                                          cy={150 - pt*1.4}
                                          r="5"
                                          fill="#ffffff"
                                          stroke="var(--color-primary)"
                                          strokeWidth="2.5"
                                          className="svg-chart-circle"
                                        />
                                      ))}
                                    </svg>
                                  </div>
                                  <div className="chart-labels-row">
                                    {predScenario.chartLabels.map((lbl, lidx) => (
                                      <span key={lidx}>{lbl}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Tab CONTENT: Commodities */}
                            {predTab === 'commodities' && (
                              <div className="predictions-tab-content fade-in-up">
                                <div className="table-title-row">
                                  <h5>Commodity Breakdown</h5>
                                  <span className="row-count-badge">32 rows</span>
                                </div>
                                <div className="pred-table-wrap">
                                  <table className="pred-data-table">
                                    <thead>
                                      <tr>
                                        <th>COMMODITY</th>
                                        <th>MANIFESTED PIECES</th>
                                        <th>MANIFESTED WEIGHT (KG)</th>
                                        <th>RECEIVED PIECES</th>
                                        <th>RECEIVED WEIGHT (KG)</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {[
                                        { name: 'Pharmaceuticals & APIs', mp: '450', mw: '22,450', rp: '1,200', rw: '48,500' },
                                        { name: 'High-Tech Electronics', mp: '380', mw: '19,820', rp: '850', rw: '39,120' },
                                        { name: 'E-commerce Packets', mp: '950', mw: '14,350', rp: '3,210', rw: '42,900' },
                                        { name: 'Perishable Logistics', mp: '120', mw: '8,200', rp: '620', rw: '18,560' },
                                        { name: 'Automotive & Industrial', mp: '160', mw: '7,150', rp: '430', rw: '16,210' }
                                      ].map((row, idx) => (
                                        <tr key={idx}>
                                          <td className="airline-name-cell"><strong>{row.name}</strong></td>
                                          <td>{row.mp}</td>
                                          <td className="bold-weight-cell">{row.mw}</td>
                                          <td>{row.rp}</td>
                                          <td>{row.rw}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                                <button className="pred-table-footer-btn">
                                  ▼ Show all 32 rows
                                </button>
                              </div>
                            )}

                            {/* Tab CONTENT: Daily */}
                            {predTab === 'daily' && (
                              <div className="predictions-tab-content fade-in-up">
                                <div className="table-title-row">
                                  <h5>Daily Cargo Forecast</h5>
                                  <span className="row-count-badge">7 rows</span>
                                </div>
                                <div className="pred-table-wrap">
                                  <table className="pred-data-table">
                                    <thead>
                                      <tr>
                                        <th>DAY</th>
                                        <th>MANIFESTED PIECES</th>
                                        <th>MANIFESTED WEIGHT (KG)</th>
                                        <th>STATUS</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {[
                                        { day: 'Day 1 (Monday)', mp: '142', mw: '4,850', status: 'Optimal' },
                                        { day: 'Day 2 (Tuesday)', mp: '185', mw: '5,920', status: 'Optimal' },
                                        { day: 'Day 3 (Wednesday)', mp: '128', mw: '4,100', status: 'Optimal' },
                                        { day: 'Day 4 (Thursday)', mp: '210', mw: '6,800', status: 'Peak Inbound' },
                                        { day: 'Day 5 (Friday)', mp: '245', mw: '7,500', status: 'Peak Inbound' },
                                        { day: 'Day 6 (Saturday)', mp: '190', mw: '6,120', status: 'Optimal' },
                                        { day: 'Day 7 (Sunday)', mp: '180', mw: '5,710', status: 'Optimal' }
                                      ].map((row, idx) => (
                                        <tr key={idx}>
                                          <td className="airline-name-cell"><strong>{row.day}</strong></td>
                                          <td>{row.mp}</td>
                                          <td className="bold-weight-cell">{row.mw}</td>
                                          <td>
                                            <span className={`ap-status-pill ${row.status === 'Peak Inbound' ? 'status-peak' : ''}`} style={{ background: row.status === 'Peak Inbound' ? 'rgba(217, 119, 6, 0.08)' : 'rgba(0, 191, 165, 0.08)', color: row.status === 'Peak Inbound' ? '#d97706' : 'var(--color-primary-active)' }}>
                                              {row.status}
                                            </span>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* 4. Rise / Dip View */}
                    {appActiveTab === 'rise-dip' && (
                      <div className="app-page-rise-dip">
                        {!rdLoading && !rdLoaded && (
                          <div className="app-launch-card">
                            <div className="launch-card-icon-wrap"><Radar size={32} /></div>
                            <h3>AI Root Cause Analysis</h3>
                            <p>
                              Compare cargo movements between periods, detect anomalies, and view AI-generated insights.
                            </p>
                            <button className="btn-primary btn-demo-launch" onClick={handleRunAnalysis}>
                              <Play size={14} />
                              Analyze Root Causes
                            </button>
                          </div>
                        )}

                        {rdLoading && (
                          <div className="app-loading-container">
                            <div className="app-checklist-loading">
                              {[
                                'Loading operational history...',
                                'Comparing historical periods',
                                'Detecting anomalies',
                                'Running AI analysis',
                                'Generating operational insights'
                              ].map((step, idx) => {
                                const isDone = rdLoadingStepIndex > idx;
                                const isCurrent = rdLoadingStepIndex === idx;
                                return (
                                  <div key={idx} className={`app-checklist-item-row ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}>
                                    <div className="app-check-marker">
                                      {isDone ? <CheckCircle size={14} /> : <div className="app-check-spinner" />}
                                    </div>
                                    <span>{step}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {rdLoaded && rdScenario && (
                          <div className="app-results-container">
                            <div className="app-results-header">
                              <div className="results-header-info">
                                <span className="results-badge-meta">HISTORICAL CSV VS PRIOR PERIOD</span>
                                <h4>{rdScenario.title}</h4>
                              </div>
                              <button className="btn-embed-action btn-reset" onClick={handleRunAnalysis}>
                                <RefreshCw size={14} />
                                <span>Run Another Analysis</span>
                              </button>
                            </div>

                            {/* Staggered Reveal Blocks */}
                            {rdRevealStep >= 1 && (
                              <div className="app-reveal-block results-summary-card rd-summary-top-card fade-in-up">
                                <div className="rd-top-left">
                                  <span className="rd-top-arrow">→</span>
                                  <span className={`rd-top-status status-${rdScenario.statusType}`}>{rdScenario.status}</span>
                                  <span className="rd-top-conf">{rdScenario.confidence}</span>
                                  <span className="rd-top-context">{rdScenario.contextName}</span>
                                </div>
                                <div className={`rd-top-right-yoy ${rdScenario.yoyClass}`}>
                                  {rdScenario.yoy}
                                  <span className="rd-top-yoy-sub">YoY change</span>
                                </div>
                              </div>
                            )}

                            {rdRevealStep >= 2 && (
                              <div className="app-reveal-block results-metrics-grid rd-metrics-row fade-in-up">
                                <div className="results-metric-card-inner">
                                  <span className="rm-lbl">Selected Period</span>
                                  <span className="rm-val">{rdScenario.selectedMetricVal}</span>
                                  <span className="rm-lbl-sub">{rdScenario.selectedPeriod}</span>
                                </div>
                                <div className="results-metric-card-inner">
                                  <span className="rm-lbl">Previous Period</span>
                                  <span className="rm-val">{rdScenario.previousMetricVal}</span>
                                  <span className="rm-lbl-sub">{rdScenario.previousPeriod}</span>
                                </div>
                                <div className="results-metric-card-inner">
                                  <span className="rm-lbl">Absolute Change</span>
                                  <span className={`rm-val ${rdScenario.yoyClass}`}>{rdScenario.absoluteChange}</span>
                                  <span className="rm-lbl-sub">pieces / kgs</span>
                                </div>
                              </div>
                            )}

                            {rdRevealStep >= 3 && (
                              <div className="app-reveal-block rd-subtabs-nav-bar fade-in-up">
                                <button className={`rd-subtab-btn-app ${rdTab === 'overview' ? 'active' : ''}`} onClick={() => setRdTab('overview')}>
                                  <Eye size={14} /> Overview
                                </button>
                                <button className={`rd-subtab-btn-app ${rdTab === 'routes' ? 'active' : ''}`} onClick={() => setRdTab('routes')}>
                                  <Truck size={14} /> Routes
                                </button>
                                <button className={`rd-subtab-btn-app ${rdTab === 'airports' ? 'active' : ''}`} onClick={() => setRdTab('airports')}>
                                  <MapPin size={14} /> Airports
                                </button>
                              </div>
                            )}

                            {/* Tab Content Overview */}
                            {rdRevealStep >= 4 && rdTab === 'overview' && (
                              <div className="app-reveal-block rd-tab-content-panel fade-in-up">
                                <div className="rd-ai-callout-box">
                                  <div className="rd-ai-callout-title">
                                    <Sparkles size={14} />
                                    <span>AI Analysis</span>
                                  </div>
                                  <p>{rdScenario.aiSummary}</p>
                                </div>

                                <div className="rd-signals-breakdown">
                                  <h5>Signal Breakdown ({rdScenario.signals.length} signals detected)</h5>
                                  <div className="rd-signals-stack">
                                    {rdScenario.signals.map((sig, sidx) => (
                                      <div key={sidx} className={`rd-signal-card impact-${sig.impactType}`}>
                                        <div className="rd-signal-card-left">
                                          {sig.type === 'route' ? <Truck size={14} /> : <Calendar size={14} />}
                                          <span>{sig.text}</span>
                                        </div>
                                        <span className={`rd-signal-impact-tag impact-${sig.impactType}`}>{sig.impact}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Tab Content Routes */}
                            {rdRevealStep >= 4 && rdTab === 'routes' && (
                              <div className="app-reveal-block rd-tab-content-panel fade-in-up">
                                <div className="rd-table-wrap">
                                  <table className="rd-data-table-app">
                                    <thead>
                                      <tr>
                                        <th>Route</th>
                                        <th>Current Vol</th>
                                        <th>Prior Vol</th>
                                        <th>Abs Change</th>
                                        <th>YoY Change</th>
                                        <th>Contribution</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {rdScenario.routes.map((rt, ridx) => (
                                        <tr key={ridx}>
                                          <td><strong>{rt.route}</strong></td>
                                          <td>{rt.val}</td>
                                          <td>{rt.prev}</td>
                                          <td className={rt.change.startsWith('+') ? 'yoy-up' : 'yoy-down'}>{rt.change}</td>
                                          <td className={rt.yoy.startsWith('+') ? 'yoy-up' : 'yoy-down'}>{rt.yoy}</td>
                                          <td>{rt.contrib}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                            {/* Tab Content Airports */}
                            {rdRevealStep >= 4 && rdTab === 'airports' && (
                              <div className="app-reveal-block rd-tab-content-panel fade-in-up">
                                <div className="rd-airports-grid-app">
                                  {rdScenario.airports.map((ap, apidx) => (
                                    <div key={apidx} className="rd-airport-card-app">
                                      <div className="rd-ap-header">
                                        <Plane size={14} />
                                        <strong>{ap.airport}</strong>
                                      </div>
                                      <div className="rd-ap-body">
                                        <div className="rd-ap-row">
                                          <span>Role</span>
                                          <strong>{ap.role}</strong>
                                        </div>
                                        <div className="rd-ap-row">
                                          <span>Performance</span>
                                          <strong className={ap.performance.startsWith('+') ? 'yoy-up' : 'yoy-down'}>{ap.performance}</strong>
                                        </div>
                                        <div className="rd-ap-row">
                                          <span>Status</span>
                                          <span className="rd-ap-status-pill">{ap.status}</span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Post-Analysis Transition & CTA */}
              {rdLoaded && (
                <div className="demo-post-analysis-cta fade-in-up">
                  <hr className="cta-divider" />
                  <div className="cta-content-wrapper">
                    <h3>Explore the Full Skylnk Platform</h3>
                    <p className="cta-description" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: '1.6', margin: '0 auto', maxWidth: '600px' }}>
                      The interactive demo showcases a selection of Skylnk's capabilities. A personalized demonstration includes the complete analytics platform, live operational workflows, and advanced reporting.
                    </p>
                    <p className="cta-intro">The complete Skylnk platform includes:</p>
                    <div className="cta-features-grid">
                      <div className="cta-feature-item">
                        <span className="check-icon">✓</span>
                        <span>Business Intelligence & Cargo Pulse dashboards</span>
                      </div>
                      <div className="cta-feature-item">
                        <span className="check-icon">✓</span>
                        <span>Airline, Agent & Commodity performance analytics</span>
                      </div>
                      <div className="cta-feature-item">
                        <span className="check-icon">✓</span>
                        <span>Regional, Country & Station drill-down reporting</span>
                      </div>
                      <div className="cta-feature-item">
                        <span className="check-icon">✓</span>
                        <span>SLA & EDI operational monitoring dashboards</span>
                      </div>
                      <div className="cta-feature-item">
                        <span className="check-icon">✓</span>
                        <span>AI-powered cargo forecasting</span>
                      </div>
                      <div className="cta-feature-item cta-feature-more">
                        <span className="check-icon">✓</span>
                        <span>And many more...</span>
                      </div>
                    </div>
                    <a
                      href="https://vahanti.com/book-demo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary post-cta-btn"
                    >
                      Book a Personalized Demo
                    </a>
                  </div>
                  <hr className="cta-divider" />
                </div>
              )}

            </div>
          )}

          <div className="features-section">
            <span className="section-eyebrow">
              What {activeProduct.name} Does
            </span>

            <div className="features-grid">
              {activeProduct.features.map((feature, index) => (
                <div
                  className={`feature-card${feature.wide ? ' wide' : ''}`}
                  key={index}
                >
                  <div className="feature-header">
                    <div className="feature-icon-wrap">
                      {feature.icon}
                    </div>

                    <h3 className="feature-title">
                      {feature.title}
                    </h3>
                  </div>

                  {feature.description && (
                    <p className="feature-desc-text">
                      {feature.description}
                    </p>
                  )}

                  <ul className="feature-bullets">
                    {feature.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>
                        <CheckCircle
                          size={14}
                          className="feature-check"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="product-bottom-cta">
            <div className="product-bottom-cta-text">
              <h2>
                {activeProduct.id === 'skylnk'
                  ? 'Operational Intelligence for Better Cargo Decisions'
                  : `See how ${activeProduct.name} can improve cargo operational performance.`}
              </h2>

              <p>
                {activeProduct.id === 'skylnk'
                  ? 'Discover how Skylnk combines business intelligence, operational monitoring, predictive analytics, and AI-powered insights to help cargo businesses make faster, smarter operational decisions.'
                  : 'Schedule a tailored demonstration based on your cargo environment, operational workflows and business objectives.'}
              </p>
            </div>

            <a href="/#contact" className="btn-primary">
              {activeProduct.id === 'skylnk' ? 'Request a Skylnk Demo' : 'Book a Demo Call'}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;