import { create } from 'zustand';

export type BeadShape = 'star' | 'heart' | 'butterfly' | 'smiley' | 'clover' | 'music_note' | 'round';
export type BeadType = 'shape' | 'letter';

export interface Bead {
  id: string;
  type: BeadType;
  shape?: BeadShape;
  letter?: string;
  color: string;
}

export interface KeyringState {
  baseColor: string;
  textColor: string;
  textValue: string;
  backgroundColor: string;
  screenColor: string;
  caseShape: 'rectangle' | 'heart' | 'cloud' | 'star';
  beads: Bead[];

  setBaseColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setTextValue: (text: string) => void;
  setBackgroundColor: (color: string) => void;
  setScreenColor: (color: string) => void;
  setCaseShape: (shape: 'rectangle' | 'heart' | 'cloud' | 'star') => void;

  addBead: (bead: Bead) => void;
  removeBead: (id: string) => void;
  clearBeads: () => void;
}

export const useStore = create<KeyringState>((set) => ({
  baseColor: '#ffb6c1',
  textColor: '#000000',
  textValue: '22:22',
  backgroundColor: '#ffe6f0',
  screenColor: '#ffc1e3',
  caseShape: 'rectangle',
  beads: [
    { id: '1', type: 'shape', shape: 'music_note', color: '#b2dfdb' },
    { id: '2', type: 'shape', shape: 'round', color: '#fff9c4' },
    { id: '3', type: 'letter', letter: 'K', color: '#81d4fa' },
    { id: '4', type: 'letter', letter: 'A', color: '#ffcc80' },
    { id: '5', type: 'letter', letter: 'W', color: '#c5e1a5' },
    { id: '6', type: 'letter', letter: 'A', color: '#ce93d8' },
    { id: '7', type: 'letter', letter: 'I', color: '#f48fb1' },
    { id: '8', type: 'letter', letter: 'I', color: '#80cbc4' },
    { id: '9', type: 'shape', shape: 'star', color: '#ff4081' },
  ],
  setBaseColor: (color) => set({ baseColor: color }),
  setTextColor: (color) => set({ textColor: color }),
  setTextValue: (text) => set({ textValue: text }),
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setScreenColor: (color) => set({ screenColor: color }),
  setCaseShape: (shape) => set({ caseShape: shape }),

  addBead: (bead) => set((state) => ({ beads: [...state.beads, bead] })),
  removeBead: (id) => set((state) => ({
    beads: state.beads.filter((b) => b.id !== id)
  })),
  clearBeads: () => set({ beads: [] }),
}));
