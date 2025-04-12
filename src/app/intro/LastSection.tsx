import LogoAni from '@/assets/main_logo.json';
import dynamic from 'next/dynamic';
const Lottie = dynamic(() => import('react-lottie-player'), {
  ssr: false,
  loading: () => <div className="-mt-1 w-[124px] h-[36px]"></div>,
});

function LastSection() {
  return (
    <section className="h-screen flex items-center justify-center bg-purple-200">
      <div className="wrapper">
        <video autoPlay={true} muted={true} loop={true} className="w-[920px] -mt-60">
          <source src="/animation/logo-ani2.webm" type="video/webm" />
        </video>
        <p className="text-center text-5xl font-extrabold text-purple-700 -mt-40">Together!</p>
      </div>
    </section>
  );
}

export default LastSection;
