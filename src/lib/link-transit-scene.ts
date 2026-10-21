import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

/** Owns the short-lived WebGL scene; callers must dispose it when the page leaves. */
export function createLinkTransitScene(canvas: HTMLCanvasElement, accent: string) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x070e14, 0.045);
  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 60);
  camera.position.z = 7;
  const color = new THREE.Color(accent);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.2, 0.6, 0.25);
  composer.addPass(bloom);
  const output = new OutputPass();
  composer.addPass(output);

  const portal = new THREE.Group();
  portal.rotation.x = -0.24;
  portal.rotation.y = 0.25;
  scene.add(portal);
  const ringGeometry = new THREE.TorusGeometry(1.45, 0.012, 8, 160);
  const ringMaterial = new THREE.MeshBasicMaterial({ color: color.clone().multiplyScalar(2), transparent: true, opacity: 0.85 });
  for (let index = 0; index < 7; index++) {
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.z = -index * 1.6;
    ring.scale.setScalar(1 + index * 0.045);
    portal.add(ring);
  }

  const orbitGeometry = new THREE.TorusGeometry(1.85, 0.006, 6, 180, Math.PI * 1.55);
  const orbitMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4 });
  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
  orbit.rotation.set(0.65, -0.55, 0);
  scene.add(orbit);

  const coreGeometry = new THREE.IcosahedronGeometry(0.22, 0);
  const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xe3faff, wireframe: true });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  core.position.z = -1.5;
  portal.add(core);

  const count = window.innerWidth < 600 ? 700 : 1400;
  const positions = new Float32Array(count * 3);
  for (let index = 0; index < count; index++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 1.5 + Math.random() * 4.5;
    positions.set([Math.cos(angle) * radius, Math.sin(angle) * radius, Math.random() * 24 - 18], index * 3);
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particleMaterial = new THREE.PointsMaterial({ color, size: 0.025, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    composer.setSize(width, height);
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  let frame = 0;
  let previous = 0;
  let elapsed = 0;
  let pointerX = 0;
  let pointerY = 0;
  const move = (event: PointerEvent) => {
    pointerX = (event.clientX / window.innerWidth - 0.5) * 0.35;
    pointerY = (event.clientY / window.innerHeight - 0.5) * 0.2;
  };
  window.addEventListener("pointermove", move, { passive: true });

  function render(now: number) {
    frame = requestAnimationFrame(render);
    if (document.hidden || now - previous < 1000 / 30) return;
    const delta = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
    previous = now;
    elapsed += delta;
    portal.rotation.z = elapsed * 0.09;
    portal.rotation.y += (0.25 + pointerX - portal.rotation.y) * 0.035;
    portal.rotation.x += (-0.24 + pointerY - portal.rotation.x) * 0.035;
    orbit.rotation.z = -elapsed * 0.2;
    core.rotation.set(elapsed * 0.6, elapsed * 0.9, elapsed * 0.2);
    for (let index = 2; index < positions.length; index += 3) {
      positions[index] += delta * 2;
      if (positions[index] > 6) positions[index] = -18;
    }
    particleGeometry.attributes.position.needsUpdate = true;
    composer.render();
  }
  frame = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener("pointermove", move);
    for (const resource of [ringGeometry, ringMaterial, orbitGeometry, orbitMaterial, coreGeometry, coreMaterial, particleGeometry, particleMaterial, bloom, output, composer, renderer]) resource.dispose();
  };
}
