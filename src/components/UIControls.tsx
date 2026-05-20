"use client";

import { useState } from 'react';
import { useStore, BeadShape } from '@/store/useStore';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Base Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Case Color</label>
          <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} style={{ width: '100%', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Screen Color</label>
          <input type="color" value={screenColor} onChange={(e) => setScreenColor(e.target.value)} style={{ width: '100%', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Text Color</label>
          <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} style={{ width: '100%', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Bg Color</label>
          <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} style={{ width: '100%', height: '36px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent' }} />
        </div>
      </div>

      {/* Shape Control */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Case Shape</label>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setCaseShape('rectangle')} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: caseShape === 'rectangle' ? '2px solid #b388ff' : '1px solid var(--glass-border)', background: caseShape === 'rectangle' ? '#e8baff' : 'rgba(255,255,255,0.4)', fontWeight: 'bold', cursor: 'pointer' }}>Rect</button>
          <button onClick={() => setCaseShape('heart')} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: caseShape === 'heart' ? '2px solid #b388ff' : '1px solid var(--glass-border)', background: caseShape === 'heart' ? '#ffb3ba' : 'rgba(255,255,255,0.4)', fontWeight: 'bold', cursor: 'pointer' }}>Heart</button>
          <button onClick={() => setCaseShape('cloud')} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: caseShape === 'cloud' ? '2px solid #b388ff' : '1px solid var(--glass-border)', background: caseShape === 'cloud' ? '#bae1ff' : 'rgba(255,255,255,0.4)', fontWeight: 'bold', cursor: 'pointer' }}>Cloud</button>
          <button onClick={() => setCaseShape('star')} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: caseShape === 'star' ? '2px solid #b388ff' : '1px solid var(--glass-border)', background: caseShape === 'star' ? '#ffffba' : 'rgba(255,255,255,0.4)', fontWeight: 'bold', cursor: 'pointer' }}>Star</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>Screen Text</label>
        <input type="text" value={textValue} maxLength={12} onChange={(e) => setTextValue(e.target.value)} 
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255, 255, 255, 0.4)', fontFamily: 'inherit', fontWeight: 'bold', outline: 'none', color: 'var(--text-main)' }} />
      </div>

      {/* Beads Controls */}
      <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-main)' }}>🎀 Add Charms</h2>
        
        {/* Name Beads */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input type="text" placeholder="Type a name..." value={nameInput} onChange={(e) => setNameInput(e.target.value)} maxLength={8}
            style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'rgba(255, 255, 255, 0.6)', fontFamily: 'inherit', outline: 'none' }} />
          <button onClick={handleAddName} style={{ padding: '0 16px', borderRadius: '8px', border: 'none', background: '#b388ff', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Add Name</button>
        </div>

        {/* Shape Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button onClick={() => handleAddShape('heart')} style={{ padding: '6px 12px', borderRadius: '16px', border: 'none', background: '#ffb3ba', cursor: 'pointer', fontWeight: 'bold' }}>💖 Heart</button>
          <button onClick={() => handleAddShape('star')} style={{ padding: '6px 12px', borderRadius: '16px', border: 'none', background: '#ffffba', cursor: 'pointer', fontWeight: 'bold' }}>⭐ Star</button>
          <button onClick={() => handleAddShape('butterfly')} style={{ padding: '6px 12px', borderRadius: '16px', border: 'none', background: '#bae1ff', cursor: 'pointer', fontWeight: 'bold' }}>🦋 Fly</button>
          <button onClick={() => handleAddShape('smiley')} style={{ padding: '6px 12px', borderRadius: '16px', border: 'none', background: '#ffdfba', cursor: 'pointer', fontWeight: 'bold' }}>😊 Smile</button>
          <button onClick={() => handleAddShape('clover')} style={{ padding: '6px 12px', borderRadius: '16px', border: 'none', background: '#baffc9', cursor: 'pointer', fontWeight: 'bold' }}>🍀 Clover</button>
          <button onClick={() => handleAddShape('music_note')} style={{ padding: '6px 12px', borderRadius: '16px', border: 'none', background: '#e8baff', cursor: 'pointer', fontWeight: 'bold' }}>🎵 Music</button>
          <button onClick={() => handleAddShape('round')} style={{ padding: '6px 12px', borderRadius: '16px', border: 'none', background: '#e0e0e0', cursor: 'pointer', fontWeight: 'bold' }}>⚪ Bead</button>
        </div>

        {/* Current Beads List */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px', padding: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '8px', minHeight: '40px' }}>
          {beads.map((bead) => (
            <div key={bead.id} onClick={() => removeBead(bead.id)} title="Click to remove"
              style={{ width: '30px', height: '30px', borderRadius: '50%', background: bead.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold', color: 'rgba(0,0,0,0.6)', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              {bead.type === 'letter' ? bead.letter?.toUpperCase() : (bead.shape === 'heart' ? '💖' : bead.shape === 'star' ? '⭐' : bead.shape === 'butterfly' ? '🦋' : bead.shape === 'smiley' ? '😊' : bead.shape === 'clover' ? '🍀' : bead.shape === 'music_note' ? '🎵' : '⚪')}
            </div>
          ))}
          {beads.length === 0 && <span style={{ fontSize: '12px', color: 'rgba(0,0,0,0.4)' }}>No beads added yet.</span>}
        </div>
      </div>

      <button onClick={handleDownload}
        style={{ background: 'linear-gradient(135deg, #ff80ab, #ff4081)', color: 'white', border: 'none', padding: '14px 20px', borderRadius: '12px', fontWeight: 700, fontFamily: 'inherit', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(255, 64, 129, 0.3)', marginTop: '8px' }}>
        Save 2D Image (PNG)
      </button>
    </div>
  );
}
