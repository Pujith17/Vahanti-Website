import { useRef, useEffect, useState } from 'react';
import { FileText, CheckCircle, Receipt, Layers } from 'lucide-react';

const STAGE_TELEMETRY = [
  {
    title: 'Truck Registration',
    module: 'Inbound Operations',
    task: 'Register carrier & schedule intake dock',
    operator: 'Gate Control Room',
    status: 'RFS Truck Arrived',
    next: 'Manifest Processing'
  },
  {
    title: 'Intelligent Manifest Processing',
    module: 'Document Processing',
    task: 'OCR manifest scan & AWB parsing',
    operator: 'OCR Auto-Processor',
    status: 'Extracting data...',
    next: 'Shipment Registration'
  },
  {
    title: 'Shipment Registration',
    module: 'Cargo Operations',
    task: 'Generate shipment records & assign tags',
    operator: 'Logistics Desk',
    status: 'Shipments Fanning...',
    next: 'Warehouse Breakdown'
  },
  {
    title: 'Warehouse Breakdown',
    module: 'Warehouse Execution',
    task: 'Sort shipment & assign storage locations',
    operator: 'Warehouse Floor Team',
    status: 'Allocating to shelves...',
    next: 'Mobile Scanning'
  },
  {
    title: 'Mobile Warehouse Scanning',
    module: 'Mobile Operations',
    task: 'Scan barcode & link cargo to Bay B - Row 01',
    operator: 'Floor Operator (Handheld)',
    status: 'Aligning barcode...',
    next: 'Billing & Commercials'
  },
  {
    title: 'Billing & Commercial Operations',
    module: 'Finance & Invoicing',
    task: 'Verify handling & dwell storage charges',
    operator: 'Billing System Engine',
    status: 'Calculating charges...',
    next: 'Issue Delivery Order'
  },
  {
    title: 'Warehouse Delivery Order',
    module: 'Release Authorization',
    task: 'Generate WDO checklist & release pass',
    operator: 'Operations Supervisor',
    status: 'Compiling WDO checklist...',
    next: 'Final Cargo Release'
  },
  {
    title: 'Cargo Release',
    module: 'Outbound Operations',
    task: 'Gate-out validation & final handover',
    operator: 'Exit Gate Guard',
    status: 'Released ✓',
    next: 'Workflow Complete'
  }
];

const TRACKER_STEPS = [
  { label: 'Truck', activeIndices: [0] },
  { label: 'Manifest', activeIndices: [1, 2] },
  { label: 'Warehouse', activeIndices: [3] },
  { label: 'Scan', activeIndices: [4] },
  { label: 'Billing', activeIndices: [5] },
  { label: 'Release', activeIndices: [6, 7] }
];

const CargoJourney = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [billingValues, setBillingValues] = useState({ handling: 0, storage: 0, accessorial: 0, total: 0 });

  useEffect(() => {
    let targetProgress = 0;
    let currentProgress = 0;
    let rafId = null;

    const updateInterpolation = () => {
      // Lerp for smooth damping animation
      currentProgress += (targetProgress - currentProgress) * 0.095;

      if (Math.abs(targetProgress - currentProgress) < 0.0001) {
        currentProgress = targetProgress;
      } else {
        rafId = requestAnimationFrame(updateInterpolation);
      }

      const container = containerRef.current;
      if (container) {
        // Direct DOM write of scroll percentages to keep React re-renders to a minimum
        container.style.setProperty('--scroll-pct', currentProgress);
        
        const index = Math.min(7, Math.floor(currentProgress * 8));
        container.style.setProperty('--active-index', index);

        // Update all stage sub-percentages
        for (let i = 0; i < 8; i++) {
          const start = i / 8;
          const end = (i + 1) / 8;
          let p = 0;
          if (currentProgress > start) {
            p = currentProgress >= end ? 1 : (currentProgress - start) / (end - start);
          }
          container.style.setProperty(`--stage-${i}-pct`, p);
        }

        // Animate the billing values on scroll (Stage 5)
        const stage5Pct = currentProgress > 5/8 ? (currentProgress >= 6/8 ? 1 : (currentProgress - 5/8) * 8) : 0;
        const handlingVal = Math.round(stage5Pct * 240);
        const storageVal = Math.round(stage5Pct * 120);
        const accessorialVal = Math.round(stage5Pct * 45);
        
        setBillingValues({
          handling: handlingVal,
          storage: storageVal,
          accessorial: accessorialVal,
          total: handlingVal + storageVal + accessorialVal
        });

        // Only update activeIndex state when it has actually changed
        setActiveIndex((prev) => {
          if (prev !== index) {
            return index;
          }
          return prev;
        });
      }
    };

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) return;

      const scrolled = -rect.top;
      const pct = Math.max(0, Math.min(1, scrolled / totalHeight));

      targetProgress = pct;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateInterpolation);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const activeTelemetry = STAGE_TELEMETRY[activeIndex];

  return (
    <div className="cargo-journey-container" ref={containerRef}>
      {/* Scroll title wrapper */}
      <div className="journey-header-intro">
        <span className="section-eyebrow">Cargo Journey</span>
        <h2 className="journey-heading">
          Follow a shipment through every stage of the Road Feeder workflow.
        </h2>
        <p className="journey-subtext">
          Watch how RoadLnk manages every operational step—from truck arrival and manifest processing to warehouse handling, billing and final cargo release.
        </p>
      </div>

      <div className="journey-sticky-wrapper">
        {/* Horizontal Progress Pills */}
        <div className="journey-tracker-pills">
          {TRACKER_STEPS.map((step, idx) => {
            const isActive = step.activeIndices.includes(activeIndex);
            const isCompleted = step.activeIndices[0] < activeIndex;
            return (
              <div
                key={idx}
                className={`tracker-pill ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              >
                <span className="tracker-pill-dot" />
                <span className="tracker-pill-label">{step.label}</span>
              </div>
            );
          })}
        </div>

        {/* Immersive 3D Visual Stage */}
        <div className="journey-visual-stage">
          <div className="visual-viewport">
            {/* Evolving Workspace Status Card */}
            <div className="workspace-status-widget glass-panel">
              <div className="widget-header">
                <span className="widget-blink" />
                <span className="widget-title">ROADLNK WORKSPACE</span>
              </div>
              <ul className="widget-list">
                <li className={activeIndex >= 1 ? 'completed' : 'active'}>
                  <span>Truck Intake</span>
                  <span>{activeIndex >= 1 ? '✓ Done' : 'Active'}</span>
                </li>
                <li className={activeIndex >= 3 ? 'completed' : (activeIndex >= 1 ? 'active' : 'pending')}>
                  <span>Manifest OCR</span>
                  <span>{activeIndex >= 3 ? '✓ Done' : (activeIndex >= 1 ? 'Active' : 'Pending')}</span>
                </li>
                <li className={activeIndex >= 5 ? 'completed' : (activeIndex >= 3 ? 'active' : 'pending')}>
                  <span>Warehouse Breakdown</span>
                  <span>{activeIndex >= 5 ? '✓ Done' : (activeIndex >= 3 ? 'Active' : 'Pending')}</span>
                </li>
                <li className={activeIndex >= 7 ? 'completed' : (activeIndex >= 5 ? 'active' : 'pending')}>
                  <span>Billing & WDO</span>
                  <span>{activeIndex >= 7 ? '✓ Done' : (activeIndex >= 5 ? 'Active' : 'Pending')}</span>
                </li>
              </ul>
            </div>

            {/* Layered scene children */}
            
            {/* Truck Asset Layer */}
            <div className="scene-layer layer-truck">
              <div className="truck-model">
                <div className="truck-cab">
                  <div className="truck-window" />
                  <div className="truck-light active" />
                </div>
                <div className="truck-container">
                  <div className="truck-door left" />
                  <div className="truck-door right" />
                  <span className="truck-logo">RoadLnk</span>
                </div>
                <div className="truck-wheel wheel-1" />
                <div className="truck-wheel wheel-2" />
                <div className="truck-wheel wheel-3" />
              </div>
              
              <div className="floating-badge badge-truck glass-panel">
                <span className="badge-title">Truck Registered</span>
                <div className="badge-row"><span>Carrier:</span> <strong>Terminal Transport</strong></div>
                <div className="badge-row"><span>ID:</span> <strong>RFS-102</strong></div>
                <div className="badge-row"><span>AWB Linked:</span> <strong>176-84291375</strong></div>
              </div>
            </div>

            {/* Document / Manifest OCR Layer */}
            <div className="scene-layer layer-manifest">
              <div className="manifest-sheet glass-panel">
                <div className="sheet-header">
                  <FileText size={18} className="sheet-icon" />
                  <span>RFS MANIFEST ENTRY</span>
                </div>
                <div className="sheet-body">
                  <div className="sheet-row headline">
                    <span>Carrier:</span> <strong>Terminal Transport</strong>
                  </div>
                  <div className="sheet-row separator" />
                  <div className="sheet-row highlight-ocr">
                    <span>AWB:</span> <strong>176-84291375</strong>
                  </div>
                  <div className="sheet-row">
                    <span>Dest:</span> <strong>KWI</strong>
                  </div>
                  <div className="sheet-row">
                    <span>Weight:</span> <strong>152 kg</strong>
                  </div>
                  <div className="sheet-row">
                    <span>Pieces:</span> <strong>8 pcs</strong>
                  </div>
                </div>
                <div className="ocr-laser-line" />
              </div>
            </div>

            {/* Shipment Fanning Cards Layer */}
            <div className="scene-layer layer-shipments">
              <div className="shipment-card card-left glass-panel">
                <span className="card-awb">AWB 452-9018</span>
                <span className="card-meta">Pieces: 12 | 240 kg</span>
                <span className="card-dest">KWI</span>
              </div>
              <div className="shipment-card card-center glass-panel highlight-target">
                <span className="card-badge">Target Shipment</span>
                <span className="card-awb">AWB 176-84291375</span>
                <span className="card-meta">Pieces: 8 | 152 kg</span>
                <span className="card-dest">KWI</span>
              </div>
              <div className="shipment-card card-right glass-panel">
                <span className="card-awb">AWB 810-7351</span>
                <span className="card-meta">Pieces: 4 | 98 kg</span>
                <span className="card-dest">KWI</span>
              </div>
            </div>

            {/* Warehouse Rack & Storage Boxes Layer */}
            <div className="scene-layer layer-warehouse">
              <div className="warehouse-rack">
                <div className="rack-shelf shelf-top">
                  <div className="storage-bin bin-a">
                    <span className="bin-label">Bay A - Row 01</span>
                  </div>
                  <div className="storage-bin bin-a active-bin">
                    <span className="bin-label">Bay A - Row 02</span>
                  </div>
                </div>
                <div className="rack-shelf shelf-bottom">
                  <div className="storage-bin target-bin">
                    <span className="bin-label">Bay B - Row 01</span>
                    <div className="box-item cargo-target">
                      <span className="box-label">AWB 176-84291375</span>
                    </div>
                  </div>
                  <div className="storage-bin bin-b">
                    <span className="bin-label">Bay B - Row 02</span>
                  </div>
                </div>
              </div>
              
              <div className="cargo-status-indicators">
                <div className="status-indicator-row">
                  <span className="status-dot green" />
                  <span>Located: Bay B - Row 01</span>
                </div>
                <div className="status-indicator-row">
                  <span className="status-dot green" />
                  <span>Breakdown Complete</span>
                </div>
              </div>
            </div>

            {/* Mobile Handheld Scanner Layer */}
            <div className="scene-layer layer-scanner">
              <div className="scanner-phone glass-panel">
                <div className="phone-screen">
                  <div className="camera-viewport">
                    <div className="scan-crosshair">
                      <div className="barcode-graphic-scanned" />
                      <div className="scanner-laser" />
                    </div>
                  </div>
                  <div className="phone-status">
                    <span className="phone-header">ROADLNK SCANNER</span>
                    <span className="phone-title">AWB: 176-84291375</span>
                    <div className="phone-confirm-badge">
                      <span>✓ LINKED SUCCESSFULLY</span>
                      <span>Shelf: Bay B - Row 01</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Ledger Layer */}
            <div className="scene-layer layer-billing">
              <div className="billing-invoice glass-panel">
                <div className="invoice-header">
                  <Receipt size={20} className="invoice-icon" />
                  <span>COMMERCIAL ACCOUNTING</span>
                </div>
                <div className="invoice-rows">
                  <div className="invoice-item">
                    <span>Handling Fees (RFS Cargo)</span>
                    <strong>${billingValues.handling}.00</strong>
                  </div>
                  <div className="invoice-item">
                    <span>Warehouse Storage (1 Day Dwell)</span>
                    <strong>${billingValues.storage}.00</strong>
                  </div>
                  <div className="invoice-item">
                    <span>Accessorial Terminal Charges</span>
                    <strong>${billingValues.accessorial}.00</strong>
                  </div>
                  <div className="invoice-divider" />
                  <div className="invoice-total">
                    <span>Total Invoice Charges</span>
                    <strong className="price-counter">${billingValues.total}.00</strong>
                  </div>
                </div>
                <div className="payment-stamp glass-panel">
                  <span>PAID</span>
                </div>
              </div>
            </div>

            {/* WDO Release checklist Layer */}
            <div className="scene-layer layer-wdo">
              <div className="wdo-document glass-panel">
                <div className="wdo-header">
                  <Layers size={18} className="wdo-icon" />
                  <span>WAREHOUSE DELIVERY ORDER (WDO)</span>
                </div>
                <div className="wdo-body">
                  <div className="checklist-item done">
                    <div className="checklist-checkbox">✓</div>
                    <span>Charges Paid ($405.00 Invoice)</span>
                  </div>
                  <div className="checklist-item done">
                    <div className="checklist-checkbox">✓</div>
                    <span>Shipment Located (Bay B - Row 01)</span>
                  </div>
                  <div className="checklist-item done">
                    <div className="checklist-checkbox">✓</div>
                    <span>Warehouse Processing Complete</span>
                  </div>
                  <div className="checklist-item done">
                    <div className="checklist-checkbox">✓</div>
                    <span>Delivery Order Generated</span>
                  </div>
                  <div className="wdo-status-row">
                    <span className="wdo-badge-success">READY FOR RELEASE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Outbound Cargo Release Layer */}
            <div className="scene-layer layer-release">
              <div className="release-success-card glass-panel">
                <div className="success-icon-wrap">
                  <CheckCircle size={48} className="success-check-icon" />
                </div>
                <h3>Cargo Released</h3>
                <div className="success-awb-tag">AWB 176-84291375</div>
                <div className="success-timeline">
                  <div className="timeline-row">
                    <span>Status:</span>
                    <strong className="status-released">Released ✓</strong>
                  </div>
                  <div className="timeline-row">
                    <span>Timestamp:</span>
                    <strong>10:42 AM</strong>
                  </div>
                  <div className="timeline-row">
                    <span>Location:</span>
                    <strong>Bay B - Row 01</strong>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Glass Context Card Overlay (centered layout overlap) */}
        <div className="journey-context-card-wrapper">
          <div className="journey-context-card glass-panel">
            <div className="context-card-grid">
              <div className="context-card-header">
                <span className="context-module-tag">{activeTelemetry.module}</span>
                <h3 className="context-title">{activeTelemetry.title}</h3>
              </div>
              <div className="context-details">
                <div className="details-col">
                  <span className="details-label">CURRENT TASK</span>
                  <p className="details-value">{activeTelemetry.task}</p>
                </div>
                <div className="details-col">
                  <span className="details-label">OPERATOR</span>
                  <p className="details-value">{activeTelemetry.operator}</p>
                </div>
                <div className="details-col">
                  <span className="details-label">STATUS</span>
                  <p className="details-value highlight-status">{activeTelemetry.status}</p>
                </div>
                <div className="details-col">
                  <span className="details-label">NEXT WORKFLOW</span>
                  <p className="details-value">{activeTelemetry.next}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CargoJourney;
