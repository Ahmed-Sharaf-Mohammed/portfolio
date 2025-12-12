import React, { useState, useRef, useEffect } from 'react';
import { useLiveTranslation } from '../hooks/useLiveTranslation';
import { Button, Menu, MenuItem, Box, CircularProgress } from '@mui/material';
import { Language, Translate } from '@mui/icons-material';

const LanguageSwitcher = () => {
  const { currentLang, changeLanguage, isTranslating } = useLiveTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  // تحديد الموقع الابتدائي في الركن ونازل لتحت شوية
  useEffect(() => {
    if (dragRef.current) {
      const buttonWidth = dragRef.current.offsetWidth;
      const buttonHeight = dragRef.current.offsetHeight;
      
      setPosition({
        x: window.innerWidth - buttonWidth - 20, // 20px من الحافة اليمنى
        y: window.innerHeight - buttonHeight - 80 // 80px من الحافة السفلية
      });
    }
  }, []);

  // أحداث الماوس للكمبيوتر
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    setPosition({
      x: e.clientX - (dragRef.current?.offsetWidth || 0) / 2,
      y: e.clientY - (dragRef.current?.offsetHeight || 0) / 2
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // أحداث اللمس للتليفون
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - (dragRef.current?.offsetWidth || 0) / 2,
      y: touch.clientY - (dragRef.current?.offsetHeight || 0) / 2
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      // إضافة أحداث الماوس
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      // إضافة أحداث اللمس
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    } else {
      // إزالة أحداث الماوس
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      // إزالة أحداث اللمس
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    }

    return () => {
      // تنظيف جميع الأحداث
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang);
    handleClose();
    
    // عمل reload للصفحة علشان يطبق الترجمة على كل المكونات
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const getLanguageName = (code: string) => {
    const names: { [key: string]: string } = {
      en: 'English',
      ar: 'العربية', 
      fr: 'Français'
    };
    return names[code] || code.toUpperCase();
  };

  const getLanguageFlag = (code: string) => {
    const flags: { [key: string]: string } = {
      en: '🇺🇸',
      ar: '🇸🇦',
      fr: '🇫🇷'
    };
    return flags[code] || '🌐';
  };

  return (
    <Box 
      ref={dragRef}
      sx={{ 
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 9999,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        userSelect: 'none',
        // تحسينات للتليفون
        WebkitTapHighlightColor: 'transparent',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <Button
        variant="contained"
        startIcon={isTranslating ? <CircularProgress size={16} color="inherit" /> : <Language />}
        onClick={handleClick}
        disabled={isTranslating}
        sx={{
          backgroundColor: '#5000ca',
          color: 'white',
          borderRadius: '25px',
          padding: '8px 16px',
          minWidth: 'auto',
          fontSize: '14px',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          '&:hover': {
            backgroundColor: '#3a0096',
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
          '&:disabled': {
            backgroundColor: '#888',
          },
          transition: 'all 0.2s ease',
          // تحسينات للتليفون
          WebkitTouchCallout: 'none',
          WebkitTapHighlightColor: 'transparent'
        }}
      >
        {getLanguageFlag(currentLang)} {currentLang.toUpperCase()}
        {isTranslating && '...'}
      </Button>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '10px',
            marginTop: '5px',
            minWidth: '140px'
          }
        }}
      >
        <MenuItem 
          onClick={() => handleLanguageChange('en')}
          selected={currentLang === 'en'}
          sx={{
            fontWeight: currentLang === 'en' ? 'bold' : 'normal',
            backgroundColor: currentLang === 'en' ? '#f0f0f0' : 'transparent',
          }}
        >
          🇺🇸 English
        </MenuItem>
        <MenuItem 
          onClick={() => handleLanguageChange('ar')}
          selected={currentLang === 'ar'}
          sx={{
            fontWeight: currentLang === 'ar' ? 'bold' : 'normal',
            backgroundColor: currentLang === 'ar' ? '#f0f0f0' : 'transparent',
          }}
        >
          🇸🇦 العربية
        </MenuItem>
        <MenuItem 
          onClick={() => handleLanguageChange('fr')}
          selected={currentLang === 'fr'}
          sx={{
            fontWeight: currentLang === 'fr' ? 'bold' : 'normal',
            backgroundColor: currentLang === 'fr' ? '#f0f0f0' : 'transparent',
          }}
        >
          🇫🇷 Français
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;