import ThePrateHeaderLogo from './img/theprate-logotype.svg';
import TheDrabHeaderLogo from './img/thedrab-logotype.svg';

interface VerticalMap {
  [key: string]: { logoHeader: string };
}

export default {
  theprate: {
    logoHeader: ThePrateHeaderLogo,
  },
  thedrab: {
    logoHeader: TheDrabHeaderLogo,
  },
} as VerticalMap;
