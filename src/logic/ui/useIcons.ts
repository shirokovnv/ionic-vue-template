import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

export default function installIcons() {
  const currentIcons = Object.keys(allIcons).map((i: string) => {
    const key = i.replace(
      /[A-Z]/g,
      (letter: string) => `-${letter.toLowerCase()}`,
    );
    if (typeof allIcons[i] === 'string') {
      return {
        [key]: allIcons[i],
      };
    }
    return {
      ['ios-' + key]: allIcons[i].ios,
      ['md-' + key]: allIcons[i].md,
    };
  });
  const iconsObject = Object.assign({}, ...currentIcons);
  addIcons(iconsObject);
}
