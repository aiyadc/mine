const GeometricDecor = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ contentVisibility: 'auto' }}>
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(0, 212, 255, 0.08) 0%, transparent 50%)',
        }}
      />
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(168, 85, 247, 0.08) 0%, transparent 50%)',
        }}
      />

      <div 
        className="absolute top-32 right-32 opacity-10"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00d4ff 0%, #a855f7 100%)',
          animation: 'rotate-slow 30s linear infinite',
          transform: 'translateZ(0)',
        }}
      />

      <div 
        className="absolute bottom-40 left-40 opacity-10"
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '4px',
          backgroundColor: '#a855f7',
          animation: 'rotate-slow 40s linear infinite reverse',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
};

export default GeometricDecor;
