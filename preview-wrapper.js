/**
 * preview-wrapper.js — Canvas Preview System
 *
 * Provides visual feedback for overlay positioning in OBS canvas.
 *
 * URL Parameters:
 *   preview   = true|false       - Enable preview mode
 *   canvasw   = 1920             - Canvas width in pixels
 *   canvash   = 1080             - Canvas height in pixels
 *   showgrid  = true|false       - Show alignment grid
 *   showrulers = true|false      - Show pixel rulers
 *
 * Usage:
 *   Include this script in any overlay HTML file to enable preview mode.
 *   Add: <script src="preview-wrapper.js"></script>
 */

(function() {
  'use strict';

  // Check if preview mode is enabled
  const params = new URLSearchParams(window.location.search);
  const previewMode = params.get('preview') === 'true';

  if (!previewMode) return; // Exit if preview mode not enabled

  // Get canvas dimensions
  const canvasWidth = parseInt(params.get('canvasw')) || 1920;
  const canvasHeight = parseInt(params.get('canvash')) || 1080;
  const showGrid = params.get('showgrid') === 'true';
  const showRulers = params.get('showrulers') === 'true';

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreview);
  } else {
    initPreview();
  }

  function initPreview() {
    // Create canvas container
    const canvasContainer = document.createElement('div');
    canvasContainer.id = 'preview-canvas';
    canvasContainer.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: ${canvasWidth}px;
      height: ${canvasHeight}px;
      background: #000;
      border: 2px solid #ff0000;
      box-sizing: border-box;
      overflow: hidden;
      z-index: 999999;
    `;

    // Create grid overlay if enabled
    if (showGrid) {
      const gridOverlay = document.createElement('div');
      gridOverlay.id = 'preview-grid';
      gridOverlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000000;
      `;

      // Create grid lines (100px squares)
      const gridSize = 100;
      const gridSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      gridSVG.setAttribute('width', canvasWidth);
      gridSVG.setAttribute('height', canvasHeight);
      gridSVG.style.cssText = 'position: absolute; top: 0; left: 0;';

      // Vertical lines
      for (let x = 0; x <= canvasWidth; x += gridSize) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', 0);
        line.setAttribute('x2', x);
        line.setAttribute('y2', canvasHeight);
        line.setAttribute('stroke', x % (gridSize * 2) === 0 ? '#666' : '#333');
        line.setAttribute('stroke-width', x % (gridSize * 2) === 0 ? '2' : '1');
        line.setAttribute('opacity', '0.5');
        gridSVG.appendChild(line);
      }

      // Horizontal lines
      for (let y = 0; y <= canvasHeight; y += gridSize) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', 0);
        line.setAttribute('y1', y);
        line.setAttribute('x2', canvasWidth);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', y % (gridSize * 2) === 0 ? '#666' : '#333');
        line.setAttribute('stroke-width', y % (gridSize * 2) === 0 ? '2' : '1');
        line.setAttribute('opacity', '0.5');
        gridSVG.appendChild(line);
      }

      gridOverlay.appendChild(gridSVG);
      canvasContainer.appendChild(gridOverlay);
    }

    // Create rulers if enabled
    if (showRulers) {
      // Top ruler
      const topRuler = createRuler('horizontal', canvasWidth);
      topRuler.style.cssText = `
        position: absolute;
        top: -25px;
        left: 0;
        width: ${canvasWidth}px;
        height: 25px;
        background: #1a1a1a;
        border-bottom: 1px solid #666;
        z-index: 1000001;
      `;
      canvasContainer.appendChild(topRuler);

      // Left ruler
      const leftRuler = createRuler('vertical', canvasHeight);
      leftRuler.style.cssText = `
        position: absolute;
        top: 0;
        left: -25px;
        width: 25px;
        height: ${canvasHeight}px;
        background: #1a1a1a;
        border-right: 1px solid #666;
        z-index: 1000001;
      `;
      canvasContainer.appendChild(leftRuler);
    }

    // Create dimension display
    const dimensionDisplay = document.createElement('div');
    dimensionDisplay.style.cssText = `
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: #0f0;
      padding: 8px 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 14px;
      border-radius: 4px;
      border: 1px solid #0f0;
      z-index: 1000002;
      pointer-events: none;
    `;
    dimensionDisplay.textContent = `${canvasWidth} × ${canvasHeight}`;
    canvasContainer.appendChild(dimensionDisplay);

    // Create content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.id = 'preview-content';
    contentWrapper.style.cssText = `
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 1;
    `;

    // Move body content into wrapper
    while (document.body.firstChild) {
      contentWrapper.appendChild(document.body.firstChild);
    }

    canvasContainer.appendChild(contentWrapper);
    document.body.appendChild(canvasContainer);

    // Set body background
    document.body.style.cssText = `
      margin: 0;
      padding: 20px;
      background: #0a0a0a;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Add preview mode indicator
    const indicator = document.createElement('div');
    indicator.style.cssText = `
      position: fixed;
      top: 10px;
      left: 10px;
      background: rgba(255, 0, 0, 0.8);
      color: white;
      padding: 6px 12px;
      font-family: 'Inter', sans-serif;
      font-size: 12px;
      font-weight: 600;
      border-radius: 4px;
      z-index: 1000003;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    `;
    indicator.textContent = 'Preview Mode';
    document.body.appendChild(indicator);
  }

  function createRuler(orientation, length) {
    const ruler = document.createElement('div');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    if (orientation === 'horizontal') {
      svg.setAttribute('width', length);
      svg.setAttribute('height', 25);

      // Tick marks every 100px
      for (let i = 0; i <= length; i += 100) {
        const tickHeight = i % 200 === 0 ? 12 : 8;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', i);
        line.setAttribute('y1', 25 - tickHeight);
        line.setAttribute('x2', i);
        line.setAttribute('y2', 25);
        line.setAttribute('stroke', '#999');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);

        // Labels every 200px
        if (i % 200 === 0) {
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', i + 3);
          text.setAttribute('y', 10);
          text.setAttribute('fill', '#999');
          text.setAttribute('font-size', '10');
          text.setAttribute('font-family', 'monospace');
          text.textContent = i;
          svg.appendChild(text);
        }
      }
    } else {
      svg.setAttribute('width', 25);
      svg.setAttribute('height', length);

      // Tick marks every 100px
      for (let i = 0; i <= length; i += 100) {
        const tickWidth = i % 200 === 0 ? 12 : 8;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', 25 - tickWidth);
        line.setAttribute('y1', i);
        line.setAttribute('x2', 25);
        line.setAttribute('y2', i);
        line.setAttribute('stroke', '#999');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);

        // Labels every 200px
        if (i % 200 === 0) {
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', 2);
          text.setAttribute('y', i + 12);
          text.setAttribute('fill', '#999');
          text.setAttribute('font-size', '10');
          text.setAttribute('font-family', 'monospace');
          text.textContent = i;
          svg.appendChild(text);
        }
      }
    }

    ruler.appendChild(svg);
    return ruler;
  }
})();
