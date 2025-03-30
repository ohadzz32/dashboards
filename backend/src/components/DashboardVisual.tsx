import React from 'react';

const COLORS = {
  primary: '#0066cc',
  secondary: '#4CAF50',
  black: '#000000',
  lightBlue: '#e6f3ff',
  lightGreen: '#ebf9eb',
  textGray: '#333333'
};

const SIZES = {
  smallText: '12px',
  largeText: '24px',
  gaugeWidth: '150px',
  gaugeHeight: '150px',
  altitudeWidth: '60px',
  altitudeHeight: '200px'
};

const centerStyle = {
  position: 'absolute' as const,
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)'
};

interface Props {
  altitude: number;
  his: number;
  adi: number;
}

const DashboardVisual: React.FC<Props> = ({ altitude, his, adi }) => {
  const altHeight = Math.min(Math.max((altitude / 3000) * 100, 0), 100);
  const compass = ((his % 360) + 360) % 360;
  const adiVal = Math.min(Math.max(adi, -100), 100);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ position: 'relative', width: SIZES.altitudeWidth, height: SIZES.altitudeHeight, border: `2px solid ${COLORS.black}` }}>
        <div style={{ position: 'absolute', right: '-40px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>3000</div>
          <div>2000</div>
          <div>1000</div>
          <div>0</div>
        </div>
        <div style={{ width: '100%', height: `${altHeight}%`, background: COLORS.primary, position: 'absolute', bottom: 0 }} />
      </div>

      {/* מצפן */}
      <div style={{ position: 'relative', width: SIZES.gaugeWidth, height: SIZES.gaugeHeight, border: `2px solid ${COLORS.black}`, borderRadius: '50%' }}>
        {[0, 90, 180, 270].map(deg => (
          <div key={deg} style={{
            position: 'absolute',
            left: '50%',
            top: '10px',
            transform: `translateX(-50%) rotate(${deg}deg)`,
            transformOrigin: 'center 65px',
            fontSize: SIZES.smallText
          }}>
            {deg}
          </div>
        ))}
        <div style={{ position: 'absolute', left: '50%', top: '5px', transform: 'translateX(-50%)' }}>
          <div style={{ width: '4px', height: '40px', background: COLORS.black }} />
          <div style={{ 
            position: 'absolute', 
            top: '-10px', 
            left: '-8px',
            width: 0,
            height: 0,
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: `15px solid ${COLORS.black}`
          }} />
        </div>
        <div style={{
          width: '4px',
          height: '70px',
          background: COLORS.primary,
          position: 'absolute',
          left: '50%',
          bottom: '50%',
          transformOrigin: 'bottom',
          transform: `translateX(-50%) rotate(${compass}deg)`
        }} />
        <div style={{
          width: '8px',
          height: '8px',
          background: COLORS.black,
          borderRadius: '50%',
          ...centerStyle
        }} />
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: SIZES.smallText,
          color: COLORS.textGray
        }}>
          deg
        </div>
      </div>

      <div style={{ 
        position: 'relative', 
        width: SIZES.gaugeWidth, 
        height: SIZES.gaugeHeight, 
        border: `2px solid ${COLORS.primary}`, 
        borderRadius: '50%', 
        overflow: 'hidden',
        background: adiVal >= 0 ? COLORS.lightBlue : COLORS.lightGreen
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: adiVal >= 0 ? COLORS.primary : COLORS.secondary,
          opacity: Math.abs(adiVal) / 100
        }} />
        <div style={{
          ...centerStyle,
          fontSize: SIZES.largeText,
          color: COLORS.textGray
        }}>
          %
        </div>
      </div>
    </div>
  );
};

export default DashboardVisual; 