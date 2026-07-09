import { useRef, useEffect, useState, useCallback } from 'react';
import { FileText, CheckCircle, Receipt, Layers, Truck } from 'lucide-react';
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
    next: 'Truck Charges & Departure'
  },
  {
    title: 'Truck Charges & Departure',
    module: 'Gate Billing',
    task: 'Settle inbound handling charges & clear truck for exit',
    operator: 'Gate Billing Desk',
    status: 'Charges Settled ✓',
    next: 'Warehouse Breakdown'
  },
  {
    title: 'Warehouse Breakdown',
    module: 'Warehouse Execution',
    task: 'Forklift places shipment into Bay B - Row 01',
    operator: 'Warehouse Floor Team',
    status: 'Snapping into storage...',
    next: 'Mobile Scanning'
  },
  {
    title: 'Mobile Warehouse Scanning',
    module: 'Mobile Operations',
    task: 'Scan barcode & confirm Bay B - Row 01',
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
    task: 'Cargo cleared and released from warehouse custody',
    operator: 'Exit Gate Guard',
    status: 'Released ✓',
    next: 'Workflow Complete'
  }
];

const TRACKER_STEPS = [
  { label: 'Truck', activeIndices: [0] },
  { label: 'Manifest', activeIndices: [1, 2] },
  { label: 'Charges', activeIndices: [3] },
  { label: 'Warehouse', activeIndices: [4] },
  { label: 'Scan', activeIndices: [5] },
  { label: 'Billing', activeIndices: [6] },
  { label: 'Release', activeIndices: [7, 8] }
];

const STAGE_COUNT = STAGE_TELEMETRY.length;
const LAST_STAGE_INDEX = STAGE_COUNT - 1;
const TRUCK_EXIT_STAGE_INDEX = 3;

// Truck pays first, then exits — but the FULL exit (payment + roll-out)
// must complete entirely within stage 3's own scroll window, so the
// truck is always gone before stage 4 begins. Payment finishes at
// PAYMENT_DONE_PCT of stage 3; the truck then uses the remaining
// portion of stage 3 to roll all the way out.
const PAYMENT_DONE_PCT = 0.4;

const BILLING_STAGE_INDEX = Math.max(
  0,
  STAGE_TELEMETRY.findIndex(
    (s) => s.title.toLowerCase() === 'billing & commercial operations'
  )
);

const HANDLING_CAP = 240;
const STORAGE_CAP = 120;
const ACCESSORIAL_CAP = 45;
const GATE_CHARGE_CAP = 85;

const easeOutQuad = (t) => t * (2 - t);

const STAGE_TO_PILL_POS = [
  0,
  1 / 6,
  1 / 6,
  2 / 6,
  3 / 6,
  4 / 6,
  5 / 6,
  1,
  1,
  1
];

const CargoJourney = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pulseIndex, setPulseIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const handlingRef = useRef(null);
  const storageRef = useRef(null);
  const accessorialRef = useRef(null);
  const totalRef = useRef(null);
  const gateChargeRef = useRef(null);
  const trackerLineRef = useRef(null);

  const updateInterpolationRef = useRef(null);
  const rafRef = useRef(null);
  const tickingRef = useRef(false);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const resizeRafRef = useRef(null);
  const pulseTimeoutRef = useRef(null);

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
    const rawBillingPct =
      pct > bStart ? (pct >= bEnd ? 1 : (pct - bStart) / (bEnd - bStart)) : 0;

    const billingPct = easeOutQuad(rawBillingPct);

    const handlingVal = Math.round(billingPct * HANDLING_CAP);
    const storageVal = Math.round(billingPct * STORAGE_CAP);
    const accessorialVal = Math.round(billingPct * ACCESSORIAL_CAP);
    const totalVal = handlingVal + storageVal + accessorialVal;

    if (handlingRef.current) handlingRef.current.textContent = `$${handlingVal}.00`;
    if (storageRef.current) storageRef.current.textContent = `$${storageVal}.00`;
    if (accessorialRef.current) accessorialRef.current.textContent = `$${accessorialVal}.00`;
    if (totalRef.current) totalRef.current.textContent = `$${totalVal}.00`;
  }, []);

  // Gate charge completes at PAYMENT_DONE_PCT of stage 3, well before
  // the truck starts moving, so payment is always visibly settled
  // first.
  const writeGateCharge = useCallback((pct) => {
    const gStart = TRUCK_EXIT_STAGE_INDEX / STAGE_COUNT;
    const gEnd = gStart + (1 / STAGE_COUNT) * PAYMENT_DONE_PCT;
    const rawGatePct =
      pct > gStart ? (pct >= gEnd ? 1 : (pct - gStart) / (gEnd - gStart)) : 0;

    const gatePct = easeOutQuad(rawGatePct);
    const gateVal = Math.round(gatePct * GATE_CHARGE_CAP);

    if (gateChargeRef.current) gateChargeRef.current.textContent = `$${gateVal}.00`;
  }, []);

  const updateInterpolation = useCallback(() => {
    const container = containerRef.current;
    if (!container) {
      tickingRef.current = false;
      return;
    }

    currentProgressRef.current +=
      (targetProgressRef.current - currentProgressRef.current) * 0.14;

    const diff = Math.abs(targetProgressRef.current - currentProgressRef.current);
    const settled = diff < 0.0004;

    if (settled) currentProgressRef.current = targetProgressRef.current;

    const pct = currentProgressRef.current;
    container.style.setProperty('--scroll-pct', String(pct));

    if (trackerLineRef.current) {
      const stageProgress = pct * STAGE_COUNT;
      const stageFloor = Math.min(LAST_STAGE_INDEX, Math.floor(stageProgress));
      const stageFract = stageProgress - stageFloor;
      const linePct =
        STAGE_TO_PILL_POS[stageFloor] +
        stageFract * (STAGE_TO_PILL_POS[stageFloor + 1] - STAGE_TO_PILL_POS[stageFloor]);

      trackerLineRef.current.style.width = `${linePct * 100}%`;
    }

    const index = Math.min(LAST_STAGE_INDEX, Math.floor(pct * STAGE_COUNT));

    if (container.dataset.stage !== String(index)) {
      container.dataset.stage = String(index);
    }

    // Truck exit progress starts right after payment finishes
    // (PAYMENT_DONE_PCT) and reaches 1.0 by the END of stage 3 itself —
    // guaranteeing the truck is fully gone before stage 4 starts.
    const exitStart = TRUCK_EXIT_STAGE_INDEX / STAGE_COUNT + (1 / STAGE_COUNT) * PAYMENT_DONE_PCT;
    const exitEnd = (TRUCK_EXIT_STAGE_INDEX + 1) / STAGE_COUNT;
    const exitPct =
      pct > exitStart ? Math.min(1, (pct - exitStart) / (exitEnd - exitStart)) : 0;

    container.style.setProperty('--truck-exit-pct', String(exitPct));

    writeBilling(pct);
    writeGateCharge(pct);

    setActiveIndex((prev) => {
      if (prev !== index) {
        setPulseIndex(index);
        if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
        pulseTimeoutRef.current = setTimeout(() => setPulseIndex(null), 500);
      }
      return prev !== index ? index : prev;
    });

    if (!settled) {
      rafRef.current = requestAnimationFrame(updateInterpolationRef.current);
    } else {
      tickingRef.current = false;
      rafRef.current = null;
    }
  }, [writeBilling, writeGateCharge]);

  useEffect(() => {
    updateInterpolationRef.current = updateInterpolation;
  }, [updateInterpolation]);

  useEffect(() => {
    if (prefersReducedMotion || !isVisible) return;

    const MAX_STEP_PER_TICK = (1 / STAGE_COUNT) * 1.6;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) return;

      const scrolled = -rect.top;
      const rawPct = Math.max(0, Math.min(1, scrolled / totalHeight));

      const prevTarget = targetProgressRef.current;
      const delta = rawPct - prevTarget;
      const clampedDelta = Math.max(-MAX_STEP_PER_TICK, Math.min(MAX_STEP_PER_TICK, delta));

      targetProgressRef.current = Math.max(
        0,
        Math.min(1, prevTarget + clampedDelta)
      );

      if (!tickingRef.current) {
        tickingRef.current = true;
        rafRef.current = requestAnimationFrame(updateInterpolation);
      }
    };

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
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
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

  const pulseStepIdx =
    pulseIndex !== null
      ? TRACKER_STEPS.findIndex((s) => s.activeIndices.includes(pulseIndex))
      : -1;

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
          <div className="tracker-line-track">
            <div className="tracker-line-fill" ref={trackerLineRef} />
          </div>

          {TRACKER_STEPS.map((step, idx) => {
            const isActive = step.activeIndices.includes(activeIndex);
            const isCompleted = step.activeIndices[0] < activeIndex;

            return (
              <div
                key={idx}
                className={`tracker-pill ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${pulseStepIdx === idx ? 'pulse' : ''}`}
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
            <div className="ambient-particles">
              <span className="particle p1" />
              <span className="particle p2" />
              <span className="particle p3" />
              <span className="particle p4" />
              <span className="particle p5" />
            </div>

            {/* Forklift + carried cargo box move together as ONE rigid
                group so the box never detaches or drifts away from the
                forks. Used only for the Charges -> Warehouse handoff. */}
            <div className="forklift-unit">
              <div className="scene-forklift">
                <div className="forklift-chassis">
                  <div className="forklift-cabin">
                    <div className="forklift-beacon" />
                  </div>
                  <div className="forklift-mast">
                    <div className="forklift-carriage">
                      <div className="forklift-forks" />
                      <div className="transit-cargo-box" />
                    </div>
                  </div>
                  <div className="forklift-wheel wheel-front" />
                  <div className="forklift-wheel wheel-back" />
                </div>
              </div>
            </div>

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
                <li className={activeIndex >= 4 ? 'completed' : (activeIndex >= 3 ? 'active' : 'pending')}>
                  <span>Gate Charges</span>
                  <span>{activeIndex >= 4 ? '✓ Done' : (activeIndex >= 3 ? 'Active' : 'Pending')}</span>
                </li>
                <li className={activeIndex >= 6 ? 'completed' : (activeIndex >= 4 ? 'active' : 'pending')}>
                  <span>Warehouse Breakdown</span>
                  <span>{activeIndex >= 6 ? '✓ Done' : (activeIndex >= 4 ? 'active' : 'pending')}</span>
                </li>
                <li className={activeIndex >= 8 ? 'completed' : (activeIndex >= 6 ? 'active' : 'pending')}>
                  <span>Billing & WDO</span>
                  <span>{activeIndex >= 8 ? '✓ Done' : (activeIndex >= 6 ? 'Active' : 'Pending')}</span>
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

            <div className="scene-layer layer-departure">
              <div className="departure-invoice glass-panel">
                <div className="invoice-header">
                  <Receipt size={20} className="invoice-icon" />
                  <span>GATE EXIT BILLING</span>
                </div>

                <div className="invoice-rows">
                  <div className="invoice-item">
                    <span>Inbound Handling & Dock Charges</span>
                    <strong ref={gateChargeRef}>$0.00</strong>
                  </div>
                </div>

                <div className="departure-status-row">
                  <Truck size={16} />
                  <span>Truck Cleared For Exit</span>
                </div>
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

            {/* Stage 8: cargo simply fades out in place inside the bin
                (handled purely via CSS on .cargo-target / .layer-warehouse)
                — no forklift or truck movement here anymore. */}
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
                  <span className="details-label">Current Task</span>
                  <p className="details-value">{activeTelemetry.task}</p>
                </div>

                <div className="details-col secondary">
                  <span className="details-label">Operator</span>
                  <p className="details-value">{activeTelemetry.operator}</p>
                </div>

                <div className="details-col">
                  <span className="details-label">Status</span>
                  <p className="details-value highlight-status">{activeTelemetry.status}</p>
                </div>

                <div className="details-col secondary">
                  <span className="details-label">Next Workflow</span>
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