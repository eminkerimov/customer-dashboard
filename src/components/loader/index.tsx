import CircularProgress from '@mui/material/CircularProgress';

function PurpleLoader() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress sx={{ color: '#8a2be2' }} size={60}  />
    </div>
  );
}

export default PurpleLoader;
