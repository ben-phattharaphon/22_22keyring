"use client";

import { useState } from 'react';
import { useStore, BeadShape } from '@/store/useStore';
import styles from './UIControls.module.css';

const PASTEL_COLORS = ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9', '#bae1ff', '#e8baff', '#f48fb1', '#81d4fa', '#ffcc80'];

function getRandomColor() {
  return PASTEL_COLORS[Math.floor(Math.random() * PASTEL_COLORS.length)];
}

export default function UIControls() {
  const { baseColor, textColor, textValue, backgroundColor, screenColor, caseShape, beads, setBaseColor, setTextColor, setTextValue, setBackgroundColor, setScreenColor, setCaseShape, addBead, removeBead } = useStore();
  const [nameInput, setNameInput] = useState('');

  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'my-kawaii-keyring.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const handleAddName = () => {
    if (!nameInput) return;
    const letters = nameInput.split('');
    letters.forEach((char) => {
      addBead({
        id: Math.random().toString(36).substring(7),
        type: 'letter',
        letter: char,
        color: getRandomColor()
      });
    });
    setNameInput('');
  };

  const handleAddShape = (shape: BeadShape) => {
    addBead({
      id: Math.random().toString(36).substring(7),
      type: 'shape',
      shape,
      color: getRandomColor()
    });
  };

  return (
    <div className={styles.controlsContainer}>
      {/* Base Controls */}
      <div className={styles.grid}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className={styles.label}>Case Color</label>
          <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} className={styles.inputColor} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className={styles.label}>Screen Color</label>
          <input type="color" value={screenColor} onChange={(e) => setScreenColor(e.target.value)} className={styles.inputColor} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className={styles.label}>Text Color</label>
          <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className={styles.inputColor} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label className={styles.label}>Bg Color</label>
          <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} className={styles.inputColor} />
        </div>
      </div>

      {/* Shape Control */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className={styles.label}>Case Shape</label>
        <div className={styles.shapeGroup}>
          <button 
            onClick={() => setCaseShape('rectangle')} 
            className={`${styles.shapeButton} ${caseShape === 'rectangle' ? styles.shapeButtonActive : ''}`}
            style={{ background: caseShape === 'rectangle' ? '#e8baff' : undefined }}
          >
            Rect
          </button>
          <button 
            onClick={() => setCaseShape('heart')} 
            className={`${styles.shapeButton} ${caseShape === 'heart' ? styles.shapeButtonActive : ''}`}
            style={{ background: caseShape === 'heart' ? '#ffb3ba' : undefined }}
          >
            Heart
          </button>
          <button 
            onClick={() => setCaseShape('cloud')} 
            className={`${styles.shapeButton} ${caseShape === 'cloud' ? styles.shapeButtonActive : ''}`}
            style={{ background: caseShape === 'cloud' ? '#bae1ff' : undefined }}
          >
            Cloud
          </button>
          <button 
            onClick={() => setCaseShape('star')} 
            className={`${styles.shapeButton} ${caseShape === 'star' ? styles.shapeButtonActive : ''}`}
            style={{ background: caseShape === 'star' ? '#ffffba' : undefined }}
          >
            Star
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label className={styles.label}>Screen Text</label>
        <input type="text" value={textValue} maxLength={12} onChange={(e) => setTextValue(e.target.value)} className={styles.inputText} />
      </div>

      {/* Beads Controls */}
      <div className={styles.charmsSection}>
        <h2 className={styles.charmsTitle}>🎀 Add Charms</h2>
        
        {/* Name Beads */}
        <div className={styles.addNameGroup}>
          <input 
            type="text" 
            placeholder="Type a name..." 
            value={nameInput} 
            onChange={(e) => setNameInput(e.target.value)} 
            maxLength={8}
            className={styles.inputText}
            style={{ flex: 1 }} 
          />
          <button onClick={handleAddName} className={styles.addNameButton}>Add Name</button>
        </div>

        {/* Shape Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button onClick={() => handleAddShape('heart')} className={styles.charmButton} style={{ background: '#ffb3ba' }}>💖 Heart</button>
          <button onClick={() => handleAddShape('star')} className={styles.charmButton} style={{ background: '#ffffba' }}>⭐ Star</button>
          <button onClick={() => handleAddShape('butterfly')} className={styles.charmButton} style={{ background: '#bae1ff' }}>🦋 Fly</button>
          <button onClick={() => handleAddShape('smiley')} className={styles.charmButton} style={{ background: '#ffdfba' }}>😊 Smile</button>
          <button onClick={() => handleAddShape('clover')} className={styles.charmButton} style={{ background: '#baffc9' }}>🍀 Clover</button>
          <button onClick={() => handleAddShape('music_note')} className={styles.charmButton} style={{ background: '#e8baff' }}>🎵 Music</button>
          <button onClick={() => handleAddShape('round')} className={styles.charmButton} style={{ background: '#e0e0e0' }}>⚪ Bead</button>
        </div>

        {/* Current Beads List */}
        <div className={styles.beadsList}>
          {beads.map((bead) => (
            <div key={bead.id} onClick={() => removeBead(bead.id)} title="Click to remove" className={styles.beadItem} style={{ background: bead.color }}>
              {bead.type === 'letter' ? bead.letter?.toUpperCase() : (bead.shape === 'heart' ? '💖' : bead.shape === 'star' ? '⭐' : bead.shape === 'butterfly' ? '🦋' : bead.shape === 'smiley' ? '😊' : bead.shape === 'clover' ? '🍀' : bead.shape === 'music_note' ? '🎵' : '⚪')}
            </div>
          ))}
          {beads.length === 0 && <span className={styles.emptyBeads}>No beads added yet.</span>}
        </div>
      </div>

      <button onClick={handleDownload} className={styles.saveButton}>
        Save 2D Image (PNG)
      </button>
    </div>
  );
}
