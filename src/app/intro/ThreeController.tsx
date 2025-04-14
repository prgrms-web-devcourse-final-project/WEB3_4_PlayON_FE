'use client';

import { forwardRef, useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, Object3D } from 'three';

type Props = {
  modelObject: React.MutableRefObject<Object3D | null>;
  containerRef: React.RefObject<HTMLDivElement>;
  setModelLoaded: (loaded: boolean) => void;
};
const ThreeController = forwardRef<HTMLDivElement, Props>(({ modelObject, containerRef, setModelLoaded }, ref) => {
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);

  useEffect(() => {
    console.log('모델 로딩 시작');
    // 씬, 카메라, 렌더러 세팅
    sceneRef.current = new Scene();
    cameraRef.current = new PerspectiveCamera(45, 1.4, 1, 1000);
    rendererRef.current = new WebGLRenderer({ alpha: true });

    cameraRef.current.position.z = 26;
    const renderSize = 1280;
    rendererRef.current.setSize(renderSize, renderSize / 1.4);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);

    //렌더러 할당
    if (containerRef.current && rendererRef.current) {
      console.log('렌더러 할당');
      containerRef.current.appendChild(rendererRef.current.domElement);
    }

    // 조명
    const light = new AmbientLight(0xffffff, 1.8);
    sceneRef.current.add(light);

    // 모델 로딩
    const loader = new GLTFLoader();
    loader.load('/models/controller.glb', (gltf) => {
      const loadedModel = gltf.scene;

      // 모델 ref에 저장
      modelObject.current = loadedModel;

      // 씬에 추가
      sceneRef.current?.add(modelObject.current);
      // 모델 기본 각도 및 위치 조정
      modelObject.current.rotation.x = -0.4;
      modelObject.current.position.y = 3.2;

      setModelLoaded(true);
      // 애니메이션 시작
      animate();
    });

    function animate() {
      requestAnimationFrame(animate);
      rendererRef.current?.render(sceneRef.current as Scene, cameraRef.current as PerspectiveCamera);
    }

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [setModelLoaded, modelObject]);

  return <div ref={ref ?? containerRef} className="overflow-hidden opacity-0" />;
});

export default ThreeController;

const degToRad = (degree: number) => degree * (Math.PI / 180);
const radToDeg = (radian: number) => radian * (180 / Math.PI);
