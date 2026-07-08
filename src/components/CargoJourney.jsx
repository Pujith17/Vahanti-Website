import { useRef, useEffect, useState, useCallback } from 'react';
import { FileText, CheckCircle, Receipt, Layers } from 'lucide-react';
import roadlnkLogo from '../assets/roadlnk-logo.png';

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

const STAGE_COUNT = STAGE_TELEMETRY.length;
const LAST_STAGE_INDEX = STAGE_COUNT - 1;
const EXIT_STAGE_INDEX = LAST_STAGE_INDEX;

const BILLING_STAGE_INDEX = Math.max(
  0,
  STAGE_TELEMETRY.findIndex((s) => s.title.toLowerCase().includes('billing'))
);

// Billing invoice caps — pulled out so the RAF loop below is just arithmetic,
// no re-derivation per frame.
const HANDLING_CAP = 240;
const STORAGE_CAP = 120;
const ACCESSORIAL_CAP = 45;

const CargoJourney = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Billing numbers are now written directly to the DOM instead of through
  // React state — this was the main source of the "glitchy" feel, since the
  // old setBillingValues(...) call fired every animation frame (60x/sec)
  // regardless of scroll stage, forcing a full re-render of the entire
  // visual-stage tree on every tick.
  const handlingRef = useRef(null);
  const storageRef = useRef(null);
  const accessorialRef = useRef(null);
  const totalRef = useRef(null);

  const updateInterpolationRef = useRef(null);
  const rafRef = useRef(null);
  const tickingRef = useRef(false);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const resizeRafRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const writeBilling = useCallback((pct) => {
    const bStart = BILLING_STAGE_INDEX / STAGE_COUNT;
    const bEnd = (BILLING_STAGE_INDEX + 1) / STAGE_COUNT;
    const billingPct = pct > bStart ? (pct >= bEnd ? 1 : (pct - bStart) / (bEnd - bStart)) : 0;

    const handlingVal = Math.round(billingPct * HANDLING_CAP);
    const storageVal = Math.round(billingPct * STORAGE_CAP);
    const accessorialVal = Math.round(billingPct * ACCESSORIAL_CAP);
    const totalVal = handlingVal + storageVal + accessorialVal;

    if (handlingRef.current) handlingRef.current.textContent = `$${handlingVal}.00`;
    if (storageRef.current) storageRef.current.textContent = `$${storageVal}.00`;
    if (accessorialRef.current) accessorialRef.current.textContent = `$${accessorialVal}.00`;
    if (totalRef.current) totalRef.current.textContent = `$${totalVal}.00`;
  }, []);

  const updateInterpolation = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      tickingRef.current = false;
      return;
    }

    currentProgressRef.current +=
      (targetProgressRef.current - currentProgressRef.current) * 0.095;
    const diff = Math.abs(targetProgressRef.current - currentProgressRef.current);
    const settled = diff < 0.0005;
    if (settled) currentProgressRef.current = targetProgressRef.current;

    const pct = currentProgressRef.current;

    container.style.setProperty('--scroll-pct', String(pct));

    const index = Math.min(LAST_STAGE_INDEX, Math.floor(pct * STAGE_COUNT));

    if (container.dataset.stage !== String(index)) {
      container.dataset.stage = String(index);
    }

    const exitStart = EXIT_STAGE_INDEX / STAGE_COUNT;
    const exitEnd = (EXIT_STAGE_INDEX + 1) / STAGE_COUNT;
    const exitPct = pct > exitStart ? Math.min(1, (pct - exitStart) / (exitEnd - exitStart)) : 0;
    container.style.setProperty('--stage-7-pct', String(exitPct));

    writeBilling(pct);

    // React state is only touched when the stage actually flips — this is
    // now the *only* React re-render source in the whole scroll loop.
    setActiveIndex((prev) => (prev !== index ? index : prev));

    if (!settled) {
      rafRef.current = requestAnimationFrame(updateInterpolationRef.current);
    } else {
      tickingRef.current = false;
      rafRef.current = null;
    }
  }, [writeBilling]);

  useEffect(() => {
    updateInterpolationRef.current = updateInterpolation;
  }, [updateInterpolation]);

  useEffect(() => {
    if (prefersReducedMotion || !isVisible) return;

    // Prevents a single fast trackpad/mousewheel burst from jumping the
    // scroll-driven stage progress by more than ~1.5 stages at once. Without
    // this, native scroll position is read directly, so momentum scrolling
    // (which can cover hundreds of pixels in one event) skips straight past
    // 2-3 stage boundaries even though the visual lerp looks "smooth."
    const MAX_STEP_PER_TICK = (1 / STAGE_COUNT) * 1.5;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) return;

      const scrolled = -rect.top;
      const rawPct = Math.max(0, Math.min(1, scrolled / totalHeight));

      // Clamp how far the target can jump relative to where it currently is,
      // rather than snapping straight to the raw scroll-derived percentage.
      const prevTarget = targetProgressRef.current;
      const delta = rawPct - prevTarget;
      const clampedDelta = Math.max(-MAX_STEP_PER_TICK, Math.min(MAX_STEP_PER_TICK, delta));
      targetProgressRef.current = Math.max(0, Math.min(1, prevTarget + clampedDelta));

      if (!tickingRef.current) {
        tickingRef.current = true;
        rafRef.current = requestAnimationFrame(updateInterpolation);
      }
    };

    // Debounced via rAF instead of firing on every resize pixel — resize
    // events can fire dozens of times per second on some browsers/OSes.
    const handleResize = () => {
      if (resizeRafRef.current) return;
      resizeRafRef.current = requestAnimationFrame(() => {
        resizeRafRef.current = null;
        handleScroll();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
      tickingRef.current = false;
    };
  }, [isVisible, prefersReducedMotion, updateInterpolation]);

  if (prefersReducedMotion) {
    return (
      <div className="cargo-journey-container cargo-journey-static">
        <div className="journey-header-intro">
          <span className="section-eyebrow">Cargo Journey</span>
          <h2 className="journey-heading">
            Follow a shipment through every stage of the Road Feeder workflow.
          </h2>
          <p className="journey-subtext">
            Watch how RoadLnk manages every operational step—from truck arrival and
            manifest processing to warehouse handling, billing and final cargo release.
          </p>
        </div>
        <ol className="static-stage-list">
          {STAGE_TELEMETRY.map((stage, i) => (
            <li className="static-stage-item glass-panel" key={stage.title}>
              <span className="static-stage-index">{String(i + 1).padStart(2, '0')}</span>
              <div className="static-stage-body">
                <span className="context-module-tag">{stage.module}</span>
                <h3 className="context-title">{stage.title}</h3>
                <p className="static-stage-task">{stage.task}</p>
                <div className="static-stage-meta">
                  <span><strong>Operator:</strong> {stage.operator}</span>
                  <span><strong>Status:</strong> {stage.status}</span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const activeTelemetry = STAGE_TELEMETRY[activeIndex];

  return (
    <div className="cargo-journey-container" ref={containerRef} data-stage={activeIndex}>
      <div className="journey-header-intro">
        <span className="section-eyebrow">Cargo Journey</span>
        <h2 className="journey-heading">
          Follow a shipment through every stage of the Road Feeder workflow.
        </h2>
        <p className="journey-subtext">
          Watch how RoadLnk manages every operational step—from truck arrival and
          manifest processing to warehouse handling, billing and final cargo release.
        </p>
      </div>

      <div className="journey-sticky-wrapper">
        <div className="journey-tracker-pills" role="group" aria-label="Workflow progress">
          {TRACKER_STEPS.map((step, idx) => {
            const isActive = step.activeIndices.includes(activeIndex);
            const isCompleted = step.activeIndices[0] < activeIndex;
            return (
              <div
                key={idx}
                className={`tracker-pill ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="tracker-pill-dot" />
                <span className="tracker-pill-label">{step.label}</span>
              </div>
            );
          })}
        </div>

        <div className="journey-visual-stage" aria-hidden="true">
          <div className="visual-viewport">
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

            <div className="scene-layer layer-truck">
              <div className="truck-model">
                <div className="truck-cab">
                  <div className="truck-window" />
                  <div className="truck-light active" />
                </div>
                <div className="truck-container">
                  <div className="truck-cargo-interior">
                    <div className="cargo-box-mini" />
                  </div>
                  <div className="truck-door left">
                    <img src={roadlnkLogo} className="truck-logo-image left-half" alt="" />
                  </div>
                  <div className="truck-door right">
                    <img src={roadlnkLogo} className="truck-logo-image right-half" alt="" />
                  </div>
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

            <div className="scene-layer layer-billing">
              <div className="billing-invoice glass-panel">
                <div className="invoice-header">
                  <Receipt size={20} className="invoice-icon" />
                  <span>COMMERCIAL ACCOUNTING</span>
                </div>
                <div className="invoice-rows">
                  <div className="invoice-item">
                    <span>Handling Fees (RFS Cargo)</span>
                    <strong ref={handlingRef}>$0.00</strong>
                  </div>
                  <div className="invoice-item">
                    <span>Warehouse Storage (1 Day Dwell)</span>
                    <strong ref={storageRef}>$0.00</strong>
                  </div>
                  <div className="invoice-item">
                    <span>Accessorial Terminal Charges</span>
                    <strong ref={accessorialRef}>$0.00</strong>
                  </div>
                  <div className="invoice-divider" />
                  <div className="invoice-total">
                    <span>Total Invoice Charges</span>
                    <strong className="price-counter" ref={totalRef}>$0.00</strong>
                  </div>
                </div>
                <div className="payment-stamp glass-panel">
                  <span>PAID</span>
                </div>
              </div>
            </div>

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