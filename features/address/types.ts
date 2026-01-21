export type AddressTabTypes = {
  active: 'saved' | 'map' | 'manual';
  setActive: (v: 'saved' | 'map' | 'manual') => void;
};
