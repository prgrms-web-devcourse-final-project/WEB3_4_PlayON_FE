import axios from 'axios';

export const useSteamImg = () => {
  /**
   * 게임 ID를 받아 16:7 사이즈의 이미지 URL을 반환합니다.
   *
   * @param {string} gameId - Steam 게임 앱 ID
   * @returns {string} - 16:7 비율의 이미지 URL
   */
  const getHeader = async (gameId: string | number): Promise<string> => {
    const imageUrl = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${gameId}/header_koreana.jpg`;
    const fallback = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${gameId}/header.jpg`;

    try {
      const res = await axios.head(imageUrl);
      if (res.status === 200) {
        return imageUrl;
      } else {
        return fallback;
      }
    } catch {
      console.log('게임에 헤더 이미지가 없습니다.');
      return '';
    }
  };

  /**
   * 게임 ID를 받아 16:9 사이즈의 이미지 URL을 반환합니다.
   *
   * @param {string} gameId - Steam 게임 앱 ID
   * @returns {string} - 16:9 비율의 이미지 URL
   */
  const getCapsule = async (gameId: string | number): Promise<string> => {
    const imageUrl = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${gameId}/capsule_616x353_koreana.jpg`;
    const fallback = `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${gameId}/capsule_616x353.jpg`;
    try {
      const res = await axios.head(imageUrl);
      if (res.status === 200) {
        return imageUrl;
      } else {
        return fallback;
      }
    } catch {
      console.log('게임에 캡슐 이미지가 없습니다.');
      return '';
    }
  };

  /**
 * 게임 ID를 받아 16:9 사이즈의 이미지 URL을 반환합니다.
 *
 * @param {string} gameId - Steam 게임 앱 ID
 * @param {boolean} filtered - Steam 게임 앱 ID

 * @returns {string} - 스팀 기준 배경 꾸미는 이미지 URL 반환
 */
  const getBackground = async (gameId: string | number, filtered: boolean = false): Promise<string> => {
    const normalBg = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${gameId}/page_bg_raw.jpg`;
    const filteredBg = `https://store.akamai.steamstatic.com/images/storepagebackground/app/${gameId}`;

    try {
      const res = await axios.head(filtered ? filteredBg : normalBg);
      if (res.status === 200) return filtered ? filteredBg : normalBg;
      else {
        console.log('게임에 배경 이미지가 없습니다.');
        return '';
      }
    } catch {
      console.log('게임에 배경 이미지가 없습니다.');
      return '';
    }
  };
  return { getHeader, getCapsule, getBackground };
};
