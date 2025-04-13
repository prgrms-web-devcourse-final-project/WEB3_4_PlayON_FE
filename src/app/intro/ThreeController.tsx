'use client';

import { MutableRefObject, useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, Object3D, MathUtils } from 'three';
import { ThreeObjects } from '@/types/main';

type Props = {
  setModelObject?: (model: Object3D) => void;
};
const ThreeController = ({ setModelObject }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<Object3D | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 기본 설정
    const scene = new Scene();
    const camera = new PerspectiveCamera(45, 1.4, 1, 1000);
    camera.position.z = 26;

    //렌더러
    const renderer = new WebGLRenderer({ alpha: true });
    const renderSize = 1280;
    renderer.setSize(renderSize, renderSize / 1.4);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // 컨트롤러
    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableZoom = false;
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.1;
    // controllerRef.current = controls;
    // controls.target.set(0, 0, 0);

    // // 컨트롤러 조작 제한
    // //tilt
    // controls.minPolarAngle = degToRad(100);
    // controls.maxPolarAngle = degToRad(160);
    // //pannig
    // controls.minAzimuthAngle = degToRad(-90);
    // controls.maxAzimuthAngle = degToRad(90);
    // //zoom
    // controls.minDistance = 23;
    // controls.maxDistance = 29;

    // 조명
    const light = new AmbientLight(0xffffff, 1.8);
    scene.add(light);
    // 모델 로딩
    const loader = new GLTFLoader();
    loader.load('/models/controller.glb', (gltf) => {
      const loadedModel = gltf.scene;

      // 모델 ref에 저장
      modelRef.current = loadedModel;
      if (setModelObject) setModelObject(loadedModel); // 콜백 호출

      // 씬에 추가
      scene.add(loadedModel);

      // 모델 기본 각도 및 위치 조정
      loadedModel.rotation.x = -0.4;
      loadedModel.position.y = 3.2;

      // 애니메이션 시작
      animate();
    });
    // 애니메이션 함수
    function animate() {
      requestAnimationFrame(animate);

      if (modelRef.current) {
      }
      // 씬 렌더링
      // controls.update();
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
