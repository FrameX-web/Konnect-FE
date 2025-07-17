import React from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Html, useGLTF } from "@react-three/drei";
import * as THREE from 'three';

// Helper hook to fit camera to model
function FitCamera({ boundingBox, center, maxDim, controlsRef }) {
  const { camera, size } = useThree();

  React.useEffect(() => {
    if (!boundingBox || !center || !maxDim) return;
    // Calculate optimal distance for camera based on model size and viewport
    const fov = camera.fov * (Math.PI / 280);
    const aspect = size.width / size.height;
    // Fit the largest dimension in view, with less padding for more zoom-in
    const fitHeightDistance = maxDim / (2 * Math.tan(fov / 2));
    const fitWidthDistance = maxDim / (2 * aspect * Math.tan(fov / 2));
    const distance = 0.7 * Math.max(fitHeightDistance, fitWidthDistance); // 0.7 = less padding, more zoom
    camera.position.set(center.x, center.y, center.z + distance);
    camera.near = 0.01;
    camera.far = distance * 10;
    camera.updateProjectionMatrix();
    if (controlsRef && controlsRef.current) {
      controlsRef.current.target.set(center.x, center.y, center.z);
      controlsRef.current.minDistance = maxDim * 0.2;
      controlsRef.current.maxDistance = maxDim * 8;
      controlsRef.current.update();
    }
  }, [boundingBox, center, maxDim, camera, controlsRef, size]);
  return null;
}

const Model = ({ url, onBoundingBox }) => {
  const { scene } = useGLTF(url);
  React.useEffect(() => {
    if (scene) {
      // Compute bounding box
      const originalBox = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      originalBox.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      // Scale model to fit a target size (normalized for consistency)
      const targetSize = 6.0;
      const scale = maxDim > 0 ? targetSize / maxDim : 1;
      scene.scale.set(scale, scale, scale);
      // Center the model
      const center = new THREE.Vector3();
      originalBox.getCenter(center);
      scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

      // Apply initial rotation (e.g., rotate 45 degrees around Y axis)
      scene.rotation.y = Math.PI / -4;

      // Compute bounding box AFTER scaling and centering
      const scaledBox = new THREE.Box3().setFromObject(scene);
      const scaledCenter = new THREE.Vector3();
      scaledBox.getCenter(scaledCenter);
      const scaledSize = new THREE.Vector3();
      scaledBox.getSize(scaledSize);
      const scaledMaxDim = Math.max(scaledSize.x, scaledSize.y, scaledSize.z);

      // Notify parent with bounding box info (after scaling)
      if (onBoundingBox) {
        onBoundingBox({
          boundingBox: scaledBox,
          center: scaledCenter,
          maxDim: scaledMaxDim
        });
      }
    }
  }, [scene, onBoundingBox]);
  return <primitive object={scene} />;
};

const Viewer360 = ({ open, onClose, modelUrl, productName, productCode }) => {
  const [modelBox, setModelBox] = React.useState(null);
  const controlsRef = React.useRef();

  // Use a key to force Canvas remount when model changes or dialog opens
  const canvasKey = `${open}-${modelUrl}`;

  React.useEffect(() => {
    if (open) setModelBox(null); // Reset bounding box on open for consistency
  }, [open, modelUrl]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 overflow-auto">
      {/* Mobile: Close button outside canvas */}
      <div className="absolute top-2 left-2 sm:hidden">
        <button
          onClick={onClose}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-black bg-opacity-70 hover:bg-opacity-90 text-white text-xl shadow-lg focus:outline-none"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center px-2 sm:px-0">
        {/* Mobile: Product name and code above canvas */}
        <div className="flex flex-col items-center mb-2 mt-6 sm:hidden">
          <span className="px-4 py-1.5 rounded-lg bg-black bg-opacity-80 text-white text-base font-semibold shadow">
            {productName}
          </span>
          {productCode && (
            <span className="px-3 py-0.5 mt-1 rounded bg-black bg-opacity-60 text-white text-xs font-mono tracking-wide shadow">
              {productCode}
            </span>
          )}
        </div>
        <div className="
          w-full
          max-w-[98vw] max-h-[70vh]
          sm:w-[95vw] sm:h-[55vw] sm:max-w-[90vw] sm:max-h-[90vh]
          bg-white rounded-xl flex items-center justify-center shadow-lg relative
          aspect-[4/3]
        ">
          {/* Desktop: Close button inside canvas, top left */}
          <div className="hidden sm:block absolute top-4 left-4 z-20">
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black bg-opacity-70 hover:bg-opacity-90 hover:scale-110 duration-500 text-white text-2xl shadow-lg focus:outline-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          {/* Desktop: Product name and code inside canvas, top center */}
          <div className="hidden sm:flex absolute top-0 left-1/2 -translate-x-1/2 flex-col items-center z-10">
            <span className="px-6 py-2 rounded-b-lg bg-black bg-opacity-80 text-white text-lg font-semibold shadow mb-1">
              {productName}
            </span>
            {productCode && (
              <span className="px-4 py-1 rounded bg-black bg-opacity-60 text-white text-sm font-mono tracking-wide shadow">
                {productCode}
              </span>
            )}
          </div>
          <Canvas
            key={canvasKey}
            camera={{ position: [0, 0, 8], near: 0.01, far: 100, fov: 50 }}
            shadows
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <React.Suspense fallback={<Html center>Loading...</Html>}>
              <Model url={modelUrl} onBoundingBox={setModelBox} />
              <Environment preset="city" />
              {modelBox && (
                <FitCamera
                  boundingBox={modelBox.boundingBox}
                  center={modelBox.center}
                  maxDim={modelBox.maxDim}
                  controlsRef={controlsRef}
                />
              )}
            </React.Suspense>
            <OrbitControls
              ref={controlsRef}
              enablePan
              enableZoom
              enableRotate
              makeDefault
              zoomSpeed={0.4}
              rotateSpeed={0.4}
              panSpeed={0.4}
              maxPolarAngle={Math.PI}
              minPolarAngle={0}
            />
          </Canvas>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/80 rounded text-[4px] sm:text-xs text-gray-500 tracking-wide pointer-events-none select-none">
            DRAG TO ROTATE | PINCH TO ZOOM | SCROLL TO ZOOM
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer360;
