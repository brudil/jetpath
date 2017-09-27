import thePrateHeaderLogo from './img/theprate-logotype.svg';
import theDrabHeaderLogo from './img/thedrab-logotype.svg';

interface VerticalMap {
  [key: string]: { logoHeader: string }
}

export default {
  theprate: {
    logoHeader: thePrateHeaderLogo,
  },
  thedrab: {
    logoHeader: theDrabHeaderLogo,
  },
} as VerticalMap;
