const SITES = {
  freeSoundsLibrary: {
    name: "Free Sounds Library",
    url: "https://www.freesoundslibrary.com/",
    licenseName: "License: Attribution 4.0 International",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/legalcode",
  },
  pixabay: {
    name: "Pixabay",
    url: "https://pixabay.com/",
  },
};

export const TYPES = {
  SOUNDS: "sounds",
  IMAGES: "images",
  FONTS: "fonts",
  PRODUCTION: "production",
};

export default {
  [TYPES.PRODUCTION]: {
    title: "Production",
    credits: [
      {
        authorName: "Liran Reuven",
      },
    ],
  },
  [TYPES.FONTS]: {
    title: "Fonts",
    credits: [
      {
        name: "Trash Cinema BB",
        url: "https://www.1001fonts.com/trashcinema-bb-font.html",
        authorName: "Blambot Comic Fonts",
        authorUrl: "https://www.1001fonts.com/users/blambot/",
      },
      {
        name: "BebasNeue",
        utl: "https://github.com/dharmatype/Bebas-Neue",
        authorName: "Ryoichi Tsunekawa",
        authorUrl: "https://github.com/dharmatype",
      },
    ],
  },
  [TYPES.SOUNDS]: {
    title: "Sounds and Music",
    credits: [
      {
        name: "Match Strike Sound Effect",
        url: "https://www.freesoundslibrary.com/match-strike-sound-effect/",
        authorName: "SPANC",
        authorUrl: "https://www.freesoundslibrary.com/author/spanac/",
        ...SITES.freeSoundsLibrary,
      },
      {
        name: "Wah Wah Wah Sound Effect",
        url: "https://www.freesoundslibrary.com/wah-wah-wah-sound-effect/",
        authorName: "ALEXANDAR",
        authorUrl: "https://www.freesoundslibrary.com/author/alexandar/",
        ...SITES.freeSoundsLibrary,
      },
      {
        name: "Sad Trumped Sound Effect",
        url: "https://www.freesoundslibrary.com/sad-trumpet-sound/",
        authorName: "SPANC",
        authorUrl: "https://www.freesoundslibrary.com/author/spanac/",
        ...SITES.freeSoundsLibrary,
      },
    ],
  },
  [TYPES.IMAGES]: {
    title: "Images",
    credits: [
      {
        name: "Panda bear",
        url:
          "https://pixabay.com/illustrations/panda-comic-cute-cartoon-fun-3644031/",
        authorName: "Redhead Pueppi",
        authorUrl: "https://pixabay.com/users/redhead_pueppi-6697213/",
      },
      {
        name: "Menorah Image",
        url:
          "https://pixabay.com/illustrations/happy-hanukkah-hanukkah-seasonal-3791393/",
        authorName: "Angela Rose",
        authorUrl:
          "https://pixabay.com/users/angelarose23-6563351/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=3791393",
        ...SITES.pixabay,
      },
    ],
  },
};

// https://pixabay.com/videos/opening-the-curtain-ceremony-29942/
// https://pixabay.com/illustrations/panda-comic-cute-cartoon-fun-3644031/
// https://pixabay.com/photos/stars-milky-way-night-sky-blue-sky-1869692/#

//https://pixabay.com/illustrations/park-greenspace-green-space-grass-4971822/#