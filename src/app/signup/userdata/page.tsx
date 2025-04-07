import './style.css';

export default function SignupUserdata() {
  const playOnASCII = `##########  ######      ####### ######  ######       #######    ####### #####
##################      #######%#############      ###########% ####### #####
#####%###########      #########  #########      ############################
########### #####      ##########  #######       ######   ###################
##########  #####%###%############ ######        ####### ####################
#####       ###################### ######         ################### #######
#####      ################  ##### ######           #########  ######  ######`;

  return (
    <div className="bg-purple-900 text-purple-400 h-screen flex flex-col items-center">
      <div className="overlay"></div>
      <div className="scanline"></div>
      <div className="wrapper">
        <div className="mt-16 flex flex-col pb-10 items-center">
          <div className="flex gap-5 mb-20">
            <div className="">
              <pre className="text-xs glow">{playOnASCII}</pre>
            </div>
            <div>
              <p className="text-2xl font-dgm glow">when we play on together</p>
              <p className="text-2xl font-dgm glow">the game never ends</p>
            </div>
          </div>
          <div className="font-dgm text-purple-400 flex flex-col items-start px-20 dashed-border pb-10 gap-5">
            <p className="text-4xl text-purple-400 font-dgm bg-purple-900 title">추가 정보 기입</p>
            <div className="flex flex-col gap-3">
              <p className="text-purple-500 text-2xl font-dgm glow">{`PlayON의 다양한 기능들은 사용자에 대한 추가적인 정보를 바탕으로 더욱 편리하게 사용할 수 있도록 설계되어 있습니다!`}</p>
              <p className="text-purple-500 text-2xl font-dgm glow">{`하단의 항목들을 작성하시고 Play ON 하세요!`}</p>
            </div>
            <div className="flex items-center gap-5">
              <div className="border-2 border-purple-500 rounded-full h-14 aspect-square"></div>
              <p className="text-purple-500 font-dgm text-2xl glow">아바타 이미지 설정</p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="text-purple-500 font-dgm text-2xl glow w-[200px]">플레이 스타일</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="border border-purple-500 font-dgm text-2xl hover:text-purple-200 hover:border-purple-200 p-2">
                    캐쥬얼
                  </p>
                  <p className="border border-purple-500 font-dgm text-2xl hover:text-purple-200 hover:border-purple-200 p-2">
                    캐쥬얼
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="text-purple-500 font-dgm text-2xl glow w-[200px]">게임 실력</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="border border-purple-500 font-dgm text-2xl hover:text-purple-200 hover:border-purple-200 p-2">
                    캐쥬얼
                  </p>
                  <p className="border border-purple-500 font-dgm text-2xl hover:text-purple-200 hover:border-purple-200 p-2">
                    캐쥬얼
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="text-purple-500 font-dgm text-2xl glow w-[200px]">성별</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="border border-purple-500 font-dgm text-2xl hover:text-purple-200 hover:border-purple-200 p-2">
                    캐쥬얼
                  </p>
                  <p className="border border-purple-500 font-dgm text-2xl hover:text-purple-200 hover:border-purple-200 p-2">
                    캐쥬얼
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="text-purple-500 font-dgm text-2xl glow w-[200px]">친목 여부</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="border border-purple-500 font-dgm text-2xl hover:text-purple-200 hover:border-purple-200 p-2">
                    캐쥬얼
                  </p>
                  <p className="border border-purple-500 font-dgm text-2xl hover:text-purple-200 hover:border-purple-200 p-2">
                    캐쥬얼
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5">
              <p className="text-purple-500 font-dgm text-2xl glow hover:text-purple-200 cursor-pointer">{`[ 제출하기 ]`}</p>
              <p className="text-purple-500 font-dgm text-2xl glow hover:text-purple-200 cursor-pointer">{`[ 다음에 하기 ]`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
