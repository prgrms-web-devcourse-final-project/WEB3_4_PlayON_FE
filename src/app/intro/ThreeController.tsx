'use client';

import { useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, Object3D } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const model: { current: Object3D | null } = { current: null };

const ThreeController = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<Object3D | null>(null);
  const controllerRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 기본 설정
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, 1.4, 1, 1000);
    camera.position.z = 26;

    //렌더러
    const renderer = new WebGLRenderer({ alpha: true });
    renderer.setSize(1280, 914);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // 컨트롤러
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controllerRef.current = controls;
    controls.target.set(0, 0, 0);

    // 컨트롤러 조작 제한
    //tilt
    controls.minPolarAngle = degToRad(30);
    controls.maxPolarAngle = degToRad(80);
    //pannig
    controls.minAzimuthAngle = degToRad(-45);
    controls.maxAzimuthAngle = degToRad(45);
    //zoom
    controls.minDistance = 24;
    controls.maxDistance = 32;

    // 조명
    const light = new AmbientLight(0xffffff, 1.8);
    scene.add(light);

    // 모델 로딩
    const loader = new GLTFLoader();
    loader.load('/models/controller.glb', (gltf) => {
      modelRef.current = gltf.scene; // 모델을 ref에 저장
      scene.add(gltf.scene);
      if (modelRef.current) {
        //기본 각도 세팅
        modelRef.current.rotateX(-0.4);
        modelRef.current.position.y = 2.5;
      }
      animate();
    });
    // 애니메이션 함수
    function animate() {
      if (modelRef.current) {
      }

      requestAnimationFrame(animate);
      // 씬 렌더링
      renderer.render(scene, camera);
    }
    // 정리 함수
    return () => {
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="rounded-xl overflow-hidden" />;
};

export default ThreeController;

const degToRad = (degree: number) => degree * (Math.PI / 180);
const radToDeg = (radian: number) => radian * (180 / Math.PI);
