type SteamImageType = 'header' | 'capsule' | 'background';
type Options = {
  filtered?: boolean;
};

export const getSteamImage = async (
  gameId: string | number,
  type: SteamImageType,
  options: Options = {}
): Promise<string> => {
  const checkImage = (urls: string[], fallback: string): Promise<string> => {
    return new Promise((resolve) => {
      const tryNext = (index: number) => {
        if (index >= urls.length) {
          resolve(fallback);
          return;
        }

        const img = new Image();
        img.onload = () => resolve(urls[index]);
        img.onerror = () => tryNext(index + 1);
        img.src = urls[index];
      };

      tryNext(0);
    });
  };

  let urls: string[] = [];
  let fallback = '/img/dummy_capsule.jpg';

  switch (type) {
    case 'header':
      urls = [
        `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${gameId}/header_koreana.jpg`,
        `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${gameId}/header.jpg`,
      ];
      break;
    case 'capsule':
      urls = [
        `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${gameId}/capsule_616x353_koreana.jpg`,
        `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${gameId}/capsule_616x353.jpg`,
      ];
      break;
    case 'background':
      urls = [
        options.filtered
          ? `https://store.akamai.steamstatic.com/images/storepagebackground/app/${gameId}`
          : `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${gameId}/page_bg_raw.jpg`,
      ];
      fallback = '';
      break;
  }

  return await checkImage(urls, fallback);
};
